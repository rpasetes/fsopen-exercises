import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// (1245) non-null assertion (!) with ts, 
// index.html always includes root div; 
ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)
