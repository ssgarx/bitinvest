import React from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import Img2 from '../images/Img2.jpeg'
import Bch1 from '../images/Bch1.png'
import { Link } from 'react-router-dom'

function Login() {
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

                                <Form.Group className="mt-3" as={Col} controlId="formGridEmail">
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>

                                <button className="lbtn1">Log In</button>
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
