import { useEffect, useRef } from "react";
import Globe, { GlobeInstance } from "globe.gl";
import * as THREE from "three";
import { useAppState } from "../../../store";

export function GameGlobe() {
  const [state, dispatch] = useAppState();
  const globeRef = useRef<GlobeInstance | null>(null);
  const markerRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const globeContainer = document.getElementById("globe-container");
    if (!globeContainer) return;

    const world = new Globe(globeContainer)
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
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
        new THREE.SphereGeometry(world.getGlobeRadius() * (1 + CLOUDS_ALT), 75, 75),
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

    // Add a label for the guessed city
    globeRef.current
      .pointOfView({ lat: latitude, lng: longitude, altitude: 2 }, 2000) // Move to location
      .labelsData([{ lat: latitude, lng: longitude, text: `${city}, ${country}` }]) // Display text
      .labelText("text")
      .labelSize(1.8)
      .labelColor(() => "white")
      .labelDotRadius(0.5)
      .labelResolution(5);

    // Create the marker (Red Sphere)
    const markerGeometry = new THREE.SphereGeometry(0.7, 16, 16); // Larger size
    const markerMaterial = new THREE.MeshBasicMaterial({ color: "red" });
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    markerRef.current = marker; // Store marker reference

    // Position marker slightly above the globe surface
    marker.position.setFromSphericalCoords(
      globeRadius * 1.02, // 1.02 = Slightly above surface
      THREE.MathUtils.degToRad(90 - latitude),
      THREE.MathUtils.degToRad(longitude)
    );

    // Add marker to scene
    globeRef.current.scene().add(marker);
  }, [state.guessedCity]); // Runs when guessedCity updates

  return <div id="globe-container" className="w-full h-[100vh] mt-[-5vh] cursor-grab overflow-hidden" />;
}
