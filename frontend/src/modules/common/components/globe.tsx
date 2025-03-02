import React, { useEffect, useRef } from "react";
import Globe, { GlobeInstance } from "globe.gl";
import { useAppState } from "../../../store";
import { cities } from "../../../utils/city";
import { Input } from "pixel-retroui";
import { PixelButton } from "./button";
import { useForm } from "react-hook-form";
import * as THREE from "three";

type FormValues = {
  guess: string;
};

const GameGlobe: React.FC = () => {
  const globeRef = useRef<GlobeInstance | null>(null);
  const [state, dispatch] = useAppState();
  const { register, handleSubmit, reset } = useForm<FormValues>();

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

    // Add cloud layer
    const CLOUDS_IMG_URL = "/clouds.png"; // Adjust path if needed
    const CLOUDS_ALT = 0.004;
    const CLOUDS_ROTATION_SPEED = -0.006; // deg/frame

    new THREE.TextureLoader().load(CLOUDS_IMG_URL, (cloudsTexture: any) => {
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

  const handleGuess = (data: FormValues) => {
    const cityData = cities.find(
      (city) => city.city.toLowerCase() === data.guess.toLowerCase()
    );

    if (cityData) {
      dispatch({ type: "updateScore", payload: { score: state.score + 1 } });
      dispatch({
        type: "addGuess",
        payload: { city: cityData, correct: true },
      });

      // Move the globe to the guessed location
      globeRef.current?.pointOfView(
        { lat: cityData.latitude, lng: cityData.longitude, altitude: 1.5 },
        2000
      );
    } else {
      dispatch({
        type: "addGuess",
        payload: { city: data.guess, correct: false },
      });
    }

    reset();
  };

  return (
    <div>
      <div id="globe-container" style={{ width: "100vw", height: "80vh" }} />

      <form onSubmit={handleSubmit(handleGuess)}>
        <Input
          {...register("guess", { required: true })}
          type="text"
          placeholder="Enter city name"
        />
        <PixelButton type="submit" label="Guess" />
      </form>

      <h2>Score: {state.score}</h2>

      <ul>
        {state?.guessedCities?.map(
          ({ city, index }: { city: any; index: number }) => (
            <li key={index} style={{ color: city.correct ? "green" : "red" }}>
              {city.city} {city.correct ? "✓" : "✗"}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default GameGlobe;
