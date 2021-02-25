import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Up from '../images/Up.png';
import Down from '../images/Down.png';

import BuyPopup from './BuyPopup';
import WalletPopup from './WalletPopup';

import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

var transacRecords = ["Your transaction records will appear here."];

function Dashboard(props) {

    var [loggedUser, setloggedUser] = useState("NoUserLogged");
    var [btc, setbtc] = useState(3294656.3423);
    var [volChnage, setvolChnage] = useState("0");
    var [prcChange, setprcChange] = useState("0");
    var [mcChange, setmcChange] = useState("0");
    var [marcUp, setmarcUp] = useState(false);

    var [buttonPopup, setbuttonPopup] = useState(false)
    var [buttonWalletPopup, setbuttonWalletPopup] = useState(false)


    var [walletBalance, setwalletBalance] = useState(10000)
    var [buyAmt, setbuyAmt] = useState("")
    var [investedAmt, setinvestedAmt] = useState(0)
    var [purchasePower, setpurchasePower] = useState(true)
    var [walletTopup, setwalletTopup] = useState("")

    const [profit, setprofit] = useState("0")
    const [loss, setloss] = useState("0")

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
        // console.log('DASHBOARD USEEFFECT TRIGGERED');
        if (!props.location.matchedUserData) {
            // console.log("REFRESH CAUSED LOSS OF USERNAME DATA HENCE SET TO UNKNOWN");
            setloggedUser("UNKNOWN");
            alert("Page refreshed cased local data wipeout. \nRegister again to proceed.");
        } else {
            setloggedUser(props.location.matchedUserData.fName)
        }


        // https://cors-anywhere.herokuapp.com/
        axios.get("https://api.nomics.com/v1/currencies/ticker?key=ecf232234b93686e9abc884ceda89756&ids=BTC,&interval=1h&convert=INR&per-page=100&page=1")
            .then(function (response) {
                setbtc(parseFloat(Number(response.data[0].price).toFixed(4)));
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

    // WHEN ENABLED CAN REFRESH THE PRICE AT REFRESH RATE WE CHOOSE
    setInterval(() => {
        // console.log('SET INTERVAL TRIGGERED');
        axios.get("https://api.nomics.com/v1/currencies/ticker?key=ecf232234b93686e9abc884ceda89756&ids=BTC,&interval=1h&convert=INR&per-page=100&page=1")
            .then(function (response) {
                // console.log(response.data[0]["1h"]);
                // console.log(parseFloat(Number(response.data[0].price).toFixed(2)));
                setbtc(parseFloat(Number(response.data[0].price).toFixed(2)));
                setvolChnage(response.data[0]["1h"].volume_change_pct);
                setprcChange(response.data[0]["1h"].price_change_pct);
                setmcChange(response.data[0]["1h"].market_cap_change_pct);
                // var { 1h } = response.data[0];
                // console.log(1h);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, 50000);

    function createPurchaseTrack(amount, buyOrSell, btcPrice) {
        // console.log("RECORDS", amount, buyOrSell, btcPrice);
        var record = `${buyOrSell} ₹${amount} at price ₿${btcPrice} on ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
        transacRecords.push(record);
        // console.log("RECORDS ARRAY", transacRecords);
    }

    function handleBuy(e) {
        setbuyAmt(e.target.value);
    }

    function handleBuyClick() {
        let futureBalance = walletBalance - (document.getElementById("buyInp1").value);
        var buyAmtx = buyAmt
        if (isNaN(parseFloat(buyAmtx))) {
            buyAmtx = 0;
        } else {
            if (futureBalance >= 0) {
                setinvestedAmt((parseFloat(investedAmt) + parseFloat(buyAmtx)))
                setwalletBalance(futureBalance)
                setbuttonPopup(false);
                setpurchasePower(true)
                setbuyAmt("")
                createPurchaseTrack(buyAmtx, "Invested", btc);
                history.push("/dashboard");
            } else {
                setpurchasePower(false)
            }
        }
    }

    function handleWalletTopUp(e) {
        setwalletTopup(e.target.value);
    }
    function handleWalletRecharge() {
        var rechargeAmt = (document.getElementById("wallet").value);
        if (isNaN(parseFloat(rechargeAmt))) {
            rechargeAmt = 0.0;
        }

        setwalletBalance(parseFloat(walletBalance) + parseFloat(rechargeAmt))
        setbuttonWalletPopup(false)
        setwalletTopup("")
        history.push("/dashboard");
    }

    return (
        <>
            <Container className="dc1">
                <Container className="dc1a p-4">
                    <Row>
                        <Col className="dc1c1">
                            {/* <div style={{ textAlign: "left" }} className="dc1a1"> */}
                            <div className="dc1a1">
                                <p className="dc1c1p1">Welcome back {loggedUser}! <span className="homeBtn"><Link to="/">Home</Link></span></p>
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
                                    <button className="dc1a4b1"
                                        onClick={() => { setbuttonPopup(true) }}
                                    >Buy</button>
                                </div>
                                <div>
                                    <button className="dc1a4b2" onClick={() => alert("Sell feature not yet available")}>Sell</button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>

            <Container className="dc2 mt-4">
                <Container className="dc2b">
                    <Row>
                        <Col sm={7} className="dc2c3">


                            <div style={{ textAlign: "left" }} className="dc2a2a">
                                <p className="">Your investment & <span style={{ color: "#229954" }}>P</span>&<span style={{ color: "#B03A2E" }}>L</span></p>
                            </div>
                            <div style={{ textAlign: "center" }} className="dc2a2b">
                                {/* <p><span>₹{investedAmt}</span> <span><img src={Up} alt="arrow-up" /></span></p> */}
                                <div>
                                    {/* <p><span>₹{investedAmt}</span> <span><img src={Up} alt="arrow-up" /></span></p> */}
                                    <p style={{ margin: "0" }}><span id="investedAmt">₹{investedAmt}</span></p>
                                </div>
                                <div>
                                    <p style={{ margin: "0", color: "#229954" }}><span>₹{profit}</span></p>
                                </div>
                                <div>
                                    <p style={{ margin: "0", color: "#B03A2E" }}><span>₹{loss}</span></p>
                                </div>
                            </div>


                            <div style={{ textAlign: "left" }} className="dc2a2c">
                                <p className="">Your wallet</p>
                            </div>
                            <div style={{ textAlign: "center" }} className="dc2a2d">
                                <div>
                                    <p style={{ margin: "0" }}>
                                        <span>₹{walletBalance}</span>
                                    </p>
                                </div>
                                <div>
                                    <button onClick={() => { setbuttonWalletPopup(true) }}>Add</button>
                                </div>
                            </div>
                        </Col>
                        <Col sm={5} className="dc2c1">
                            <div style={{ textAlign: "left" }} className="dc2a1a">
                                <p className="">Your orders</p>
                            </div>
                            <div style={{ textAlign: "center" }} className="dc2a1b">
                                {transacRecords.map((record, index) => {
                                    return <p key={index}>{record}</p>
                                })}

                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
            {/* POPUPS */}
            <BuyPopup trigger={buttonPopup} setTrigger={setbuttonPopup}>
                <div className="">
                    <h3>Enter the amount u want to invest.</h3>
                    <input id="buyInp1" type="number" className="buyInp1" autoFocus placeholder="₹500" value={buyAmt} onChange={handleBuy} />
                    <h3> at ₿ price <span>₹{btc}</span></h3>
                    <h4>Your wallet balance is ₹{walletBalance}</h4>
                    {!purchasePower && <p className="text-danger" >Insufficient balance, please top it up.</p>}
                    <button className="invstBtn" onClick={handleBuyClick}>Buy</button>
                </div>
            </BuyPopup>
            <WalletPopup trigger={buttonWalletPopup} setTrigger={setbuttonWalletPopup}>
                <div className="">
                    <h3>Enter the amount.</h3>
                    <input id="wallet" type="number" className="buyInp1" autoFocus placeholder="₹10000" onChange={handleWalletTopUp} value={walletTopup} />
                    <br />
                    <label style={{ margin: "0" }}>Select account </label>
                    <br />
                    <select className="banks">
                        <option value="bank1">STATE BANK OF INDIA - XXX 123</option>
                        <option value="bank2">AXIS BANK - XXX 123</option>
                        <option value="bank3">ICICI BANK - XXX 123</option>
                    </select>

                    <br />
                    <button className="invstBtn mt-2" onClick={handleWalletRecharge}>Add to wallet</button>
                </div>
            </WalletPopup>
        </>
    )
}

export default Dashboard;
