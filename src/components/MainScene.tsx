import { Environment, Grid, OrbitControls } from "@react-three/drei"
import { Bloom, EffectComposer } from "@react-three/postprocessing"
import Keyboard from "./Keyboard"
import Monitor from "./Monitor"

const MainScene = () => {
    return (
        <>
            <fog attach="fog" args={['black', 15, 21.5]} />
            <Grid
                renderOrder={-1}
                position={[0, -1.85, 0]}
                infiniteGrid
                cellSize={0.6}
                cellThickness={0.6}
                sectionSize={3.3}
                sectionThickness={1.5}
                sectionColor={[0.5, 0.5, 10] as any}
                fadeDistance={1000} />
            <Keyboard />
            <Monitor />
            {/* minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2} minAzimuthAngle={Math.PI / 100} maxAzimuthAngle={Math.PI / 100} : Limitations */}
            <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2} minAzimuthAngle={Math.PI / 100} maxAzimuthAngle={Math.PI / 100} />
            <EffectComposer disableNormalPass>
                <Bloom luminanceThreshold={1} mipmapBlur />
            </EffectComposer>
            <Environment background preset="sunset" blur={0.8} />
        </>
    )
}

export default MainScene