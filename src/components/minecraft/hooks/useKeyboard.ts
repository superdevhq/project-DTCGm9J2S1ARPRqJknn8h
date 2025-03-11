
import { useCallback, useEffect, useState } from 'react';

// Define the actions we want to track
const actionKeys = {
  moveForward: ['ArrowUp', 'w', 'W'],
  moveBackward: ['ArrowDown', 's', 'S'],
  moveLeft: ['ArrowLeft', 'a', 'A'],
  moveRight: ['ArrowRight', 'd', 'D'],
  jump: [' '],
  dirt: ['1'],
  grass: ['2'],
  glass: ['3'],
  wood: ['4'],
  log: ['5'],
  save: ['p', 'P'],
  load: ['l', 'L'],
};

// Create a type for our actions
type ActionKey = keyof typeof actionKeys;

export const useKeyboard = () => {
  // Create a state object with all actions set to false initially
  const [actions, setActions] = useState<Record<ActionKey, boolean>>(
    Object.keys(actionKeys).reduce((acc, key) => {
      acc[key as ActionKey] = false;
      return acc;
    }, {} as Record<ActionKey, boolean>)
  );

  // Handle key down events
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Check each action to see if its key was pressed
    Object.entries(actionKeys).forEach(([action, keys]) => {
      // If the pressed key is in the keys array for this action
      if (keys.includes(e.key)) {
        // Prevent default for space (to avoid page scrolling)
        if (e.key === ' ') e.preventDefault();
        
        // Set the action to true
        setActions((prev) => ({
          ...prev,
          [action]: true,
        }));
      }
    });
  }, []);

  // Handle key up events
  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    // Check each action to see if its key was released
    Object.entries(actionKeys).forEach(([action, keys]) => {
      // If the released key is in the keys array for this action
      if (keys.includes(e.key)) {
        // Set the action to false
        setActions((prev) => ({
          ...prev,
          [action]: false,
        }));
      }
    });
  }, []);

  // Add and remove event listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return actions;
};
