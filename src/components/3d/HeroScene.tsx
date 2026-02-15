import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, OrbitControls } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function AnimatedRing({ position, rotation, color, speed = 1 }: { position: [number, number, number]; rotation: [number, number, number]; color: string; speed?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x += 0.005 * speed;
      ref.current.rotation.y += 0.008 * speed;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
    }
  });
  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <torusGeometry args={[1, 0.08, 16, 64]} />
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} emissive={color} emissiveIntensity={0.3} />
    </mesh>
  );
}

function GlowingSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.003;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={ref}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <MeshDistortMaterial
          color="#dc2626"
          metalness={0.6}
          roughness={0.1}
          distort={0.25}
          speed={2}
          emissive="#dc2626"
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const count = 80;
  const ref = useRef<THREE.Points>(null);
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
  }
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.001;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#dc2626" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function AircraftShape() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1 - 0.2;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} scale={0.8}>
        {/* Fuselage */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.15, 1.8, 8, 16]} />
          <meshStandardMaterial color="#e5e7eb" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Wings */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[2.8, 0.04, 0.5]} />
          <meshStandardMaterial color="#d1d5db" metalness={0.8} roughness={0.15} />
        </mesh>
        {/* Tail wing horizontal */}
        <mesh position={[0, 0.85, 0]}>
          <boxGeometry args={[1, 0.03, 0.3]} />
          <meshStandardMaterial color="#d1d5db" metalness={0.8} roughness={0.15} />
        </mesh>
        {/* Tail wing vertical */}
        <mesh position={[0, 0.85, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[0.03, 0.5, 0.4]} />
          <meshStandardMaterial color="#dc2626" metalness={0.7} roughness={0.2} />
        </mesh>
        {/* Engine glow */}
        <pointLight position={[0, -1, 0]} color="#dc2626" intensity={2} distance={3} />
        {/* Wing tips */}
        <mesh position={[1.4, 0, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={2} />
        </mesh>
        <mesh position={[-1.4, 0, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={2} />
        </mesh>
      </group>
    </Float>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-[1]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
          <directionalLight position={[-3, -3, 2]} intensity={0.4} color="#dc2626" />
          <pointLight position={[0, 2, 3]} intensity={0.8} color="#dc2626" />
          
          <AircraftShape />
          
          <AnimatedRing position={[0, 0, -1]} rotation={[0.5, 0, 0]} color="#dc2626" speed={0.8} />
          <AnimatedRing position={[0, 0, -1]} rotation={[1.2, 0.8, 0]} color="#991b1b" speed={1.2} />
          <AnimatedRing position={[0, 0, -1]} rotation={[0, 1.5, 0.5]} color="#b91c1c" speed={0.6} />
          
          <Particles />
          
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
        </Suspense>
      </Canvas>
    </div>
  );
}
