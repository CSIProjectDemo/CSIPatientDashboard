

    import React from "react";
    import {Nav} from "react-bootstrap";
    import { withRouter } from "react-router";
    import '../assets/css/dashboard.css'

    const Side = props => {


        return (
                <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
                activeKey="/"
                onSelect={selectedKey => alert(`selected ${selectedKey}`)}
                >
                    <div className="sidebar-sticky"></div>
                <Nav.Item>
                    <Nav.Link href="/home">Active</Nav.Link>
                </Nav.Item>
                </Nav>
            );
      };
      export default Side

