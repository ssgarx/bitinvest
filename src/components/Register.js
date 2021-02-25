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
    var [allParamsValid, setallParamsValid] = useState(false)

    const [fNameValidity, setfNameValidity] = useState(true)
    const [lNameValidity, setlNameValidity] = useState(true)
    const [emailValidity, setemailValidity] = useState(true)
    const [aadharValidity, setaadharValidity] = useState(true)

    function handleUserFistNameChange(e) {
        setuserFirstName(e.target.value);
        checkAllParams();
        fnameValidityF(e.target.value)
    }
    function fnameValidityF(textx) {
        if (textx.match(/^[a-zA-Z]+$/)) {
            setfNameValidity(true);
            return true;
        } else {
            setfNameValidity(false)
            return false;
        }
    }

    function handleUserLastNameChange(e) {
        setuserLastName(e.target.value);
        checkAllParams();
        lnameValidityF(e.target.value)
    }

    function lnameValidityF(textx) {
        if (textx.match(/^[a-zA-Z]+$/)) {
            setlNameValidity(true)
            return true;
        } else {
            setlNameValidity(false)
            return false;
        }
    }

    function handleUserEmailChange(e) {
        setuserEmail(e.target.value);
        checkAllParams();
        emailValidityF(e.target.value)
    }

    function emailValidityF(textx) {
        if (textx.match(/^[a-zA-Z0-9@.]+$/) && textx.includes("@") && textx.includes(".")) {
            setemailValidity(true);
            return true;
        } else {
            setemailValidity(false);
            return false;
        }
    }

    function handleUserPasswordChange1(e) {
        setuserPassword1(e.target.value);
        checkAllParams();
    }
    function handleUserPasswordChange2(e) {
        setuserPassword2(e.target.value);
        checkAllParams();
    }
    function handleUserAadharChange(e) {
        setuserAadhar(e.target.value)
        checkAllParams();
        aadharValidityF(e.target.value)
    }

    function aadharValidityF(textx) {
        if (textx.match(/^[0-9]+$/) && textx.length === 12) {
            setaadharValidity(true);
            return true;
        } else {
            setaadharValidity(false);
            return false;
        }
    }

    function checkAllParams() {
        if (document.getElementById('userFirstName').value
            && document.getElementById('userLastName').value
            && document.getElementById("userEmail").value
            && (document.getElementById("userPassword1").value === document.getElementById("userPassword2").value)
            && document.getElementById("userAadhar").value
            && fnameValidityF(document.getElementById('userFirstName').value)
            && lnameValidityF(document.getElementById('userLastName').value)
            && emailValidityF(document.getElementById('userEmail').value)
            && aadharValidityF(document.getElementById('userAadhar').value)
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
                                            pattern="([A-zÀ-ž\s]){2,}"
                                            required
                                        />
                                        {!fNameValidity &&
                                            <p style={{ margin: "0" }} className="text-danger">Invalid first name.</p>}
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Control
                                            type="text"
                                            placeholder="Last name"
                                            value={userLastName}
                                            onChange={handleUserLastNameChange}
                                            id="userLastName"
                                        />
                                        {!lNameValidity &&
                                            <p style={{ margin: "0" }} className="text-danger">Invalid last name.</p>}
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
                                    {!emailValidity &&
                                        <p style={{ margin: "0" }} className="text-danger">Invalid email, must have @ & .com</p>}
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
                                    {!aadharValidity &&
                                        <p style={{ margin: "0" }} className="text-danger">Invalid aadhar number, must contain 12 digits.</p>}
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
                            <p className="mt-3">Already have an account?
                            <br />
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
