
import { create } from 'zustand';
import { nanoid } from 'nanoid';

// Define the texture types
export type TextureType = 'dirt' | 'grass' | 'glass' | 'wood' | 'log';

// Define the cube structure
export type CubeType = {
  id: string;
  pos: [number, number, number];
  texture: TextureType;
};

// Define the store state
interface GameState {
  // Texture state
  texture: TextureType;
  setTexture: (texture: TextureType) => void;
  
  // Cubes state
  cubes: CubeType[];
  addCube: (x: number, y: number, z: number, texture?: TextureType) => void;
  removeCube: (id: string) => void;
  
  // Save/load world
  saveWorld: () => void;
  loadWorld: () => void;
  
  // World generation flag
  worldGenerated: boolean;
  setWorldGenerated: (generated: boolean) => void;
}

// Create the store
export const useStore = create<GameState>((set) => ({
  // Default texture is dirt
  texture: 'dirt',
  setTexture: (texture) => set(() => ({ texture })),
  
  // Start with empty cubes array
  cubes: [],
  
  // Add a cube at the specified position
  addCube: (x, y, z, texture) => {
    set((state) => ({
      cubes: [
        ...state.cubes,
        {
          id: nanoid(),
          pos: [x, y, z],
          texture: texture || state.texture,
        },
      ],
    }));
  },
  
  // Remove a cube by id
  removeCube: (id) => {
    set((state) => ({
      cubes: state.cubes.filter((cube) => cube.id !== id),
    }));
  },
  
  // Save world to localStorage
  saveWorld: () => {
    set((state) => {
      localStorage.setItem('minecraft-world', JSON.stringify(state.cubes));
      return state;
    });
  },
  
  // Load world from localStorage
  loadWorld: () => {
    const savedWorld = localStorage.getItem('minecraft-world');
    if (savedWorld) {
      set(() => ({
        cubes: JSON.parse(savedWorld),
        worldGenerated: true
      }));
    }
  },
  
  // Track if world has been generated
  worldGenerated: false,
  setWorldGenerated: (generated) => set(() => ({ worldGenerated: generated })),
}));
