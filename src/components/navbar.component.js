import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Google Authenticator Demo</Link>
                <div className="navbar-collapse">
                <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                <Link to="/" className="nav-link">Verify</Link>
                </li>
                <li className="navbar-item">
                <Link to="/generate" className="nav-link">Generate</Link>
                </li>
                </ul>
                </div>
            </nav>
        );
    }
}