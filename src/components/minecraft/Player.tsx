
import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import { Vector3 } from 'three';
import { useKeyboard } from './hooks/useKeyboard';

const JUMP_FORCE = 10;
const SPEED = 5;

const Player = ({ position = [0, 0, 0] }: { position?: [number, number, number] }) => {
  const { camera } = useThree();
  const { moveForward, moveBackward, moveLeft, moveRight, jump } = useKeyboard();
  
  // Create a physics sphere for the player
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position,
  }));
  
  // Velocity ref to track player movement
  const velocity = useRef([0, 0, 0]);
  useEffect(() => {
    // Subscribe to physics changes
    api.velocity.subscribe((v) => (velocity.current = v));
  }, [api.velocity]);
  
  // Position ref to track player position
  const pos = useRef(position);
  useEffect(() => {
    // Subscribe to position changes
    api.position.subscribe((p) => (pos.current = p));
  }, [api.position]);
  
  // Handle player movement on each frame
  useFrame(() => {
    // Update camera position to follow player
    camera.position.copy(
      new Vector3(pos.current[0], pos.current[1] + 1.5, pos.current[2])
    );
    
    // Get the forward/right directions based on camera orientation
    const direction = new Vector3();
    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    );
    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    );
    
    // Calculate movement direction
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);
    
    // Apply movement to physics body
    api.velocity.set(direction.x, velocity.current[1], direction.z);
    
    // Handle jumping
    if (jump && Math.abs(velocity.current[1]) < 0.05) {
      api.velocity.set(velocity.current[0], JUMP_FORCE, velocity.current[2]);
    }
  });
  
  return <mesh ref={ref} />;
};

export default Player;
