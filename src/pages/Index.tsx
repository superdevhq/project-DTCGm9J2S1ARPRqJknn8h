
import { useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';

// Ensure THREE is properly initialized
if (typeof window !== 'undefined') {
  window.THREE = THREE;
}

// A simple box component
const Box = (props) => {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={props.color || "orange"} />
    </mesh>
  );
};

// Ground component
const Ground = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#5d8a68" />
    </mesh>
  );
};

// Simple scene component
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow 
        shadow-mapSize={[2048, 2048]}
      />
      <Box position={[0, 0, 0]} />
      <Box position={[2, 0, 0]} color="blue" />
      <Box position={[-2, 0, 0]} color="red" />
      <Ground />
      <Sky sunPosition={[100, 10, 100]} />
      <OrbitControls />
    </>
  );
};

const MinecraftClone = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Ensure Three.js is loaded before rendering
  useEffect(() => {
    if (typeof window !== 'undefined' && window.THREE) {
      setIsLoaded(true);
    }
  }, []);
  
  return (
    <>
      {!isPlaying ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="bg-black/80 p-8 rounded-lg text-center max-w-md">
            <h1 className="text-4xl font-bold mb-4 text-white">Minecraft Clone</h1>
            <p className="text-gray-300 mb-6">
              Click the button below to start the 3D game.
            </p>
            <button 
              className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              onClick={() => setIsPlaying(true)}
            >
              Start Game
            </button>
          </div>
        </div>
      ) : (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
          {isLoaded && (
            <Canvas
              shadows
              camera={{ position: [0, 2, 5], fov: 75 }}
              gl={{ antialias: true }}
            >
              <Scene />
            </Canvas>
          )}
          
          <button 
            className="absolute top-4 right-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            onClick={() => setIsPlaying(false)}
          >
            Exit Game
          </button>
        </div>
      )}
    </>
  );
};

export default MinecraftClone;
