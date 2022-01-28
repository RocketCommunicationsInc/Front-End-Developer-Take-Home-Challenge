import { Navbar} from 'react-bootstrap';
import logo from '../images/logo.png';

const Header = () => {
    return (
        <Navbar bg="#274059" variant="dark">
            <Navbar.Brand>
                <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                />{' '}
                Contacts Dashboard
            </Navbar.Brand>
        </Navbar>
    )
}

export default Header; 

