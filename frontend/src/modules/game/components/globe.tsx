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
        ({ properties: d }: { properties: CountryProperties }) => `
        <div style="background-color: rgba(0,0,0,0.75); color: white; border-radius: 6px; padding: 10px; font-family:Minecraft">
          <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
          Population: <i>${d.POP_EST.toLocaleString()}</i>
        </div>
      `
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

  // Handle Country Selection
  useEffect(() => {
    if (!globeRef.current || !state.selectedCountry || !countriesData) return;

    // Find the selected country
    const countryFeature = countriesData.find(
      (feature) =>
        feature.properties.ADMIN.toLowerCase() ===
        state.selectedCountry.toLowerCase()
    );

    if (countryFeature) {
      // Stop auto-rotation
      const controls = globeRef.current.controls();
      controls.autoRotate = false;

      // Calculate country center and move view
      const { geometry } = countryFeature;
      const centerCoords = geometry.coordinates[0]
        .reduce(
          (acc: number[], coord: number[]) => [
            acc[0] + coord[0],
            acc[1] + coord[1],
          ],
          [0, 0]
        )
        .map((sum: number) => sum / geometry.coordinates[0].length);

      globeRef.current.hexPolygonColor((d: any) =>
        d.properties.ADMIN.toLowerCase() ===
        state?.selectedCountry?.toLowerCase()
          ? "#FFD700" // Yellow for selected country
          : "#1e293b"
      );
      // Move to country
      globeRef.current.pointOfView(
        {
          lat: centerCoords[1],
          lng: centerCoords[0],
          altitude: 2,
        },
        2000
      );
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
