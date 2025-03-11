
import { Canvas } from '@react-three/fiber';
import { Sky, PointerLockControls } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { Suspense, useState, useEffect } from 'react';
import Player from '@/components/minecraft/Player';
import Ground from '@/components/minecraft/Ground';
import Cubes from '@/components/minecraft/Cubes';
import HUD from '@/components/minecraft/HUD';
import TextureSelector from '@/components/minecraft/TextureSelector';
import Inventory from '@/components/minecraft/Inventory';
import { useStore } from '@/components/minecraft/hooks/useStore';
import { useTerrainGenerator } from '@/components/minecraft/hooks/useTerrainGenerator';

const MinecraftClone = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const loadWorld = useStore((state) => state.loadWorld);
  const worldGenerated = useStore((state) => state.worldGenerated);
  const setWorldGenerated = useStore((state) => state.setWorldGenerated);
  const { generateTerrain } = useTerrainGenerator();
  
  // Load saved world on initial render
  useEffect(() => {
    loadWorld();
    
    // If no world was loaded, generate a new one when the game starts
    if (!worldGenerated && isPlaying) {
      generateTerrain();
      setWorldGenerated(true);
    }
  }, [loadWorld, worldGenerated, isPlaying, generateTerrain, setWorldGenerated]);
  
  return (
    <>
      {!isPlaying ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/80 p-8 rounded-lg text-center max-w-md">
            <h1 className="text-4xl font-bold mb-4 text-white">Minecraft Clone</h1>
            <p className="text-gray-300 mb-6">
              Click to play! Use WASD to move, SPACE to jump, and mouse to look around.
              Left click to remove blocks, right click to place blocks.
              Use number keys 1-5 to select different block types.
              Press P to save your world and L to load it.
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
        <>
          <Canvas 
            shadows 
            camera={{ fov: 75, near: 0.1, far: 1000 }}
            gl={{ antialias: false }}
            style={{ height: '100vh', width: '100vw' }}
          >
            <Sky sunPosition={[100, 100, 20]} />
            <ambientLight intensity={0.5} />
            <directionalLight 
              position={[10, 10, 5]} 
              intensity={0.6} 
              castShadow 
              shadow-mapSize={[2048, 2048]} 
            />
            
            <Physics gravity={[0, -30, 0]}>
              <Player position={[0, 10, 0]} />
              <Ground position={[0, -0.5, 0]} />
              <Cubes />
            </Physics>
            
            <PointerLockControls />
          </Canvas>
          
          <div className="fixed inset-0 pointer-events-none">
            <div className="pointer-events-auto">
              <HUD />
              <TextureSelector />
              <Inventory />
            </div>
            
            {/* Crosshair */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MinecraftClone;
