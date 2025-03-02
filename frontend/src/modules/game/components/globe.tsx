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
  const markerRef = useRef<THREE.Sprite | null>(null);
  const [countriesData, setCountriesData] = useState<CountryFeature[] | null>(
    null
  );
  const [highlightedCountry, setHighlightedCountry] =
    useState<CountryFeature | null>(null);

  useEffect(() => {
    const globeContainer = document.getElementById("globe-container");
    if (!globeContainer) return;

    const world = new Globe(globeContainer)
      .globeImageUrl(
        "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      )
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.3)
      .hexPolygonUseDots(true)
      .hexPolygonColor(() => {
        return highlightedCountry ? "#4285F4" : "#1e293b";
      })
      // @ts-ignore
      .hexPolygonLabel(
        ({ properties: d }: { properties: CountryProperties }) => `
        <div style="background-color: rgba(0,0,0,0.75); color: white; border-radius: 6px; padding: 10px;">
          <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
          Population: <i>${d.POP_EST.toLocaleString()}</i>
        </div>
      `
      );

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
      type: "setGlobeInstance",
      payload: world,
    });

    // Cloud Layer
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
  }, [highlightedCountry]);

  /** 📍 Pinpoint the guessed location when state.guessedCity updates */
  useEffect(() => {
    if (!globeRef.current || !state.guessedCity || !countriesData) return;

    const { latitude, longitude, city, country } = state.guessedCity;
    const globeRadius = globeRef.current.getGlobeRadius();

    // Find the country in the GeoJSON data
    const countryFeature = countriesData.find(
      (feature) =>
        feature.properties.ADMIN.toLowerCase() === country.toLowerCase()
    );

    // Highlight the country by setting state
    if (countryFeature) {
      setHighlightedCountry(countryFeature);
    }

    // Remove previous marker
    if (markerRef.current) {
      globeRef.current.scene().remove(markerRef.current);
    }

    // Add a label for the guessed city and country
    globeRef.current
      .pointOfView({ lat: latitude, lng: longitude, altitude: 2 }, 2000) // Move to location
      .labelsData([
        { lat: latitude, lng: longitude, text: `${city}, ${country}` },
      ]) // Display text
      .labelText("text")
      .labelSize(1.8)
      .labelColor(() => "white")
      .labelDotRadius(0) // Remove the dot
      .labelResolution(5);

    // Create a sprite using location.png
    const markerLoader = new THREE.TextureLoader();
    markerLoader.load("/assets/common/location.png", (texture) => {
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
      });

      const sprite = new THREE.Sprite(spriteMaterial);
      // Scale the sprite appropriately
      sprite.scale.set(8, 8, 1);

      // Position marker slightly above the globe surface
      sprite.position.setFromSphericalCoords(
        globeRadius * 1.03, // 1.03 = Slightly above surface
        THREE.MathUtils.degToRad(90 - latitude),
        THREE.MathUtils.degToRad(longitude)
      );

      markerRef.current = sprite; // Store marker reference

      // Add marker to scene
      globeRef?.current?.scene().add(sprite);
    });

    // Add country info using HTML overlay
    const countryInfoDiv = document.createElement("div");
    countryInfoDiv.id = "country-info";
    countryInfoDiv.style.position = "absolute";
    countryInfoDiv.style.bottom = "20px";
    countryInfoDiv.style.left = "20px";
    countryInfoDiv.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    countryInfoDiv.style.color = "white";
    countryInfoDiv.style.padding = "10px";
    countryInfoDiv.style.borderRadius = "5px";
    countryInfoDiv.style.fontFamily = "Minecraft";

    // If we have population data from GeoJSON
    let populationInfo = "";
    if (countryFeature && countryFeature.properties.POP_EST) {
      populationInfo = `<p><strong>Population:</strong> ${countryFeature.properties.POP_EST.toLocaleString()}</p>`;
    }

    countryInfoDiv.innerHTML = `
      <h3>${city}, ${country}</h3>
      ${populationInfo}
      <p><em>Correctly guessed! 🎉</em></p>
    `;

    // Remove any existing info div
    const existingInfo = document.getElementById("country-info");
    if (existingInfo) {
      existingInfo.remove();
    }

    // Add the info div to the container
    const container = document.getElementById("globe-container");
    if (container) {
      container.appendChild(countryInfoDiv);
    }

    // Update hexagon colors to highlight the guessed country
    if (countryFeature && globeRef.current) {
      globeRef.current.hexPolygonColor((d: any) => {
        // Highlight the country that was guessed
        return d === countryFeature ? "#4285F4" : "#1e293b";
      });
    }
  }, [state.guessedCity, countriesData]);

  return (
    <div
      id="globe-container"
      className="w-full h-[100vh] mt-[-5vh] overflow-hidden"
    />
  );
}
