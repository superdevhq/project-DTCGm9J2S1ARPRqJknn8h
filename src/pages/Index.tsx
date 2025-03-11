
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// A simple box component
const Box = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

// A simple scene component
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Box />
      <OrbitControls />
    </>
  );
};

const MinecraftClone = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  return (
    <>
      {!isPlaying ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="bg-black/80 p-8 rounded-lg text-center max-w-md">
            <h1 className="text-4xl font-bold mb-4 text-white">Minecraft Clone</h1>
            <p className="text-gray-300 mb-6">
              Click the button below to start the game. We're using a simplified version
              while we fix some technical issues.
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
        <div style={{ width: '100vw', height: '100vh' }}>
          <Canvas>
            <Scene />
          </Canvas>
          
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
