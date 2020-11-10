import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import axios from 'axios';
import {Card, Logo, Form, Input, Button, Error} from "../components/AuthForm";
import {useAuth} from "../context/auth";

export default class UserList extends React.Component {
    state = {
        users: [],
    }

    componentDidMount() {
        const options = {
            headers: {'Authorization': 'Token ' + localStorage.getItem("tokens")}
        };
        return axios.get('https://csidatabase.herokuapp.com/api/Modality/', options).then(response => {

            const users = response.data.results;
            this.setState({users})
            console.log(this.state.users);
        })
    }

    render() {
        return (
            <ul>
                hi
            </ul>
        )
    }
}
