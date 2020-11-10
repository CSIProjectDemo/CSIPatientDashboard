import React, {useState, useEffect} from "react";
import {Link, Redirect} from 'react-router-dom';
import logoImg from "../logo192.png";
import axios from "axios";
import {useAuth} from "../context/auth";
import {Form, Button, Card} from "react-bootstrap"
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import {Icon} from "leaflet";

function Register() {
    const [isRegistered, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("")
    const [phoneNumber, setphoneNumber] = useState("");
    const [dateOfBirth, setdateOfBirth] = useState("");
    const [ethnicity, setethnicity] = useState("");
    const [race, setrace] = useState("");
    const [gender, setgender] = useState("");
    const [marital, setmarital] = useState("");
    const [diet, setDiet] = useState("");
    const [givenBirth, setgivenBirth] = useState("No");
    const [timesBirth, settimesBirth] = useState("");
    const [smoking, setSmoking] = useState("")
    const [userTransferID, setUserid] = useState("");
    const [currentPos, setcurrentPos] = useState("");


    function postRegister() {
        axios.post("https://csidatabase.herokuapp.com/api/users/", {
            username,
            password
        }).then(result => {
            if (result.status === 201) {
                let x = JSON.parse(result.data.id);
                setUserid(x);
                console.log(userTransferID);
                console.log(x)
                setLoggedIn(true);
            } else {
                setIsError(true);
            }
        }).catch(e => {
            setIsError(true);
        });
    }

    useEffect(() => {
        axios.post("https://csidatabase.herokuapp.com/api/patients/", {
            userTransferID,
            age,
            height,
            weight,
            firstName,
            lastName,
            phoneNumber,
            dateOfBirth,
            ethnicity,
            race,
            gender,
            marital,
            diet,
            givenBirth,
            timesBirth,
            smoking,
            currentPos,
        }).then(result => {
            if (result.status === 200) {
                setLoggedIn(true);
            } else {
                setIsError(true);
            }
        }).catch(e => {
            setIsError(true);
        });
    }, [userTransferID]);

    if (isRegistered) {
        return <Redirect to="/login"/>;
    }

    function handleClick(e) {
        setcurrentPos(e.latlng);
    }

    return (

            <Card>
                <Card.Body>
                    <Form>
                        <h3>User Creation</h3>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username"
                                          value={username}
                                          onChange={e => {
                                              setUsername(e.target.value);
                                          }}
                                          placeholder="Patient001"/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                          value={password}
                                          onChange={e => {
                                              setPassword(e.target.value);
                                          }}
                                          placeholder="password"/>
                        </Form.Group>

                        <h3>Patient Creation</h3>
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text"
                                          value={firstName}
                                          onChange={e => {
                                              setfirstName(e.target.value);
                                          }}
                                          placeholder="John"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text"
                                          value={lastName}
                                          onChange={e => {
                                              setlastName(e.target.value);
                                          }}
                                          placeholder="Smith"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="Tel"
                                          value={phoneNumber}
                                          onChange={e => {
                                              setphoneNumber(e.target.value);
                                          }}
                                          placeholder="XXX-XXX-XXXX"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="date"
                                          value={dateOfBirth}
                                          onChange={e => {
                                              setdateOfBirth(e.target.value);
                                          }}
                                          placeholder=""
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="number"
                                          value={age}
                                          onChange={e => {
                                              setAge(e.target.value);
                                          }}
                                          placeholder="age"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Height</Form.Label>
                            <Form.Control type="number"
                                          value={height}
                                          onChange={e => {
                                              setHeight(e.target.value);
                                          }}
                                          placeholder="height"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Weight</Form.Label>
                            <Form.Control type="number"
                                          value={weight}
                                          onChange={e => {
                                              setWeight(e.target.value);
                                          }}
                                          placeholder="weight"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Location</Form.Label>
                            <Map id="mapid" center={[45.4, -75.7]} zoom={12} onClick={handleClick}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                />
                                {currentPos && <Marker position={currentPos} draggable={true}>
                                    <Popup position={currentPos}>
                                        Current location: <pre>{JSON.stringify(currentPos, null, 2)}</pre>
                                    </Popup>
                                </Marker>}
                            </Map>
                        </Form.Group>

                        <Form.Group value={ethnicity}
                                    onChange={e => {
                                        setethnicity(e.target.value);
                                    }}>
                            <Form.Label>
                                ethnicity
                            </Form.Label>
                            <div key={`default-radio`}>
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Hispanic or Latino"
                                    name="formHorizontalRadios1"
                                    value="Hispanic or Latino"
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="NOT Hispanic or Latino"
                                    name="formHorizontalRadios1"
                                    value="NOT Hispanic or Latino"
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Unknown / Not Reported"
                                    name="formHorizontalRadios1"
                                    value="Unknown / Not Reported"
                                />
                            </div>
                        </Form.Group>

                        <Form.Group value={race}
                                    onChange={e => {
                                        setrace(e.target.value);
                                    }}>
                            <Form.Label>
                                race
                            </Form.Label>
                            <div key={`default-radio`}>
                                <Form.Check
                                    type="radio"
                                    label="American Indian/Alaska Native"
                                    name="formHorizontalRadios2"
                                    value="American Indian/Alaska Native"
                                />
                                <Form.Check
                                    type="radio"
                                    label="Asian"
                                    name="formHorizontalRadios2"
                                    value="Asian"
                                />
                                <Form.Check
                                    type="radio"
                                    label="Native Hawaiian or Other Pacific Islander"
                                    name="formHorizontalRadios2"
                                    value="Native Hawaiian or Other Pacific Islander"
                                />
                                <Form.Check
                                    type="radio"
                                    label="Black or African American"
                                    name="formHorizontalRadios2"
                                    value="Black or African American"
                                />
                                <Form.Check
                                    type="radio"
                                    label="White"
                                    name="formHorizontalRadios2"
                                    value="White"
                                />
                                <Form.Check
                                    type="radio"
                                    label="More Than One Race"
                                    name="formHorizontalRadios2"
                                    value="More Than One Race"
                                />
                                <Form.Check
                                    type="radio"
                                    label="Unknown / Not Reported"
                                    name="formHorizontalRadios2"
                                    value="Unknown / Not Reported"
                                />
                            </div>
                        </Form.Group>

                        <Form.Group value={gender}
                                    onChange={e => {
                                        setgender(e.target.value);
                                    }}>
                            <Form.Label>
                                gender
                            </Form.Label>
                            <div key={`default-radio`}>
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Female"
                                    name="formHorizontalRadios3"
                                    value="Female"
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Male"
                                    name="formHorizontalRadios3"
                                    value="Male"
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Other"
                                    name="formHorizontalRadios3"
                                    value="Other"
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Prefer not to say"
                                    name="formHorizontalRadios3"
                                    value="Prefer not to say"
                                />
                            </div>
                        </Form.Group>

                        <Form.Group value={marital}
                                    onChange={e => {
                                        setmarital(e.target.value);
                                    }}>
                            <Form.Label>
                                marital Status
                            </Form.Label>
                            <div key={`default-radio`}>
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Single"
                                    name="formHorizontalRadios4"
                                    value="Single"
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Married"
                                    name="formHorizontalRadios4"
                                    value="Married"
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Prefer not to tel"
                                    name="formHorizontalRadios4"
                                    value="Prefer not to tel"
                                />
                            </div>
                        </Form.Group>

                        <Form.Group value={diet}
                                    onChange={e => {
                                        setDiet(e.target.value);
                                    }}>
                            <Form.Label>
                                Diet Type
                            </Form.Label>
                            <div key={`default-radio`}>
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Veggie"
                                    name="formHorizontalRadios5"
                                    value="Veggie"
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Vegan"
                                    name="formHorizontalRadios5"
                                    value="Vegan"
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Regular"
                                    name="formHorizontalRadios5"
                                    value="Regular"
                                />
                            </div>
                        </Form.Group>

                        <Form.Group value={givenBirth}
                                    onChange={e => {
                                        setgivenBirth(e.target.value);
                                    }}>
                            <Form.Label>
                                Have you given birth?
                            </Form.Label>
                            <div key={`default-radio`}>
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="No"
                                    name="formHorizontalRadios6"
                                    value="No"
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Yes"
                                    name="formHorizontalRadios6"
                                    value="Yes"
                                />
                            </div>
                        </Form.Group>

                        {givenBirth === "Yes"
                            ? <Form.Group>
                                <Form.Label>Number of Births</Form.Label>
                                <Form.Control type="number"
                                              value={timesBirth}
                                              onChange={e => {
                                                  settimesBirth(e.target.value);
                                              }}
                                              placeholder="1"
                                />
                            </Form.Group>
                            : ""}


                        <Form.Group>
                            <Form.Label>Smoking</Form.Label>
                            <Form.Control as="select"
                                          value={smoking}
                                          onChange={e => {
                                              setSmoking(e.target.value);
                                          }}
                                          placeholder="Number">
                                <option>Former Smoker</option>
                                <option>Current Smoker</option>
                                <option>Non Smoker</option>
                                <option>Prefer not to tell</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>
                                Allergies, if any
                            </Form.Label>
                            <div key={`default-checkbox`}>
                                <Form.Check
                                    type="checkbox"
                                    label="Allergy to mould"
                                    name="formHorizontalCheck1"
                                    value="Allergy to mould"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Allergy to peanuts"
                                    name="formHorizontalCheck1"
                                    value="Allergy to peanuts"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Shellfish allergy"
                                    name="formHorizontalCheck1"
                                    value="Shellfish allergy"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Dander (animal) allergy"
                                    name="formHorizontalCheck1"
                                    value="Dander (animal) allergy"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="House dust mite allergy"
                                    name="formHorizontalCheck1"
                                    value="House dust mite allergy"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Allergy to grass pollen"
                                    name="formHorizontalCheck1"
                                    value="Allergy to grass pollen"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Allergy to dairy product"
                                    name="formHorizontalCheck1"
                                    value="Allergy to dairy product"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Latex allergy"
                                    name="formHorizontalCheck1"
                                    value="Latex allergy"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Allergy to fish"
                                    name="formHorizontalCheck1"
                                    value="Allergy to tree pollen"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Allergy to nut"
                                    name="formHorizontalCheck1"
                                    value="Allergy to nut"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Allergy to bee venom"
                                    name="formHorizontalCheck1"
                                    value="Allergy to bee venom"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Allergy to eggs"
                                    name="formHorizontalCheck1"
                                    value="Allergy to eggs"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Allergy to wheat"
                                    name="formHorizontalCheck1"
                                    value="Allergy to wheat"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Allergy to soya"
                                    name="formHorizontalCheck1"
                                    value="Allergy to soya"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="others"
                                    name="formHorizontalCheck1"
                                    value="others"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="None"
                                    name="formHorizontalCheck1"
                                    value="None"
                                />
                            </div>
                            <Form.Text className="text-muted">
                                (Please choose all that apply.)
                            </Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Comments</Form.Label>
                            <Form.Control type="text"
                                          value={age}
                                          onChange={e => {
                                              setAge(e.target.value);
                                          }}
                                          placeholder="What can we do better?"
                            />
                        </Form.Group>

                        <Button variant="primary" onClick={postRegister}>
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
    );
}

export default Register;