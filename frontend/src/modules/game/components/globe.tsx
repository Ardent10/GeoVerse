import { useEffect, useRef, useState } from "react";
import Globe, { GlobeInstance } from "globe.gl";
import * as THREE from "three";
import { useAppState } from "../../../store";

interface CountryProperties {
  ADMIN: string;
  ISO_A2: string;
  POP_EST: number;
}

interface CountryFeature {
  type: string;
  properties: CountryProperties;
  geometry: any;
}

export function GameGlobe() {
  const [state, dispatch] = useAppState();
  const globeRef = useRef<GlobeInstance | null>(null);
  const [countriesData, setCountriesData] = useState<CountryFeature[] | null>(
    null
  );

  useEffect(() => {
    const globeContainer = document.getElementById("globe-container");
    if (!globeContainer) return;

    const world = new Globe(globeContainer)
      .globeImageUrl(
        "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      )
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
      .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png")
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.3)
      .hexPolygonUseDots(true)
      .hexPolygonColor((d: any) => {
        // Highlight selected country or default color
        return state.selectedCountry &&
          d.properties.ADMIN.toLowerCase() ===
            state.selectedCountry.toLowerCase()
          ? "#4285F4"
          : "#1e293b";
      })
      // @ts-ignore
      .hexPolygonLabel(
        ({
          properties: d,
        }: {
          properties: CountryProperties;
        }) => `<div style="background-color: rgba(0,0,0,0.75); color: white; border-radius: 6px; padding: 10px; font-family:Minecraft">
          <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
          Population: <i>${d.POP_EST.toLocaleString()}</i>
        </div>`
      );

    globeContainer.style.position = "relative";
    globeContainer.style.display = "flex";
    globeContainer.style.justifyContent = "center";
    globeContainer.style.alignItems = "center";

    const controls = world.controls();
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.enableRotate = true;
    controls.zoomSpeed = 1.2;
    controls.minDistance = 200;
    controls.maxDistance = 900;
    controls.autoRotate = true;
    controls.enableDamping = true;
    controls.autoRotateSpeed = 0.35;

    globeRef.current = world;

    dispatch({
      type: "SET_GLOBE_INSTANCE",
      payload: world,
    });
    const CLOUDS_IMG_URL = "/clouds.png";
    const CLOUDS_ALT = 0.004;
    const CLOUDS_ROTATION_SPEED = -0.006;

    new THREE.TextureLoader().load(CLOUDS_IMG_URL, (cloudsTexture) => {
      const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(
          world.getGlobeRadius() * (1 + CLOUDS_ALT),
          75,
          75
        ),
        new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true })
      );
      world.scene().add(clouds);

      (function rotateClouds() {
        clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
        requestAnimationFrame(rotateClouds);
      })();
    });
    // Load country data
    fetch(
      "//unpkg.com/globe.gl/example/datasets/ne_110m_admin_0_countries.geojson"
    )
      .then((res) => res.json())
      .then((countries) => {
        const features = countries.features as CountryFeature[];
        setCountriesData(features);
        world.hexPolygonsData(features);
      });

    return () => {
      globeRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!globeRef.current || !state.selectedCountry || !countriesData) return;

    // Ensure the globe instance is fully loaded
    if (!globeRef.current.scene()) return;

    const world = globeRef.current;

    // Stop auto-rotation before moving to avoid conflicts
    const controls = world.controls();
    controls.autoRotate = false;

    // Find the selected country
    const countryFeature = countriesData.find(
      (feature) =>
        feature.properties.ADMIN.toLowerCase() ===
        state.selectedCountry.toLowerCase()
    );

    if (!countryFeature || !countryFeature.geometry) {
      console.warn("Invalid or missing geometry data for selected country.");
      return;
    }

    try {
      const { geometry } = countryFeature;

      // Handle different geometry types properly
      let polygons = [];

      // First, normalize the data structure based on geometry type
      if (geometry.type === "Polygon") {
        polygons = [geometry.coordinates[0]]; // Just the outer ring of the first polygon
      } else if (geometry.type === "MultiPolygon") {
        // Get the first coordinate set from each polygon
        polygons = geometry.coordinates.map((polygon: any) => polygon[0]);
      } else {
        console.warn(`Unsupported geometry type: ${geometry.type}`);
        return;
      }

      // Find the largest polygon (likely the main landmass)
      let largestPolygon = polygons[0];
      let maxSize = 0;

      for (const polygon of polygons) {
        if (polygon.length > maxSize) {
          maxSize = polygon.length;
          largestPolygon = polygon;
        }
      }

      // Calculate center point from the largest polygon
      let sumLng = 0;
      let sumLat = 0;
      const validCoords = largestPolygon.filter(
        (coord: any) =>
          Array.isArray(coord) &&
          coord.length >= 2 &&
          !isNaN(coord[0]) &&
          !isNaN(coord[1])
      );

      if (validCoords.length === 0) {
        console.warn("No valid coordinates found for country");
        return;
      }

      for (const coord of validCoords) {
        sumLng += coord[0];
        sumLat += coord[1];
      }

      const centerLng = sumLng / validCoords.length;
      const centerLat = sumLat / validCoords.length;

      // Validate the calculated coordinates
      if (isNaN(centerLng) || isNaN(centerLat)) {
        console.warn(
          "Invalid center coordinates calculated:",
          centerLng,
          centerLat
        );
        return;
      }

      // Apply color change
      world.hexPolygonColor((d: any) =>
        d.properties.ADMIN.toLowerCase() === state.selectedCountry.toLowerCase()
          ? "#FFD700" // Highlight selected country
          : "#1e293b"
      );

      // Smooth transition to selected country with controlled movement
      world.pointOfView(
        {
          lat: centerLat,
          lng: centerLng,
          altitude: 1.5, // Slightly closer view
        },
        1500 // Smooth transition time
      );
    } catch (error) {
      console.error("Error in selecting country transition:", error);
    }
  }, [state.selectedCountry, countriesData]);

  // Reset globe to default when game resets
  useEffect(() => {
    if (state.resetGame && globeRef.current) {
      const world = globeRef.current;

      // Reset auto-rotation
      const controls = world.controls();
      controls.autoRotate = true;

      // Reset view to default position
      world.pointOfView({ lat: 0, lng: 0, altitude: 2.5 }, 2000);
    }
  }, [state.resetGame]);

  // Clear the reset flag after applying reset**
  useEffect(() => {
    if (state.resetGame) {
      dispatch({ type: "CLEAR_GAME_RESET", payload: {} });
    }
  }, [state.resetGame]);

  return (
    <div
      id="globe-container"
      className="w-full h-[100vh] mt-[-5vh] overflow-hidden"
    />
  );
}
