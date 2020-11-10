import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import axios from 'axios';
import {useAuth} from "../context/auth";
import "../assets/css/interventions.css";
import {Button, Card, Dropdown, Form, FormControl, Navbar} from 'react-bootstrap';
import SearchBar from "../components/SearchBar";

export default class Interventions extends React.Component {
    state = {
        videos: [],
        typeArticle: '',
        order: '',
        filterContent: "",
        filterType: "For You",
        history:localStorage.getItem("history"),

    }

    componentDidMount() {
        const options = {
            headers: {'Authorization': 'Token ' + localStorage.getItem("tokens")}
        };
        return axios.get("https://csidatabase.herokuapp.com/api/Modality/?typeArticle=" + this.state.filterContent + "&ordering=", options).then(response => {

            const videos = response.data.results;
            let i = 0;
            while(i!=videos.length){
                console.log(videos[i].articleImage);
                if(this.state.history.includes(videos[i].articleImage)){
                    console.log("bad");
                    console.log(videos[i].articleImage);
                    videos.splice(i, 1);
                    i--;
                }
                else {
                    console.log("fine");
                    console.log(videos[i].articleImage);
                }
                i++;

            }
            this.setState({videos})

            // console.log(this.state.videos);
        })
    }

    // componentDidUpdate() {
    //     const options = {
    //         headers: {'Authorization': 'Token ' + localStorage.getItem("tokens")}
    //     };
    //     return axios.get("https://csidatabase.herokuapp.com/api/Modality/?typeArticle=" + this.state.filterContent + "&ordering=", options).then(response => {
    //
    //         const videos = response.data.results;
    //         this.setState({videos})
    //         console.log(this.state.videos);
    //     })
    // }


    render() {
        // console.log(this.state.videos)
        var imageGroups = this.groupBy(3, this.state.videos);
        // console.log(imageGroups)
        return (
            <div>
                <Navbar expand="lg" className="filterBar">
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <nav className="mr-auto">
                            <Dropdown className="d-inline-block" >
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {this.state.filterContent}
                                </Dropdown.Toggle>

                                <Dropdown.Menu value={this.state.filterContent} onChange={e => this.setState({filterContent: "article"})}>
                                    <Dropdown.Item value="Video">Video</Dropdown.Item>
                                    <Dropdown.Item value="Article">Article</Dropdown.Item>
                                    <Dropdown.Item value="Course">Course</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown className="d-inline-block">
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {this.state.filterType}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">For You</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Top</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">New</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                            <Button variant="success" className="mr-sm-2">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                {imageGroups.map((group, index) => this.renderRow(group, index))}
            </div>
        )
            ;
    }

    renderRow(group, index) {
        return (<div className="row" key={index}>
            {group.map((video, index) => this.renderColumn(group, index))}
        </div>);
    }

    renderColumn(video, index) {
        return (
            <div className="col-sm-4" key={index}>
                <div>
                    <a href={video[index].articleLink} className="custom-card">
                        <Card className="custom-card">
                            <Card.Img variant="top" className="custom-img"
                                      src={video[index].articleImage}/>
                            <Card.Text className="custom-text-date">{video[index].publishDate}</Card.Text>
                            <Card.Title className="custom-text"> {video[index].title} </Card.Title>
                            <Card.Text><a href="#" className="badge badge-pill badge-secondary">Breathing</a><a href="#"
                                                                                                                className="badge badge-pill badge-secondary">Long-Covid</a></Card.Text>

                            {/*<Card.Text>*/}
                            {/*    {video[2].Description}*/}
                            {/*</Card.Text>*/}
                        </Card>
                    </a>
                </div>

            </div>);
    }

    groupBy(amountOfItemsPerGroup, itemss) {
        var groups = [],
            group,
            total = itemss.length;
        for (var i = 0; i < total; i += amountOfItemsPerGroup) {
            group = itemss.slice(i, i + amountOfItemsPerGroup);
            groups.push(group);
        }
        return groups;
    }
}
