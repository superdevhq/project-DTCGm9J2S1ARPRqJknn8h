
import { useInventory } from './hooks/useInventory';
import { useKeyboard } from './hooks/useKeyboard';
import { useEffect } from 'react';
import * as images from '@/assets/images';
import { TextureType } from './hooks/useStore';

const Inventory = () => {
  const { items, selectedSlot, selectSlot } = useInventory();
  const { dirt, grass, glass, wood, log } = useKeyboard();
  
  // Map number keys to inventory slots
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Number keys 1-9 select inventory slots 0-8
      if (e.key >= '1' && e.key <= '9') {
        const slot = parseInt(e.key) - 1;
        selectSlot(slot);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectSlot]);
  
  // Handle texture selection keys
  useEffect(() => {
    if (dirt) selectSlot(0);
    if (grass) selectSlot(1);
    if (glass) selectSlot(2);
    if (wood) selectSlot(3);
    if (log) selectSlot(4);
  }, [dirt, grass, glass, wood, log, selectSlot]);
  
  // Define the order of items in the hotbar
  const hotbarItems: TextureType[] = ['dirt', 'grass', 'glass', 'wood', 'log'];
  
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 bg-black/50 p-1 rounded-lg">
      {hotbarItems.map((type, index) => (
        <div 
          key={type}
          className={`w-16 h-16 relative border-2 rounded ${
            selectedSlot === index ? 'border-white' : 'border-gray-700'
          } bg-gray-800/80`}
          onClick={() => selectSlot(index)}
        >
          {items[type]?.count > 0 && (
            <>
              <img 
                src={images[type]} 
                alt={type}
                className="w-full h-full object-cover p-1"
              />
              <div className="absolute bottom-0 right-0 bg-black/70 px-1 rounded-tl text-white text-xs">
                {items[type].count}
              </div>
            </>
          )}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-white text-xs">
            {index + 1}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Inventory;
