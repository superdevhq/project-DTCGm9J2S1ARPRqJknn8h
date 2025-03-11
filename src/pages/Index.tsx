
import { useState } from 'react';

const MinecraftClone = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-black/80 p-8 rounded-lg text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-white">Minecraft Clone</h1>
        <p className="text-gray-300 mb-6">
          We're currently fixing some technical issues with the 3D rendering.
          Please check back soon!
        </p>
        <button 
          className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? 'Stop Game' : 'Start Game'}
        </button>
      </div>
    </div>
  );
};

export default MinecraftClone;
