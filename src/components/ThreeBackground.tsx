import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
    const meshRef = useRef<THREE.Points>(null);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const count = 600;

    const [positions, sizes] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const sz = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 30;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
            sz[i] = Math.random() * 2 + 0.5;
        }
        return [pos, sz];
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.elapsedTime;
        const scrollFactor = scrollY * 0.001;

        const posArr = meshRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < count; i++) {
            const idx = i * 3;
            posArr[idx + 1] += Math.sin(time * 0.3 + i * 0.1) * 0.003 + scrollFactor * 0.02;

            // Wrap particles that go too high
            if (posArr[idx + 1] > 15) {
                posArr[idx + 1] = -15;
            }
        }
        meshRef.current.geometry.attributes.position.needsUpdate = true;
        meshRef.current.rotation.y = time * 0.02;
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={count}
                    array={sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.06}
                color="#4a90d9"
                transparent
                opacity={0.6}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

function FloatingOrbs() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.elapsedTime;
        groupRef.current.rotation.y = time * 0.05;
        groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    });

    return (
        <group ref={groupRef}>
            {/* Big soft blue orbs */}
            <mesh position={[-4, 2, -5]}>
                <sphereGeometry args={[1.5, 16, 16]} />
                <meshBasicMaterial color="#1a3a6b" transparent opacity={0.08} />
            </mesh>
            <mesh position={[5, -3, -8]}>
                <sphereGeometry args={[2, 16, 16]} />
                <meshBasicMaterial color="#2563eb" transparent opacity={0.05} />
            </mesh>
            <mesh position={[0, 4, -6]}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshBasicMaterial color="#06b6d4" transparent opacity={0.07} />
            </mesh>
        </group>
    );
}

export default function ThreeBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                dpr={[1, 1.5]}
                gl={{ antialias: false, alpha: true }}
                style={{ background: "transparent" }}
            >
                <Particles />
                <FloatingOrbs />
                <ambientLight intensity={0.3} />
            </Canvas>
        </div>
    );
}
