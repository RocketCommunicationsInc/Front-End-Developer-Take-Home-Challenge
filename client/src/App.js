
import './App.css';
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css'
import { RuxButton } from '@astrouxds/react'
function App() {
  return (
    <div className="App">
    <h1>hello
    </h1>
    <div>
            <RuxButton size="small">Rux Button</RuxButton>
        </div>
    </div>
  );
}

export default App;
