import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Up from '../images/Up.png';
import Down from '../images/Down.png';
import { useHistory } from 'react-router';

function Dashboard(props) {

    var [loggedUser, setloggedUser] = useState("NoUserLogged");
    var [btc, setbtc] = useState("0");
    var [volChnage, setvolChnage] = useState("0");
    var [prcChange, setprcChange] = useState("0");
    var [mcChange, setmcChange] = useState("0");
    var [marcUp, setmarcUp] = useState(false)


    var history = useHistory();

    var [locationKeys, setLocationKeys] = useState([])

    //FOLLOWING APPARATUS IS TO PREVENT CRASH ON LOCAL DATA REFRESH
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
        console.log('useEff API fetch');
        setloggedUser(props.location.matchedUserData.fName)
        axios.get("https://cors-anywhere.herokuapp.com/https://api.nomics.com/v1/currencies/ticker?key=ecf232234b93686e9abc884ceda89756&ids=BTC,&interval=1h&convert=INR&per-page=100&page=1")
            .then(function (response) {
                setbtc(parseFloat(Number(response.data[0].price).toFixed(2)));
                var { volume_change_pct, price_change_pct, market_cap_change_pct } = response.data[0]["1h"];
                if (price_change_pct > 0) { setmarcUp(true) } else { setmarcUp(false) }
                setvolChnage(volume_change_pct);
                setprcChange(price_change_pct);
                setmcChange(market_cap_change_pct);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    //WHEN ENABLED CAN REFRESH THE PRICE AT REFRESH RATE WE CHOOSE
    // setInterval(() => {
    //     console.log('timer executing');
    //     axios.get("https://api.nomics.com/v1/currencies/ticker?key=ecf232234b93686e9abc884ceda89756&ids=BTC,&interval=1h&convert=INR&per-page=100&page=1")
    //         .then(function (response) {
    //             // console.log(response.data[0]["1h"]);
    //             // console.log(parseFloat(Number(response.data[0].price).toFixed(2)));
    //             setbtc(parseFloat(Number(response.data[0].price).toFixed(2)));
    //             setvolChnage(response.data[0]["1h"].volume_change_pct);
    //             setprcChange(response.data[0]["1h"].price_change_pct);
    //             setmcChange(response.data[0]["1h"].market_cap_change_pct);
    //             // var { 1h } = response.data[0];
    //             // console.log(1h);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         })
    // }, 900000);

    return (
        <>
            <Container className="dc1">
                <Container className="dc1a p-4">
                    <Row>
                        <Col className="dc1c1">
                            <div style={{ textAlign: "left" }} className="dc1a1">
                                <p className="dc1c1p1">Welcome back {loggedUser}!</p>
                            </div>
                            <div style={{ textAlign: "center" }} className="dc1a2">
                                <p>current price is
                                <span>₹{btc}</span>
                                    <span>{marcUp ? <img src={Up} alt="arrow-up" /> : <img src={Down} alt="arrow-down" />}</span>
                                </p>
                            </div>
                            <div style={{ textAlign: "center" }} className="dc1a3">
                                <div><p>volume change: <span>{volChnage}%</span></p></div>
                                <div><p>price change: <span>{prcChange}%</span></p></div>
                                <div><p>mkt. cap. change: <span>{mcChange}%</span></p></div>
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
                                <p><span>₹12122</span> <span><img src={Up} alt="arrow-up" /></span></p>
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
                                <p>23/02/2021 ₹452 buy at ₿3294656.23</p>
                                <p>23/02/2021 ₹522 buy at ₿3294242.25</p>
                                <p>23/02/2021 ₹282 buy at ₿3294236.26</p>
                                <p>23/02/2021 ₹872 buy at ₿3294762.62</p>
                                <p>23/02/2021 ₹252 buy at ₿3294365.53</p>
                                <p>23/02/2021 ₹225 buy at ₿3294238.52</p>
                                <p>23/02/2021 ₹862 buy at ₿3294663.50</p>
                                <p>23/02/2021 ₹871 buy at ₿3294725.93</p>
                                <p>23/02/2021 ₹684 buy at ₿3294672.36</p>
                                <p>23/02/2021 ₹284 buy at ₿3294636.52</p>
                                <p>23/02/2021 ₹126 buy at ₿3294635.92</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    )
}

export default Dashboard;
