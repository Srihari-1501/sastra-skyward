import { Canvas } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import { Suspense, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function JetAircraft() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.06;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
      groupRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  const fuselageShape = useMemo(() => {
    const shape = new THREE.Shape();
    // Cross-section circle for lathe
    const points: THREE.Vector2[] = [];
    // Nose taper
    points.push(new THREE.Vector2(0, -2.5));
    points.push(new THREE.Vector2(0.08, -2.3));
    points.push(new THREE.Vector2(0.18, -2.0));
    points.push(new THREE.Vector2(0.22, -1.5));
    // Main body
    points.push(new THREE.Vector2(0.25, -1.0));
    points.push(new THREE.Vector2(0.25, 1.0));
    // Tail taper
    points.push(new THREE.Vector2(0.2, 1.5));
    points.push(new THREE.Vector2(0.12, 2.0));
    points.push(new THREE.Vector2(0.06, 2.3));
    points.push(new THREE.Vector2(0, 2.5));
    return points;
  }, []);

  const wingShape = useMemo(() => {
    const shape = new THREE.Shape();
    // Delta wing profile
    shape.moveTo(0, 0);
    shape.lineTo(2.2, 0.6);
    shape.lineTo(2.0, 0.7);
    shape.lineTo(1.8, 0.75);
    shape.lineTo(0, 1.2);
    shape.lineTo(-1.8, 0.75);
    shape.lineTo(-2.0, 0.7);
    shape.lineTo(-2.2, 0.6);
    shape.closePath();
    return shape;
  }, []);

  const tailFinShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0.02, 0);
    shape.lineTo(0.02, 0.7);
    shape.lineTo(-0.15, 0.3);
    shape.lineTo(-0.15, 0);
    shape.closePath();
    return shape;
  }, []);

  return (
    <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.2}>
      <group ref={groupRef} rotation={[-0.3, -2.2, 0.15]} scale={0.9} position={[0, 0.5, 0]}>
        {/* Fuselage - lathe geometry for smooth body */}
        <mesh rotation={[0, 0, 0]}>
          <latheGeometry args={[fuselageShape, 32]} />
          <meshStandardMaterial color="#c8cdd3" metalness={0.95} roughness={0.08} envMapIntensity={1.2} />
        </mesh>

        {/* Cockpit glass */}
        <mesh position={[0, 0, -1.8]} rotation={[0.3, 0, 0]}>
          <sphereGeometry args={[0.18, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#1e3a5f" metalness={0.3} roughness={0.1} opacity={0.85} transparent />
        </mesh>

        {/* Main wings */}
        <mesh position={[0, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <extrudeGeometry args={[wingShape, { depth: 0.04, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.01 }]} />
          <meshStandardMaterial color="#b0b5bc" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Vertical tail fin */}
        <mesh position={[0, 0, 1.8]} rotation={[0, Math.PI / 2, 0]}>
          <extrudeGeometry args={[tailFinShape, { depth: 0.02, bevelEnabled: false }]} />
          <meshStandardMaterial color="#dc2626" metalness={0.85} roughness={0.12} />
        </mesh>

        {/* Horizontal tail stabilizers */}
        <mesh position={[0, 0, 2]}>
          <boxGeometry args={[1.4, 0.025, 0.4]} />
          <meshStandardMaterial color="#a1a7b0" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Engine nacelles */}
        {[-0.55, 0.55].map((x, i) => (
          <group key={i} position={[x, -0.08, 0.6]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.1, 0.12, 0.8, 16]} />
              <meshStandardMaterial color="#8a8f96" metalness={0.95} roughness={0.05} />
            </mesh>
            {/* Engine intake ring */}
            <mesh position={[0, 0, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.1, 0.015, 8, 24]} />
              <meshStandardMaterial color="#555" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Engine exhaust glow */}
            <pointLight position={[0, 0, 0.5]} color="#ff6b35" intensity={1} distance={1.5} />
            <mesh position={[0, 0, 0.4]}>
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshStandardMaterial color="#ff4500" emissive="#ff4500" emissiveIntensity={2} transparent opacity={0.7} />
            </mesh>
          </group>
        ))}

        {/* Red stripe along fuselage */}
        <mesh position={[0, 0.26, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.01, 0.03, 3.5]} />
          <meshStandardMaterial color="#dc2626" metalness={0.7} roughness={0.2} />
        </mesh>

        {/* Navigation lights */}
        <mesh position={[2.15, 0, 0.5]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={4} />
        </mesh>
        <mesh position={[-2.15, 0, 0.5]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={4} />
        </mesh>
      </group>
    </Float>
  );
}

function Clouds() {
  const cloudsRef = useRef<THREE.Group>(null);
  
  const cloudPositions = useMemo(() => 
    Array.from({ length: 8 }, () => ({
      x: (Math.random() - 0.5) * 16,
      y: (Math.random() - 0.5) * 6,
      z: -3 - Math.random() * 5,
      scale: 0.5 + Math.random() * 1.5,
    })), []
  );

  useFrame((state) => {
    if (cloudsRef.current) {
      cloudsRef.current.children.forEach((cloud, i) => {
        cloud.position.x += 0.003;
        if (cloud.position.x > 10) cloud.position.x = -10;
      });
    }
  });

  return (
    <group ref={cloudsRef}>
      {cloudPositions.map((pos, i) => (
        <mesh key={i} position={[pos.x, pos.y, pos.z]} scale={pos.scale}>
          <sphereGeometry args={[0.6, 8, 8]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.15} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" castShadow />
          <directionalLight position={[-3, 2, 3]} intensity={0.3} color="#87ceeb" />
          <hemisphereLight color="#87ceeb" groundColor="#1a1a2e" intensity={0.4} />

          <JetAircraft />
          <Clouds />
        </Suspense>
      </Canvas>
    </div>
  );
}
