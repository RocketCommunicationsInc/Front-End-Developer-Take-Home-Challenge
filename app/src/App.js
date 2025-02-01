import logo from './logo.svg';
import './App.css';

import { AstroProvider } from '@pingux/astro';

import DashboardComponent from './components/DashboardComponent/DashboardComponent';

function App() {
  return (
    <div className="App">
      <AstroProvider>
        <DashboardComponent />
      </AstroProvider>
    </div>
  );
}

export default App;
