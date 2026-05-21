"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Scene() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const { clock } = state;
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[10, 3, 200, 32]} />
        <meshBasicMaterial 
          wireframe 
          color="#ffffff" 
          transparent 
          opacity={0.05} 
        />
      </mesh>
    </>
  );
}

export default function Geometry() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
      <Canvas camera={{ position: [0, 0, 30], fov: 45 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
