import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import './css/App.css'
import { Provider } from 'react-redux'
import { setupStore } from './store/index.ts'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={setupStore()}>
      <App />
    </Provider>
)
