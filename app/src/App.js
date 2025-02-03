import './App.css';
import "@astrouxds/astro-web-components";
import DashboardComponent from './components/DashboardComponent/DashboardComponent';

function App() {
  return (
    <div className="App">
      <DashboardComponent />
    </div>
  );
}

export default App;
