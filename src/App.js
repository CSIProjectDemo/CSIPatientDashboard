import React from "react";
import {useState} from "react"
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserList from "./pages/userList";
import Closest from "./pages/Closest";
import {AuthContext} from "./context/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/dashboard.css";
import videoView from "./pages/videoView";

//

function App(props) {
    // const existingTokens = JSON.parse(localStorage.getItem("tokens"));
    const [authTokens, setAuthTokens] = useState(localStorage.getItem('tokens') || '');

    const setTokens = (data) => {
        localStorage.setItem("tokens", data.token);
        setAuthTokens(data);
    }
    console.log(localStorage.getItem("tokens"))

    return (
        <AuthContext.Provider value={{authTokens, setAuthTokens: setTokens}}>
            <Router>
                <head>
                    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
                          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
                          crossOrigin=""/>
                    <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
                            integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
                            crossOrigin=""></script>

                </head>
                <div>

                </div>
                <div className="wrapper">
                    <nav id="sidebar">
                        <div className="sidebar-header">
                            <h3>Citizen Science</h3>
                        </div>

                        <ul className="list-unstyled components">
                            <p>Wellness</p>
                            <li>
                                <a href="interventions">Interventions</a>
                                <a href="admin">Track Your Progress</a>
                            </li>
                        </ul>
                        <ul className="list-unstyled components">
                            <p>Resources</p>
                            <li>
                                <a href="admin">Oximeter</a>
                                <a href="admin">Clinical Trials</a>
                            </li>
                        </ul>
                        <ul className="list-unstyled components">
                            <p>Stay Informed</p>
                            <li>
                                <a href="admin">News</a>
                                <a href="admin">Studies</a>
                            </li>
                        </ul>
                        <ul className="list-unstyled components">
                            <p>Mental Health</p>
                            <li>
                                <a href="admin">Fun Zone</a>
                            </li>
                        </ul>
                    </nav>

                    <div id="content">
                        <nav className="navbar navbar-expand-lg navbar-light bg-black">
                            <div className="container-fluid">
                                <a className="navbar-brand" href="#">Dashboard</a>
                            </div>
                        </nav>
                        <div id="maincontent">
                            <Route exact path="/" component={Home}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/signup" component={Signup}/>
                            <PrivateRoute path="/admin" component={Admin}/>
                            <PrivateRoute path="/userList" component={UserList}/>
                            <PrivateRoute path="/closest" component={Closest}/>
                            <PrivateRoute path="/interventions" component={videoView}/>
                        </div>
                    </div>
                </div>
            </Router>
        </AuthContext.Provider>
    )
        ;
}

export default App;