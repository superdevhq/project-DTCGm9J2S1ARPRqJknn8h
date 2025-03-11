
import { useStore } from './hooks/useStore';
import { useKeyboard } from './hooks/useKeyboard';
import { useEffect } from 'react';

const HUD = () => {
  const { save, load } = useKeyboard();
  const saveWorld = useStore((state) => state.saveWorld);
  const loadWorld = useStore((state) => state.loadWorld);
  
  // Handle save/load keyboard shortcuts
  useEffect(() => {
    if (save) saveWorld();
    if (load) loadWorld();
  }, [save, load, saveWorld, loadWorld]);
  
  return (
    <div className="absolute left-1/2 bottom-4 -translate-x-1/2 text-white text-center">
      <div className="bg-black/50 p-2 rounded-lg">
        <div className="flex gap-2 justify-center">
          <div className="px-2 py-1 bg-white/20 rounded">
            WASD: Move
          </div>
          <div className="px-2 py-1 bg-white/20 rounded">
            SPACE: Jump
          </div>
          <div className="px-2 py-1 bg-white/20 rounded">
            1-5: Select Block
          </div>
          <div className="px-2 py-1 bg-white/20 rounded">
            P: Save
          </div>
          <div className="px-2 py-1 bg-white/20 rounded">
            L: Load
          </div>
        </div>
        <div className="mt-2 text-xs">
          Left click to remove blocks, right click to place blocks
        </div>
      </div>
    </div>
  );
};

export default HUD;
