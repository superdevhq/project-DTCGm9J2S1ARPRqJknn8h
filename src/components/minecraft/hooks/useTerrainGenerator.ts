
import { useStore } from './useStore';
import { createNoise2D } from 'simplex-noise';

// Create a new simplex noise instance
const noise2D = createNoise2D();

interface TerrainGeneratorOptions {
  width?: number;
  depth?: number;
  maxHeight?: number;
  scale?: number;
  seed?: number;
}

export const useTerrainGenerator = () => {
  const addCube = useStore((state) => state.addCube);
  
  // Generate terrain based on simplex noise
  const generateTerrain = ({
    width = 20,
    depth = 20,
    maxHeight = 10,
    scale = 0.1,
    seed = Math.random(),
  }: TerrainGeneratorOptions = {}) => {
    // Generate a 2D heightmap using simplex noise
    for (let x = -width / 2; x < width / 2; x++) {
      for (let z = -depth / 2; z < depth / 2; z++) {
        // Generate height using simplex noise
        const nx = x * scale + seed;
        const nz = z * scale + seed;
        
        // Get noise value between -1 and 1
        const noiseValue = noise2D(nx, nz);
        
        // Convert to height value between 0 and maxHeight
        const height = Math.floor((noiseValue + 1) * maxHeight / 2);
        
        // Create the terrain at this position
        addCube(x, height, z, 'grass');
        
        // Add dirt blocks below the surface
        for (let y = height - 1; y > height - 3 && y >= 0; y--) {
          addCube(x, y, z, 'dirt');
        }
        
        // Add stone blocks below the dirt
        for (let y = height - 3; y >= 0; y--) {
          addCube(x, y, z, 'wood');
        }
      }
    }
    
    // Add some trees
    for (let i = 0; i < 5; i++) {
      const treeX = Math.floor(Math.random() * width - width / 2);
      const treeZ = Math.floor(Math.random() * depth - depth / 2);
      
      // Find the ground height at this position
      const nx = treeX * scale + seed;
      const nz = treeZ * scale + seed;
      const noiseValue = noise2D(nx, nz);
      const groundHeight = Math.floor((noiseValue + 1) * maxHeight / 2);
      
      // Create a tree trunk
      const treeHeight = 4 + Math.floor(Math.random() * 3);
      for (let y = groundHeight + 1; y < groundHeight + treeHeight; y++) {
        addCube(treeX, y, treeZ, 'log');
      }
      
      // Create tree leaves
      for (let x = treeX - 2; x <= treeX + 2; x++) {
        for (let z = treeZ - 2; z <= treeZ + 2; z++) {
          for (let y = groundHeight + treeHeight - 1; y < groundHeight + treeHeight + 2; y++) {
            // Skip the corners for a more rounded shape
            if (
              (x === treeX - 2 && z === treeZ - 2) ||
              (x === treeX - 2 && z === treeZ + 2) ||
              (x === treeX + 2 && z === treeZ - 2) ||
              (x === treeX + 2 && z === treeZ + 2)
            ) {
              continue;
            }
            
            // Add leaf block
            addCube(x, y, z, 'grass');
          }
        }
      }
    }
  };
  
  return { generateTerrain };
};
