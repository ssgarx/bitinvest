import React, { useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Img1 from '../images/Img1.jpeg'
import Img2 from '../images/Img2.jpeg'
import Bch1 from '../images/Bch1.png'

var userArray = [];

function Register() {

    var [userFirstName, setuserFirstName] = useState("")
    var [userLastName, setuserLastName] = useState("")
    var [userEmail, setuserEmail] = useState("")
    var [userPassword1, setuserPassword1] = useState("")
    var [userPassword2, setuserPassword2] = useState("")
    var [userAadhar, setuserAadhar] = useState("")
    var [userAgreed, setuserAgreed] = useState(false)
    var [allParamsValid, setallParamsValid] = useState(false)




    function handleUserFistNameChange(e) {
        // var userTypedText = document.getElementById('userFirstName').value;
        // console.log("userTypedText", userTypedText);
        setuserFirstName(e.target.value);
        checkAllParams();
    }

    function handleUserLastNameChange(e) {
        // var userTypedText = document.getElementById('userLastName').value;
        // console.log("userTypedText", userTypedText);
        setuserLastName(e.target.value);
        checkAllParams();
    }

    function handleUserEmailChange(e) {
        // var userTypedText = document.getElementById("userEmail").value;
        // console.log('userTypedText', userTypedText);
        setuserEmail(e.target.value);
        checkAllParams();
    }

    function handleUserPasswordChange1(e) {
        // var userTypedText = document.getElementById("userPassword1").value;
        // console.log('userTypedText', userTypedText);
        setuserPassword1(e.target.value);
        checkAllParams();
    }
    function handleUserPasswordChange2(e) {
        // var userTypedText = document.getElementById("userPassword2").value;
        // console.log('userTypedText', userTypedText);
        setuserPassword2(e.target.value);
        checkAllParams();
    }
    function handleUserAadharChange(e) {
        // var userTypedText = document.getElementById("userAadhar").value;
        // console.log('userTypedText', userTypedText);
        setuserAadhar(e.target.value)
        checkAllParams();
    }
    function handleUserAgreeChnage(e) {
        setuserAgreed(!userAgreed);
        checkAllParams();
    }

    function checkAllParams() {
        if (document.getElementById('userFirstName').value
            && document.getElementById('userLastName').value
            && document.getElementById("userEmail").value
            && (document.getElementById("userPassword1").value === document.getElementById("userPassword2").value)
            && document.getElementById("userAadhar").value
            // && !(document.getElementById("userAgreed").defaultChecked)
        ) {
            setallParamsValid(true)
        } else {
            setallParamsValid(false)
        }
    }

    function handleUserSubmit(e) {
        // e.preventDefault();
        class User {
            constructor(fName, lName, email, password) {
                this.fName = fName;
                this.lName = lName;
                this.email = email;
                this.password = password;
            }
        }
        var newUser = new User(userFirstName, userLastName, userEmail, userPassword1);
        userArray.push(newUser);
    }

    return (
        <>
            <Container className='rc1'>
                <Row>
                    <Col lg={6}>
                        <div className="rc1b1">
                            <img className='rcimg1' src={Img1} alt="" />
                        </div>
                        <div className="rc1b1a">
                            <img className='rcimg1a' src={Img2} alt="" />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="rc1b2 ml-2">
                            <p style={{ fontStyle: "italic", fontWeight: "900", fontSize: "2rem", marginBottom: "0" }} >
                                <img style={{ width: "4rem", marginBottom: "10px" }} src={Bch1} alt="" />
                                BITINVEST
                            </p>
                            <p style={{ marginTop: "0", }}>Signup to start investing in the most secure crypto.</p>
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Control
                                            type="text"
                                            placeholder="First name"
                                            value={userFirstName}
                                            onChange={handleUserFistNameChange}
                                            id="userFirstName"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Control
                                            type="text"
                                            placeholder="Last name"
                                            value={userLastName}
                                            onChange={handleUserLastNameChange}
                                            id="userLastName"
                                        />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Group>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email id"
                                        value={userEmail}
                                        onChange={handleUserEmailChange}
                                        id="userEmail"
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control
                                        type="password"
                                        placeholder="Set a password"
                                        value={userPassword1}
                                        onChange={handleUserPasswordChange1}
                                        id="userPassword1"
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter same password as above"
                                        value={userPassword2}
                                        onChange={handleUserPasswordChange2}
                                        id="userPassword2"
                                    />
                                    {userPassword1 !== userPassword2 &&
                                        <p className="text-danger">Both the passwords need to match.</p>}

                                </Form.Group>

                                <Form.Group>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter your aadhar card number"
                                        value={userAadhar}
                                        onChange={handleUserAadharChange}
                                        id="userAadhar"
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Check type="checkbox"
                                        label="By signing up, you agree to our Terms , Data Policy and Cookies Policy ."
                                        defaultChecked={userAgreed}
                                        onChange={handleUserAgreeChnage}
                                        id="userAgreed"
                                    />
                                </Form.Group>
                                <Link to={{ pathname: "/login", userArray: userArray }}>
                                    <button
                                        style={!allParamsValid ? { backgroundColor: "rgb(221, 213, 213)" } : {}}
                                        className="rbtn1"
                                        type="button"
                                        onClick={handleUserSubmit}
                                        disabled={!allParamsValid}>
                                        Submit
                                    </button>
                                </Link>
                            </Form>
                            <p className="mt-1">Already have an account?
                                <Link to={{ pathname: "/login", userArray: userArray }}>
                                    Login
                                </Link>
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Register;
