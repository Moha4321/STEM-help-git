import React, { useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';

interface PlanetProps {
  position: [number, number, number];
  color: string;
  name: string;
  onSelect: () => void;
}

function Planet({ position, color, name, onSelect }: PlanetProps) {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onSelect}
        scale={hovered ? 1.1 : 1}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
}

function Scene({ level, onComplete }: { level: number; onComplete: () => void }) {
  const handlePlanetSelect = (planetName: string) => {
    console.log(`Selected planet: ${planetName}`);
    // Here we would trigger the challenge for the selected planet
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      
      {/* Solar System */}
      <Planet
        position={[-4, 0, 0]}
        color="#FF4444"
        name="Algebra I"
        onSelect={() => handlePlanetSelect("Algebra I")}
      />
      <Planet
        position={[0, 0, -4]}
        color="#44FF44"
        name="Geometry"
        onSelect={() => handlePlanetSelect("Geometry")}
      />
      <Planet
        position={[4, 0, 0]}
        color="#4444FF"
        name="Algebra II"
        onSelect={() => handlePlanetSelect("Algebra II")}
      />
      <Planet
        position={[0, 0, 4]}
        color="#FFFF44"
        name="Calculus"
        onSelect={() => handlePlanetSelect("Calculus")}
      />

      {/* Center Sun */}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="#FDB813" emissive="#FDB813" emissiveIntensity={0.5} />
      </mesh>

      <OrbitControls enablePan={false} maxDistance={20} minDistance={10} />
    </>
  );
}

interface GameEngineProps {
  level: number;
  onComplete: () => void;
}

const GameEngine: React.FC<GameEngineProps> = ({ level, onComplete }) => {
  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden">
      <Canvas camera={{ position: [15, 10, 15] }}>
        <Scene level={level} onComplete={onComplete} />
      </Canvas>
    </div>
  );
};

export default GameEngine; 