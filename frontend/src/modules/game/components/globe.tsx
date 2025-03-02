// import { useEffect, useRef } from "react";
// import Globe, { GlobeInstance } from "globe.gl";
// import * as THREE from "three";
// import { useAppState } from "../../../store";

// export function GameGlobe() {
//   const [state, dispatch] = useAppState();
//   const globeRef = useRef<GlobeInstance | null>(null);
//   const markerRef = useRef<THREE.Mesh | null>(null);

//   useEffect(() => {
//     const globeContainer = document.getElementById("globe-container");
//     if (!globeContainer) return;

//     const world = new Globe(globeContainer)
//       .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
//       .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png");

//     const controls = world.controls();
//     controls.enableZoom = true;
//     controls.enablePan = true;
//     controls.enableRotate = true;
//     controls.zoomSpeed = 1.2;
//     controls.minDistance = 200;
//     controls.maxDistance = 900;
//     controls.autoRotate = true;
//     controls.enableDamping = true;
//     controls.autoRotateSpeed = 0.35;

//     globeRef.current = world;

//     dispatch({
//       type: "setGlobeInstance",
//       payload: world,
//     });

//     // Cloud Layer
//     const CLOUDS_IMG_URL = "/clouds.png";
//     const CLOUDS_ALT = 0.004;
//     const CLOUDS_ROTATION_SPEED = -0.006;

//     new THREE.TextureLoader().load(CLOUDS_IMG_URL, (cloudsTexture) => {
//       const clouds = new THREE.Mesh(
//         new THREE.SphereGeometry(world.getGlobeRadius() * (1 + CLOUDS_ALT), 75, 75),
//         new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true })
//       );
//       world.scene().add(clouds);

//       (function rotateClouds() {
//         clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
//         requestAnimationFrame(rotateClouds);
//       })();
//     });

//     return () => {
//       globeRef.current = null;
//     };
//   }, []);

//   /** 📍 Pinpoint the guessed location when state.guessedCity updates */
//   useEffect(() => {
//     if (!globeRef.current || !state.guessedCity) return;

//     const { latitude, longitude, city, country } = state.guessedCity;
//     const globeRadius = globeRef.current.getGlobeRadius();

//     // Remove previous marker
//     if (markerRef.current) {
//       globeRef.current.scene().remove(markerRef.current);
//     }

//     // Add a label for the guessed city
//     globeRef.current
//       .pointOfView({ lat: latitude, lng: longitude, altitude: 2 }, 2000) // Move to location
//       .labelsData([{ lat: latitude, lng: longitude, text: `${city}, ${country}` }]) // Display text
//       .labelText("text")
//       .labelSize(1.8)
//       .labelColor(() => "white")
//       .labelDotRadius(0.5)
//       .labelResolution(5);

//     // Create the marker (Red Sphere)
//     const markerGeometry = new THREE.SphereGeometry(0.7, 16, 16); // Larger size
//     const markerMaterial = new THREE.MeshBasicMaterial({ color: "red" });
//     const marker = new THREE.Mesh(markerGeometry, markerMaterial);
//     markerRef.current = marker; // Store marker reference

//     // Position marker slightly above the globe surface
//     marker.position.setFromSphericalCoords(
//       globeRadius * 1.02, // 1.02 = Slightly above surface
//       THREE.MathUtils.degToRad(90 - latitude),
//       THREE.MathUtils.degToRad(longitude)
//     );

//     // Add marker to scene
//     globeRef.current.scene().add(marker);
//   }, [state.guessedCity]); // Runs when guessedCity updates

//   return <div id="globe-container" className="w-full h-[100vh] mt-[-5vh] cursor-grab overflow-hidden" />;
// }

import { useEffect, useRef } from "react";
import Globe, { GlobeInstance } from "globe.gl";
import * as THREE from "three";
import { useAppState } from "../../../store";

export function GameGlobe() {
  const [state, dispatch] = useAppState();
  const globeRef = useRef<GlobeInstance | null>(null);
  const markerRef = useRef<THREE.Sprite | null>(null);

  useEffect(() => {
    const globeContainer = document.getElementById("globe-container");
    if (!globeContainer) return;

    const world = new Globe(globeContainer)
      .globeImageUrl(
        "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      )
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png");

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

    return () => {
      globeRef.current = null;
    };
  }, []);

  /** 📍 Pinpoint the guessed location when state.guessedCity updates */
  useEffect(() => {
    if (!globeRef.current || !state.guessedCity) return;

    const { latitude, longitude, city, country } = state.guessedCity;
    const globeRadius = globeRef.current.getGlobeRadius();

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

    // Optionally add country info using HTML overlay
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
    countryInfoDiv.innerHTML = `<strong>Location:</strong> ${city}, ${country}`;

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
  }, [state.guessedCity]); // Runs when guessedCity updates

  return (
    <div
      id="globe-container"
      className="w-full h-[100vh] mt-[-5vh]  overflow-hidden"
    />
  );
}
