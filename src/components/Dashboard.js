import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';

function Dashboard(props) {

    console.log('Data passed form Login to Dashboard', props.location.matchedUserData)
    return (
        <>
            <Container className="dc1">
                <Container className="dc1a p-4">
                    <Row>
                        <Col className="dc1c1">
                            <div style={{ textAlign: "left" }} className="dc1a1">
                                <p className="dc1c1p1">Welcome back Sagar!</p>
                            </div>
                            <div style={{ textAlign: "center" }} className="dc1a2">
                                <p>current price is <span>₹858585</span></p>
                            </div>
                            <div style={{ textAlign: "center" }} className="dc1a3">
                                <div><p>volume change: <span>0.1409%</span></p></div>
                                <div><p>price change: <span>-0.0320%</span></p></div>
                                <div><p>mkt. cap. change: <span>0.0069%</span></p></div>
                            </div>
                            <div style={{ textAlign: "center" }} className="dc1a4">
                                <div>
                                    <button className="dc1a4b1">Buy</button>
                                </div>
                                <div>
                                    <button className="dc1a4b2">Sell</button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>


            <Container className="dc2 mt-4">
                <Container className="dc2b">
                    <Row>
                        <Col sm={6} className="dc2c3">
                            <div style={{ textAlign: "left" }} className="dc2a2a">
                                <p className="">Your investment</p>
                            </div>
                            <div style={{ textAlign: "center" }} className="dc2a2b">
                                <p><span>₹12122</span></p>
                            </div>
                            <div style={{ textAlign: "left" }} className="dc2a2c">
                                <p className="">Your wallet</p>
                            </div>
                            <div style={{ textAlign: "center" }} className="dc2a2d">
                                <div>
                                    <p style={{ margin: "0" }}>
                                        <span>₹822.35</span>
                                    </p>
                                </div>
                                <div>
                                    <button>Add</button>
                                </div>
                            </div>
                        </Col>
                        <Col sm={6} className="dc2c1">
                            <div style={{ textAlign: "left" }} className="dc2a1a">
                                <p className="">Your orders</p>
                            </div>
                            <div style={{ textAlign: "center" }} className="dc2a1b">
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    )
}

export default Dashboard;
