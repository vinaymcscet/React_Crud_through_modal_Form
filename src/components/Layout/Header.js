import { useState } from "react";
import Wrapper from "../Helpers/Wrapper";
import './Header.css';

const Header = ({ sendToggleStateToParent }) => {
    let [toggleState, setToggleState] = useState(false);

    return (
        <Wrapper>
            <header>
                <div className="toggleMenu" onClick={() => sendToggleStateToParent(toggleState = !toggleState)}>☰</div>
            </header>
        </Wrapper>
    );
}

export default Header;