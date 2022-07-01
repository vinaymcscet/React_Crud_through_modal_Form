import Wrapper from "../Helpers/Wrapper";
import { Link } from 'react-router-dom';

import './Sidebar.css';

const Sidebar = () => {
    return (
        <Wrapper>
            <div className="sidebar">
                <div className="logo">
                    <img src="https://upload.wikimedia.org/wikipedia/sco/thumb/b/bf/KFC_logo.svg/1200px-KFC_logo.svg.png" alt="Logo" />
                </div>
                <ul className="menu">
                <li><Link to="/user">Users</Link></li>
                <li><Link to="/epics">Epics</Link></li>
                </ul>
            </div>
        </Wrapper>
    );
}

export default Sidebar;