import React from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Img1 from '../images/Img1.jpeg'
import Img2 from '../images/Img2.jpeg'
import Bch1 from '../images/Bch1.png'

function Register() {
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
                                    <Form.Group as={Col} controlId="formGridFistName">
                                        <Form.Control type="text" placeholder="First name" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridLastName">
                                        <Form.Control type="text" placeholder="Last name" />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Group controlId="formGridEmail">
                                    <Form.Control type="email" placeholder="Enter your email id" />
                                </Form.Group>

                                <Form.Group controlId="formGridPassword1">
                                    <Form.Control type="password" placeholder="Set a password" />
                                </Form.Group>

                                <Form.Group controlId="formGridPassword2">
                                    <Form.Control type="password" placeholder="Enter same password as above" />
                                </Form.Group>

                                <Form.Group controlId="formGridAadhar">
                                    <Form.Control type="number" placeholder="Enter your aadhar card number" />
                                </Form.Group>

                                <Form.Group id="formGridCheckbox">
                                    <Form.Check type="checkbox" label="By signing up, you agree to our Terms , Data Policy and Cookies Policy ." />
                                </Form.Group>
                                <Link to="/login">
                                    {/* <Button style={{ backgroundColor: "black", width: "8rem" }} variant="dark" type="submit">
                                        Submit
                                    </Button> */}
                                    <button className="rbtn1" type="submit">Submit</button>
                                </Link>
                            </Form>
                            <p className="mt-1">Already have an account?
                                <Link to="/login">
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
