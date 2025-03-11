
import { usePlane } from '@react-three/cannon';
import { useStore } from './hooks/useStore';
import { RepeatWrapping, NearestFilter, TextureLoader } from 'three';
import { useEffect, useState } from 'react';

// Use a placeholder texture URL instead of local import
const GRASS_TEXTURE_URL = 'https://raw.githubusercontent.com/pmndrs/drei-assets/master/prototype/light/texture_08.png';

const Ground = ({ position = [0, 0, 0] }: { position?: [number, number, number] }) => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0], // Rotate to be flat
    position,
    type: 'Static',
  }));
  
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const addCube = useStore((state) => state.addCube);
  
  // Load texture
  useEffect(() => {
    const loader = new TextureLoader();
    loader.load(GRASS_TEXTURE_URL, (loadedTexture) => {
      loadedTexture.wrapS = RepeatWrapping;
      loadedTexture.wrapT = RepeatWrapping;
      loadedTexture.repeat.set(100, 100);
      loadedTexture.magFilter = NearestFilter;
      setTexture(loadedTexture);
    });
  }, []);
  
  // Handle right click to add cube
  const handleClickGround = (e: any) => {
    e.stopPropagation();
    
    // Get the point where we clicked
    const [x, y, z] = Object.values(e.point).map((coord: number) => 
      Math.ceil(coord - 0.5)
    );
    
    // Add a cube at that position
    addCube(x, y, z);
  };
  
  return (
    <mesh 
      ref={ref} 
      receiveShadow
      onClick={handleClickGround}
    >
      <planeGeometry attach="geometry" args={[1000, 1000]} />
      <meshStandardMaterial 
        attach="material" 
        color={texture ? 'white' : 'green'} 
        map={texture}
      />
    </mesh>
  );
};

export default Ground;
