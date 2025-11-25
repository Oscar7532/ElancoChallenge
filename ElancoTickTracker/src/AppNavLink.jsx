import { NavLink } from "react-router";
import "./styles/appNavLink.css"

function AppNavLink() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/" end>
                        Map
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/info">Information</NavLink>
                </li>
                <li><NavLink to="/report">Report</NavLink></li>
            </ul>
        </nav>
    );
}

export default AppNavLink;