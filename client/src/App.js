import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';

import Navbar from './components/Navbar';
import Alerts from './components/Alerts';

const App = () => {
  return (
    <div className=''>
      <Navbar />
      <Alerts />
    </div>
  );
};

export default App;
