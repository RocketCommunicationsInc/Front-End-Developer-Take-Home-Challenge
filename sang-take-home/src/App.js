import Header from './components/Header';
import Alerts from './components/Alerts';
import Contacts from './components/Contacts';
import Modal from './components/Modal';

function App() {
  return (
    <div className="dashboard">
      <Modal />
      <Header />
      <section className="alert-and-contact-container">
        <Alerts />
        <Contacts />
      </section>
    </div>
  );
}

export default App;

