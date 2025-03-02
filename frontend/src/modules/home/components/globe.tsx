import { useEffect, useRef } from "react";
import Globe, { GlobeInstance } from "globe.gl";
import * as THREE from "three";
import { useAppState } from "../../../store";

export function GameGlobe() {
  const [state, dispatch] = useAppState();
  const globeRef = useRef<GlobeInstance | null>(null);

  useEffect(() => {
    const globeContainer = document.getElementById("globe-container");
    if (!globeContainer) return;

    const world = new Globe(globeContainer)
      .globeImageUrl(
        "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      )
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png");

    // Auto-rotate setup
    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 0.35;

    globeRef.current = world;

    dispatch({
      type: "setGlobeInstance",
      payload: world,
    });

    // Add cloud layer
    const CLOUDS_IMG_URL = "/clouds.png"; // Adjust path if needed
    const CLOUDS_ALT = 0.004;
    const CLOUDS_ROTATION_SPEED = -0.006; // deg/frame

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

  return (
    <div id="globe-container" className="w-full h-full cursor-grab" />
  );
}
