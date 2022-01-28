import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import Header from './components/Header'; 
import Dashboard from './components/Dashboard';

function App() {
  return (
    <>
      <Header/>
      <Dashboard/>
    </>
  );
}

export default App;
