import { MeshTransmissionMaterial, useGLTF, Text, Html, Text3D } from "@react-three/drei"
import { useFrame, useLoader } from "@react-three/fiber"
import { RefObject, useEffect, useRef, useState } from "react"
import { Group } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { useComputerDispatch, useComputerSelector } from "../hooks/computerHooks"
import { changeMode } from "../store/reducers/KeyboardSlice"

const Monitor = () => {
    // [loader]
    const { materials, nodes } = useLoader(GLTFLoader, '/models/monitor/scene.gltf')

    // [store]
    const dispatch = useComputerDispatch();
    const { Key, Keys } = useComputerSelector(state => state.KeyboardSlice);

    // [refs]
    const monitorRef: RefObject<Group> = useRef(null);
    const textPositionZRef = useRef(33);

    // [text && cursor]
    const [text, setText] = useState<string>("");
    const [cursorFull, setCursorFull] = useState<boolean>(true);
    const [cursorPartial, setCursorPartial] = useState<boolean>(false);
    const [textOpacity, setTextOpacity] = useState<number>(1);

    // [modes]
    const [modesCurrent, setModesCurrent] = useState<string>('');
    const [hackerMode, setHackerMode] = useState<string>('');

    // [keylogger]
    useEffect(() => {
        setModesCurrent(Key);
    }, [Key])

    // [stages]
    useEffect(() => {
        dispatch(changeMode(false));
        let text = ' ';
        const initialStep = () => {
            setTimeout(() => {
                setTextOpacity(1);
            }, 100);
            textPositionZRef.current = 33;
        }
        initialStep();
        switch (modesCurrent) {
            case 'Q':
                text = 'Writing mode - return [E]\n:';
                break;
            case 'W':
                text = 'Hacker mode - return [E]\n:';
                break;
            case 'E':
                text = 'Creator`s social media - return [E]';
                break;
            default:
                text = 'Choose your mode:\nWriting mode: Q.\nHacker mode: W.\nCreator`s portfolio: E\nReturn to this page: any other key.';
                break;
        }
        const fullText = text;
        let currentIndex = 0;

        const interval = setInterval(() => {
            setText(() => {
                const newText = fullText.substring(0, currentIndex + 1);
                currentIndex++;

                if (newText.endsWith('\n')) {
                    textPositionZRef.current -= .85;
                }

                return newText;
            });

            if (currentIndex === fullText.length) {
                dispatch(changeMode(true));
                setCursorPartial(false);
                const interval = setInterval(() => {
                    setCursorFull((prevCursorVisible) => !prevCursorVisible);
                }, 500);
                return () => {
                    clearInterval(interval);
                };
            }
        }, 25);

        return () => {
            clearInterval(interval);
        };
    }, [modesCurrent]);

    // [opacity]
    useEffect(() => {
        setTextOpacity(0);
    }, [modesCurrent]);

    // [hacker mode]
    function generateRandomSymbols(length: number) {
        const symbols = "01";
        let randomSymbols = "";

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * symbols.length);
            randomSymbols += symbols.charAt(randomIndex);
        }

        return randomSymbols;
    }

    useFrame(() => {
        if (modesCurrent === 'W') {
            const changingChars = generateRandomSymbols(550);
            setHackerMode(changingChars);
        }
    });

    // [social media mode]
    const GitHubRef = useRef<HTMLAnchorElement>(null);
    const LinkedInRef = useRef<HTMLAnchorElement>(null);
    const YouTubeRef = useRef<HTMLAnchorElement>(null);

    return (
        <group ref={monitorRef} scale={.2} position={[0, -1.8, -5]} rotation={[-1.6, 0, 0]}>
            <mesh geometry={nodes.Object_2.geometry} material={materials.wire_224198087} />
            <mesh geometry={nodes.Object_3.geometry} material={materials.wire_224198087}>
                <MeshTransmissionMaterial color="black" resolution={128} thickness={0.5} anisotropy={2} temporalDistortion={0.1} distortion={10} distortionScale={0} />
            </mesh>
            <Text
                color={"green"}
                fontSize={1.5}
                anchorX="right"
                position=
                {[modesCurrent === 'W' && text.length === 26 ? 22.5 : 22,
                modesCurrent === 'W' && text.length === 26 ? -7 : -6,
                modesCurrent === 'W' && text.length === 26 ? 23.6 : textPositionZRef.current]}
                rotation={[1.6, 0, 0]}
                material-toneMapped={false}
                material-opacity={textOpacity}
                maxWidth={44.4}
                lineHeight={1.2}
                letterSpacing={0.02}
                textAlign="left"
                overflowWrap="break-word"
            >
                <Html style={{ display: 'none' }}>
                    <a ref={GitHubRef} href="https://github.com/FL0REN1" target="_blank">GitHub</a>
                    <a ref={LinkedInRef} href="https://www.linkedin.com/in/william-orlov-21098b278/" target="_blank">LinkedIn</a>
                    <a ref={YouTubeRef} href="https://www.youtube.com/channel/UCbGbEAg-W4ICe7Y3K47bxQA" target="_blank">YouTube</a>
                </Html>
                {modesCurrent === 'E' &&
                    <group position={[-42, -10, 0]}>
                        <Text3D
                            position={[0, 0, 0]}
                            curveSegments={32}
                            bevelEnabled
                            bevelSize={0.04}
                            bevelThickness={0.1}
                            height={0.5}
                            lineHeight={0.5}
                            letterSpacing={-0.06}
                            size={1.5}
                            font="/Inter_Bold.json"
                            onClick={() => GitHubRef.current?.click()}
                            onPointerOver={() => document.body.style.cursor = 'pointer'}
                            onPointerOut={() => document.body.style.cursor = 'auto'}>
                            {`GitHub`}
                            <meshStandardMaterial color={'green'} />
                        </Text3D>
                        <Text3D
                            position={[15, 0, 0]}
                            curveSegments={32}
                            bevelEnabled
                            bevelSize={0.04}
                            bevelThickness={0.1}
                            height={0.5}
                            lineHeight={0.5}
                            letterSpacing={-0.06}
                            size={1.5}
                            font="/Inter_Bold.json"
                            onClick={() => LinkedInRef.current?.click()}
                            onPointerOver={() => document.body.style.cursor = 'pointer'}
                            onPointerOut={() => document.body.style.cursor = 'auto'}>
                            {`LinkedIn`}
                            <meshStandardMaterial color={'green'} />
                        </Text3D>
                        <Text3D
                            position={[30, 0, 0]}
                            curveSegments={32}
                            bevelEnabled
                            bevelSize={0.04}
                            bevelThickness={0.1}
                            height={0.5}
                            lineHeight={0.5}
                            letterSpacing={-0.06}
                            size={1.5}
                            font="/Inter_Bold.json"
                            onClick={() => YouTubeRef.current?.click()}
                            onPointerOver={() => document.body.style.cursor = 'pointer'}
                            onPointerOut={() => document.body.style.cursor = 'auto'}>
                            {`YouTube`}
                            <meshStandardMaterial color={'green'} />
                        </Text3D>
                    </group>
                }

                {/* header */}
                {`|------------------------------------------FL0REN-------------------------------------------|\n`}
                \------------------------------------------------------------------------------------------------/{'\n'}

                {/* console text */}
                {text}

                {/* writing mode text */}
                {Keys.length > 0 && modesCurrent === 'Q' && Keys}

                {hackerMode.length > 0 && modesCurrent === 'W' && text.length === 26 && hackerMode}

                {/* cursor */}
                {cursorFull && '|'} {cursorPartial && '|'}
            </Text >
        </group >
    )
}

export default Monitor

useGLTF.preload('/models/monitor/scene.gltf')