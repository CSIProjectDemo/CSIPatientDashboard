import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import axios from 'axios';
import {Form, Button, Card} from "react-bootstrap"
import {useAuth} from "../context/auth";

export default class Closest extends React.Component {
    state = {
        trials: [],
    }

    componentDidMount() {
        const options = {
            // headers: {'Authorization': 'Token ' + localStorage.getItem("tokens")}
        };
        return axios.get('https://csidatabase.herokuapp.com/api/closest/1/', options).then(response => {

            var trials = response.data['FullStudiesResponse']['FullStudies'];

            this.setState({trials});
            console.log(this.state.trials);
        })
    }

    render() {
        return (
             <Card>
                <Card.Body>
                    <h3>Clinical Trials In Your Area</h3>
                    {this.state.trials.map((study, i) => {
                        return (
							<div key={i}>
								<div>
                                    <p>{study['Study']['ProtocolSection']['ContactsLocationsModule']['LocationList']['Location'][0]['LocationFacility']}</p>
									<p>{study['Study']['ProtocolSection']['DescriptionModule']['BriefSummary']}</p>
                                </div>

                            </div>)
                    })
                    }



                </Card.Body>
             </Card>

    )
    }
}
