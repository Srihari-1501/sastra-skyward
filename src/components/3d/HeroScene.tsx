import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Aircraft() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle banking motion like flying
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05 - 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} rotation={[0, -0.6, 0]} scale={1.1}>
        {/* Fuselage */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.12, 2.2, 12, 24]} />
          <meshStandardMaterial color="#e5e7eb" metalness={0.95} roughness={0.05} />
        </mesh>

        {/* Nose cone */}
        <mesh position={[0, -1.3, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.12, 0.4, 24]} />
          <meshStandardMaterial color="#d1d5db" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Main wings - swept back */}
        <mesh position={[0, 0.1, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[3.6, 0.035, 0.55]} />
          <meshStandardMaterial color="#d4d4d8" metalness={0.85} roughness={0.12} />
        </mesh>

        {/* Wing tips - angled up */}
        <mesh position={[1.85, 0.2, 0]} rotation={[0, 0, 0.3]}>
          <boxGeometry args={[0.15, 0.03, 0.35]} />
          <meshStandardMaterial color="#dc2626" metalness={0.8} roughness={0.15} />
        </mesh>
        <mesh position={[-1.85, 0.2, 0]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.15, 0.03, 0.35]} />
          <meshStandardMaterial color="#dc2626" metalness={0.8} roughness={0.15} />
        </mesh>

        {/* Horizontal stabilizer */}
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[1.2, 0.025, 0.3]} />
          <meshStandardMaterial color="#d4d4d8" metalness={0.85} roughness={0.12} />
        </mesh>

        {/* Vertical stabilizer */}
        <mesh position={[0, 0.95, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[0.025, 0.45, 0.5]} />
          <meshStandardMaterial color="#dc2626" metalness={0.8} roughness={0.15} />
        </mesh>

        {/* Red stripe on fuselage */}
        <mesh position={[0, -0.2, 0.125]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[1.5, 0.01, 0.025]} />
          <meshStandardMaterial color="#dc2626" metalness={0.7} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.2, -0.125]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[1.5, 0.01, 0.025]} />
          <meshStandardMaterial color="#dc2626" metalness={0.7} roughness={0.2} />
        </mesh>

        {/* Wing tip lights */}
        <mesh position={[1.8, 0.1, 0]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={3} />
        </mesh>
        <mesh position={[-1.8, 0.1, 0]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={3} />
        </mesh>

        {/* Tail light */}
        <mesh position={[0, 1.15, 0]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
        </mesh>

        {/* Engine glow underneath */}
        <pointLight position={[0, -1, 0]} color="#dc2626" intensity={1.5} distance={2} />
      </group>
    </Float>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none">
      <Canvas
        camera={{ position: [0, -1, 5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
          <directionalLight position={[-3, 2, 2]} intensity={0.5} color="#dc2626" />
          <pointLight position={[0, 3, 4]} intensity={0.6} color="#f5f5f5" />

          <Aircraft />
        </Suspense>
      </Canvas>
    </div>
  );
}
