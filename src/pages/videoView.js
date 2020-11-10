
import Interventions from "../components/interventions";
import React from "react";
import {Link, Redirect} from "react-router-dom";
import axios from 'axios';
import {useAuth} from "../context/auth";
import SearchBar from "../components/SearchBar";

export default class VideoView extends React.Component {
    render() {
        return (
            <div>
                <Interventions/>
            </div>
    )

    }
    }