import { Canvas } from '@react-three/fiber'
import MainScene from './MainScene'
import { Loader } from '@react-three/drei'

export default function App() {
  return (
    <div className='App'>
      <Canvas camera={{ position: [0, 3, 8] }}>
        <MainScene />
      </Canvas>
      <Loader />
    </div>
  )
}