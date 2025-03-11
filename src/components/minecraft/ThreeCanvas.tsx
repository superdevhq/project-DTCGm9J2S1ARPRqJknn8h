
import React, { Suspense } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';

// Ensure THREE is properly initialized
window.THREE = THREE;

// Simple fallback component while loading
const Fallback = () => (
  <mesh>
    <sphereGeometry args={[0.5, 16, 16]} />
    <meshStandardMaterial color="hotpink" />
  </mesh>
);

interface ThreeCanvasProps {
  children: React.ReactNode;
}

const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ children }) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        gl={{ 
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance'
        }}
        camera={{ 
          position: [0, 2, 5],
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        shadows
        dpr={[1, 2]} // Responsive pixel ratio
      >
        <Suspense fallback={<Fallback />}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} castShadow />
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;
