
import { useKeyboard } from './hooks/useKeyboard';
import { useStore, TextureType } from './hooks/useStore';
import { useEffect, useState } from 'react';
import * as images from '@/assets/images';

const TextureSelector = () => {
  const [visible, setVisible] = useState(false);
  const [activeTexture, setActiveTexture] = useState<TextureType>('dirt');
  
  const {
    dirt,
    grass,
    glass,
    wood,
    log,
  } = useKeyboard();
  
  const setTexture = useStore((state) => state.setTexture);
  
  // Show texture selector when a texture key is pressed
  useEffect(() => {
    const textures = {
      dirt,
      grass,
      glass,
      wood,
      log,
    };
    
    // Find the first active texture
    const pressedTexture = Object.entries(textures).find(([_, isPressed]) => isPressed);
    
    if (pressedTexture) {
      setActiveTexture(pressedTexture[0] as TextureType);
      setTexture(pressedTexture[0] as TextureType);
      setVisible(true);
      
      // Hide the texture selector after 2 seconds
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 2000);
      
      return () => clearTimeout(timeout);
    }
  }, [dirt, grass, glass, wood, log, setTexture]);
  
  // If not visible, don't render anything
  if (!visible) return null;
  
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 items-center bg-black/50 p-2 rounded-lg">
      {Object.entries({
        dirt,
        grass,
        glass,
        wood,
        log,
      }).map(([textureName, isActive]) => (
        <div 
          key={textureName}
          className={`w-12 h-12 border-2 rounded ${
            activeTexture === textureName ? 'border-white' : 'border-transparent'
          }`}
        >
          <img 
            src={images[textureName as TextureType]} 
            alt={textureName}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default TextureSelector;
