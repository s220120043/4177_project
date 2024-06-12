import React, {useState} from "react";
import { NavLink, Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navigation() {
    const handleSelect = (eventKey) => alert(`selected ${eventKey}`);
    return (
        <div className="navigation">
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">
                        Cyber Library
                    </NavLink>
                    <div>
                        <ul className="navbar-nav ml-auto">
                            <Nav onSelect={handleSelect}>
                                <Nav.Item>
                                    <NavLink className="nav-link" to="/">
                                        Home
                                    </NavLink>
                                </Nav.Item>
                                <NavDropdown title="Account" id="navigation-dropdown" menuVariant="dark">
                                    <NavDropdown.Item to="/profile" as={Link}>Profile</NavDropdown.Item>
                                    <NavDropdown.Item to="/history" as={Link}>History</NavDropdown.Item>
                                </NavDropdown>
                                <NavLink className="nav-link" to="/login">
                                    Login
                                </NavLink>
                            </Nav>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navigation;
