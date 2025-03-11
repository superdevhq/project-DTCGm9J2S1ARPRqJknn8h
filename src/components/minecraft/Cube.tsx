
import { useBox } from '@react-three/cannon';
import { useState, useEffect } from 'react';
import { useStore, TextureType } from './hooks/useStore';
import { useInventory } from './hooks/useInventory';
import { TextureLoader, NearestFilter } from 'three';
import * as textures from '@/assets/textures';

interface CubeProps {
  id: string;
  position: [number, number, number];
  texture: TextureType;
}

const Cube = ({ id, position, texture }: CubeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [cubeTexture, setCubeTexture] = useState<THREE.Texture | null>(null);
  
  const [ref] = useBox(() => ({
    type: 'Static',
    position,
  }));
  
  const addCube = useStore((state) => state.addCube);
  const removeCube = useStore((state) => state.removeCube);
  
  const { addItem, removeItem, getSelectedItem } = useInventory();
  
  // Load texture based on the cube's texture type
  useEffect(() => {
    const loader = new TextureLoader();
    const textureUrl = textures[texture];
    
    loader.load(textureUrl, (loadedTexture) => {
      loadedTexture.magFilter = NearestFilter;
      setCubeTexture(loadedTexture);
    });
  }, [texture]);
  
  // Handle cube click events
  const handleCubeClick = (e: any) => {
    e.stopPropagation();
    
    // Left click removes the cube
    if (e.button === 0) {
      removeCube(id);
      // Add the block to inventory when mined
      addItem(texture, 1);
    }
    // Right click adds a cube adjacent to the clicked face
    else if (e.button === 2) {
      // Get the selected block type from inventory
      const selectedType = getSelectedItem();
      if (!selectedType) return; // No blocks available
      
      // Get the normal vector of the face that was clicked
      const clickedFace = Math.floor(e.faceIndex / 2);
      const [x, y, z] = position;
      
      // Calculate new position based on clicked face
      let newPos: [number, number, number] = [x, y, z];
      
      if (clickedFace === 0) newPos = [x + 1, y, z];
      else if (clickedFace === 1) newPos = [x - 1, y, z];
      else if (clickedFace === 2) newPos = [x, y + 1, z];
      else if (clickedFace === 3) newPos = [x, y - 1, z];
      else if (clickedFace === 4) newPos = [x, y, z + 1];
      else if (clickedFace === 5) newPos = [x, y, z - 1];
      
      // Add the cube and remove from inventory
      addCube(...newPos);
      removeItem(selectedType, 1);
    }
  };
  
  return (
    <mesh 
      ref={ref}
      onClick={handleCubeClick}
      onContextMenu={handleCubeClick}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      castShadow
      receiveShadow
    >
      <boxGeometry attach="geometry" />
      <meshStandardMaterial 
        attach="material" 
        map={cubeTexture}
        color={isHovered ? 'gray' : 'white'} 
        transparent={texture === 'glass'}
        opacity={texture === 'glass' ? 0.7 : 1}
      />
    </mesh>
  );
};

export default Cube;
