import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import Img2 from '../images/Img2.jpeg'
import Bch1 from '../images/Bch1.png'
import { Link, useHistory } from 'react-router-dom'

var backUpArray;
// console.log("LOGIN PAGE REFRESHED");
function Login(props) {

    var [userLoginEmail, setuserLoginEmail] = useState("")
    var [userLoginPass, setuserLoginPass] = useState("")
    var [allParamsValid, setallParamsValid] = useState(false)
    var [paramValidity, setparamValidity] = useState(true)
    var history = useHistory();

    var [locationKeys, setLocationKeys] = useState([])

    useEffect(() => {
        return history.listen(location => {
            if (history.action === 'PUSH') {
                setLocationKeys([location.key])
            }

            if (history.action === 'POP') {
                if (locationKeys[1] === location.key) {
                    setLocationKeys(([_, ...keys]) => keys)
                    // Handle forward event
                    history.push("/register");
                } else {
                    setLocationKeys((keys) => [location.key, ...keys])
                    // Handle back event
                    history.push("/register");
                }
            }
        })
    }, [locationKeys])// eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        // console.log("DATA PASSED FROM REGISTER TO LOGIN", props.location.userArray);
        //FOLLOWING APPARATUS IS TO PREVENT CRASH ON LOCAL DATA REFRESH
        if (!props.location.userArray) {
            // console.log("LOGIN PAGE RESET ");
            backUpArray = { fName: "za", lName: "za", email: "za", password: "za" }
            alert("Page refreshed cased local data wipeout. \nRegister again to proceed.")
        } else {
            backUpArray = props.location.userArray;
        }
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    function handleUserLoginChange(e) {
        setuserLoginEmail(e.target.value);
        checkAllParams();
    }

    function handleUserPassChange(e) {
        setuserLoginPass(e.target.value)
        checkAllParams();
    }
    function checkAllParams() {
        if (document.getElementById('userLoginName').value
            && document.getElementById('userLoginPass').value
        ) {
            setallParamsValid(true);
        } else {
            setallParamsValid(false);
        }
    }


    function handleLoginClick(e) {
        e.preventDefault();
        var matchedUserData;
        var match = "Fail";
        for (let i = 0; i < backUpArray.length; i++) {
            if (backUpArray[i].email === userLoginEmail && backUpArray[i].password === userLoginPass) {
                matchedUserData = backUpArray[i];
                match = "Pass"
                break;
            }
        }
        // console.log(match);
        if (match === "Pass") {
            history.push({
                pathname: "/dashboard",
                matchedUserData: matchedUserData
            });
        } else {
            setparamValidity(false)
            // history.push("/login"); //THIS WILL CAUSE LOSS OF DATA
        }
    }

    return (
        <>
            <Container style={{ maxWidth: "25rem" }} className="lc1">
                <Row>
                    <Col>
                        <div className="lcb1">
                            <img className='rcimg1a' src={Img2} alt="" />
                        </div>
                        <p style={{ fontStyle: "italic", fontWeight: "900", fontSize: "2rem", marginBottom: "0" }} >
                            <img style={{ width: "4rem", marginBottom: "10px", marginTop: "10px", marginLeft: "3.5rem" }} src={Bch1} alt="" />
                                BITINVEST
                            </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="lcb2">
                            <Form>

                                <Form.Group className="mt-3" as={Col} >
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={userLoginEmail}
                                        onChange={handleUserLoginChange}
                                        id="userLoginName"
                                    />
                                </Form.Group>

                                <Form.Group as={Col} >
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={userLoginPass}
                                        onChange={handleUserPassChange}
                                        id="userLoginPass"
                                    />
                                </Form.Group>
                                {!paramValidity && <p className="text-danger">Invalid email or password.</p>}
                                <button
                                    style={!allParamsValid ? { backgroundColor: "rgb(221, 213, 213)" } : {}}
                                    onClick={handleLoginClick}
                                    className="lbtn1">Log In
                                </button>
                            </Form>
                            <p className="mt-4">Don't have an account?
                                <Link to="/register">
                                    Sign-in
                                </Link>
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Login;
