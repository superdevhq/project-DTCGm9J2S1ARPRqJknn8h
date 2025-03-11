
import { useCallback, useEffect, useState } from 'react';
import { useStore } from './useStore';

export const useMouseInteractions = () => {
  const [isLeftClicking, setIsLeftClicking] = useState(false);
  const [isRightClicking, setIsRightClicking] = useState(false);
  
  const removeCube = useStore((state) => state.removeCube);
  const addCube = useStore((state) => state.addCube);

  // Handle mouse down events
  const handleMouseDown = useCallback((e: MouseEvent) => {
    // Left click (remove block)
    if (e.button === 0) {
      setIsLeftClicking(true);
    }
    // Right click (place block)
    else if (e.button === 2) {
      setIsRightClicking(true);
    }
  }, []);

  // Handle mouse up events
  const handleMouseUp = useCallback((e: MouseEvent) => {
    // Left click released
    if (e.button === 0) {
      setIsLeftClicking(false);
    }
    // Right click released
    else if (e.button === 2) {
      setIsRightClicking(false);
    }
  }, []);

  // Prevent context menu on right click
  const handleContextMenu = useCallback((e: Event) => {
    e.preventDefault();
  }, []);

  // Add and remove event listeners
  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('contextmenu', handleContextMenu);
    
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [handleMouseDown, handleMouseUp, handleContextMenu]);

  return { isLeftClicking, isRightClicking };
};
