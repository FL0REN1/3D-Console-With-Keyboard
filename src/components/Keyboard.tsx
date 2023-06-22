import { Box, MeshTransmissionMaterial, useGLTF } from "@react-three/drei"
import { Vector3, useLoader } from "@react-three/fiber"
import { RefObject, useEffect, useRef, useState } from "react"
import { Group } from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from "gsap";
import spaceAudio from '/audio/space.mp3';
import keyDownAudio from '/audio/keyDown.mp3';
import { useComputerDispatch, useComputerSelector } from "../hooks/computerHooks"
import { addKey, addKeys, clearKeys } from "../store/reducers/KeyboardSlice"
import Loader from "./Loader"

const Keyboard = () => {
    // [loader]
    const { materials, nodes } = useLoader(GLTFLoader, '/models/numpad/scene.gltf')

    // [store]
    const dispatch = useComputerDispatch();
    const { ModesChoose, Key, Keys } = useComputerSelector(state => state.KeyboardSlice);

    // [refs]
    const keyboardRef: RefObject<Group> = useRef(null);
    const keyboardAnimationRef: RefObject<Group> = useRef(null);
    const loaderRef: RefObject<Group> = useRef(null);
    const enterRef: RefObject<Group> = useRef(null);
    const qRef: RefObject<Group> = useRef(null);
    const wRef: RefObject<Group> = useRef(null);
    const eRef: RefObject<Group> = useRef(null);
    const aRef: RefObject<Group> = useRef(null);
    const sRef: RefObject<Group> = useRef(null);
    const dRef: RefObject<Group> = useRef(null);

    // [clicks]
    const [enterClick, setEnterClick] = useState<boolean>(false);
    const [qClick, setQClick] = useState<boolean>(false);
    const [wClick, setWClick] = useState<boolean>(false);
    const [eClick, setEClick] = useState<boolean>(false);
    const [aClick, setAClick] = useState<boolean>(false);
    const [sClick, setSClick] = useState<boolean>(false);
    const [dClick, setDClick] = useState<boolean>(false);

    // [clicks sound]
    const spaceSound = new Audio(spaceAudio);
    const keyDownSound = new Audio(keyDownAudio);

    // [clicks trace]
    useEffect(() => {
        const animations = [
            {
                ref: enterRef,
                click: enterClick,
            },
            {
                ref: qRef,
                click: qClick,
            },
            {
                ref: wRef,
                click: wClick,
            },
            {
                ref: eRef,
                click: eClick,
            },
            {
                ref: aRef,
                click: aClick,
            },
            {
                ref: sRef,
                click: sClick,
            },
            {
                ref: dRef,
                click: dClick,
            },
        ];

        // animations massive
        const tlAnimations: gsap.core.Timeline[] = [];

        animations.forEach((animation) => {
            const tl = gsap.timeline({ paused: true });

            if (animation.ref.current) {
                tl.to(animation.ref.current.position, {
                    y: animation.click ? -0.2 : 0,
                    duration: 0.1,
                });
            }

            tlAnimations.push(tl);
        });

        tlAnimations.forEach((tl) => {
            // animation start
            tl.play();
        });

        return () => {
            tlAnimations.forEach((tl) => {
                // animation stop
                tl.kill();
            });
        };
    }, [enterClick, qClick, wClick, eClick, aClick, sClick, dClick]);

    const falseClicks = () => {
        setEnterClick(false);
        setQClick(false);
        setWClick(false);
        setEClick(false);
        setAClick(false);
        setSClick(false);
        setDClick(false);
    }

    const pointerClick = (key: string, soundPad: boolean) => {
        switch (Key) {
            case 'Q':
                // stage [1] - Writing mode
                switch (key) {
                    case 'Q':
                        setQClick(true);
                        break;
                    case 'W':
                        setWClick(true);
                        break;
                    case 'E':
                        setEClick(true);
                        dispatch(addKey('A'));
                        break;
                    case 'A':
                        setAClick(true);
                        break;
                    case 'S':
                        setSClick(true);
                        break;
                    case 'D':
                        setDClick(true);
                        break;
                    default:
                        setEnterClick(true);
                        break;
                }
                if (soundPad) keyDownSound.play();
                else spaceSound.play();
                dispatch(addKeys(key));
                if (Keys.length > 30) {
                    dispatch(clearKeys())
                }
                break;
            case 'W':
                // stage [2] - hacker mode
                switch (key) {
                    case 'Q':
                        setQClick(true);
                        break;
                    case 'W':
                        setWClick(true);
                        break;
                    case 'E':
                        setEClick(true);
                        dispatch(addKey('A'));
                        break;
                    case 'A':
                        setAClick(true);
                        break;
                    case 'S':
                        setSClick(true);
                        break;
                    case 'D':
                        setDClick(true);
                        break;
                    default:
                        setEnterClick(true);
                        break;
                }
                if (soundPad) keyDownSound.play();
                else spaceSound.play();
                break;
            case 'E':
                // stage [3] - social media mode
                switch (key) {
                    case 'Q':
                        setQClick(true);
                        break;
                    case 'W':
                        setWClick(true);
                        break;
                    case 'E':
                        setEClick(true);
                        dispatch(addKey('A'));
                        break;
                    case 'A':
                        setAClick(true);
                        break;
                    case 'S':
                        setSClick(true);
                        break;
                    case 'D':
                        setDClick(true);
                        break;
                    default:
                        setEnterClick(true);
                        break;
                }
                if (soundPad) keyDownSound.play();
                else spaceSound.play();
                break;
            default:
                // stage[0] - Greetings
                switch (key) {
                    case 'Q':
                        setQClick(true);
                        dispatch(clearKeys())
                        break;
                    case 'W':
                        setWClick(true);
                        break;
                    case 'E':
                        setEClick(true);
                        break;
                    case 'A':
                        setAClick(true);
                        break;
                    case 'S':
                        setSClick(true);
                        break;
                    case 'D':
                        setDClick(true);
                        break;
                    default:
                        setEnterClick(true);
                        break;
                }
                if (soundPad) keyDownSound.play();
                else spaceSound.play();
                dispatch(addKey(key));
                break;
        }
    }

    // [animations]
    useEffect(() => {
        const tl = gsap.timeline({ paused: true });

        if (ModesChoose) {
            if (loaderRef.current) {
                tl.to(loaderRef.current.position, {
                    x: 15,
                    duration: 0.25,
                }).play();
            }

            if (keyboardAnimationRef.current) {
                tl.to(keyboardAnimationRef.current.position, {
                    y: 0,
                    x: 0,
                    duration: 0.25,
                }).play();
            }
        } else {
            if (loaderRef.current) {
                tl.to(loaderRef.current.position, {
                    x: 0,
                    duration: 0.25,
                }).play();
            }

            if (keyboardAnimationRef.current) {
                tl.to(keyboardAnimationRef.current.position, {
                    x: 25,
                    duration: 0.25,
                }).play();
            }
        }

        return () => {
            tl.kill();
        };
    }, [ModesChoose]);

    // [change position]
    useEffect(() => {
        if (keyboardRef.current) {
            keyboardRef.current.position.set(0, .13, 0);
            keyboardRef.current.rotation.set(1, 0, 0);
        }
        if (loaderRef.current) {
            loaderRef.current.position.set(0, 1, 1.2);
            loaderRef.current.rotation.set(-1.67, 0, 0);
        }
        if (keyboardAnimationRef.current) {
            keyboardAnimationRef.current.position.set(25, -3, 0)
        }
    }, [])
    return (
        <group ref={keyboardRef}>
            //#region [CASE]
            <group
                scale={1.03}
                onPointerOver={() => (document.body.style.cursor = "auto")}
                onPointerOut={() => (document.body.style.cursor = "auto")}
                onPointerDown={(event) => event.stopPropagation()}>
                <mesh geometry={nodes["Object_4"].geometry} material={materials['.002']} position={[0, 0, 0]}>
                    <meshStandardMaterial color="gray" />
                </mesh>
                {/* case [outline] */}
                <mesh geometry={nodes['Object_5'].geometry} material={materials['.001']} position={[0, 0, 0]}>
                    <MeshTransmissionMaterial color="black" resolution={128} thickness={0.5} anisotropy={2} temporalDistortion={0.1} distortion={10} distortionScale={0} />
                </mesh>
            </group>
            //#endregion

            <group ref={keyboardAnimationRef}>
                {[
                    { ref: enterRef, letter: ' ', position: [0, 0.24, 0.9], keyMaterial: materials['.005'] },
                    { ref: qRef, letter: 'Q', position: [-0.92, 0.24, -0.98], letterGeometry: nodes['Object_28'].geometry, keyMaterial: materials['.005'] },
                    { ref: wRef, letter: 'W', position: [0, 0.24, -0.98], letterGeometry: nodes['Object_60'].geometry, keyMaterial: materials['.004'] },
                    { ref: eRef, letter: 'E', position: [0.92, 0.24, -0.98], letterGeometry: nodes['Object_30'].geometry, keyMaterial: materials['.005'] },
                    { ref: aRef, letter: 'A', position: [-0.92, 0.24, 0], letterGeometry: nodes['Object_36'].geometry, keyMaterial: materials['.004'] },
                    { ref: sRef, letter: 'S', position: [0, 0.24, 0], letterGeometry: nodes['Object_34'].geometry, keyMaterial: materials['.004'] },
                    { ref: dRef, letter: 'D', position: [0.92, 0.24, 0], letterGeometry: nodes['Object_32'].geometry, keyMaterial: materials['.004'] },
                ].map(({ ref, letter, position, letterGeometry, keyMaterial }) => (
                    <group
                        key={letter}
                        ref={ref}
                        onPointerOver={() => (document.body.style.cursor = 'pointer')}
                        onPointerOut={() => (document.body.style.cursor = 'auto')}
                        onPointerDown={async (event) => {
                            pointerClick(letter, ref === enterRef ? false : true);
                            await event.stopPropagation();
                        }}
                        onPointerUp={() => falseClicks()}
                        onPointerLeave={() => falseClicks()}
                    >
                        {/* outline */}
                        <mesh geometry={ref === enterRef ? nodes['Object_8'].geometry : nodes['Object_39'].geometry} material={materials['.001']} position={position as Vector3} />
                        {/* key */}
                        <mesh key={letter} geometry={ref === enterRef ? nodes['Object_7'].geometry : nodes['Object_38'].geometry} material={keyMaterial} position={position as Vector3} />
                        {/* letter */}
                        {ref === enterRef ?
                            <Box args={[.1, 0, 1]} position={[0, .43, 1.05]} rotation={[0, 1.58, 0]} />
                            :
                            <mesh geometry={letterGeometry} material={materials['.003']} position={[position[0], position[1] + 0.14, position[2]]} scale={0.6} />
                        }
                    </group>
                ))}
            </group>

            <group ref={loaderRef}>
                <Loader />
            </group>
        </group >
    )
}

export default Keyboard

useGLTF.preload('/models/numpad/scene.gltf')