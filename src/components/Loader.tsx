import { useAnimations, useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber"
import { RefObject, useEffect, useRef } from "react";
import { Group } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

const Loader = (props: any) => {
    // [loader]
    const { materials, nodes, animations } = useLoader(GLTFLoader, '/models/loader/scene.gltf')

    // [refs]
    const loaderRef: RefObject<Group> = useRef(null);

    // [animations]
    const { actions } = useAnimations(animations, loaderRef);

    useEffect(() => {
        actions["Armature|mixamo.com|Layer0"]?.play();
    })

    return (
        <group>
            <group ref={loaderRef} {...props} dispose={null}>
                <group rotation={[Math.PI / 2, 0, 0]} scale={.015}>
                    <primitive object={nodes.mixamorigHips} />
                    <skinnedMesh scale={100} geometry={nodes.Alpha_Joints.geometry} material={materials.Alpha_Joints_MAT} skeleton={nodes.Alpha_Joints.skeleton} />
                    <skinnedMesh scale={100} geometry={nodes.Alpha_Surface.geometry} material={materials.Alpha_Body_MAT} skeleton={nodes.Alpha_Surface.skeleton} />
                </group>
            </group>
        </group>
    )
}

export default Loader

useGLTF.preload('/models/loader/scene.gltf')