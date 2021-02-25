import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import GoogleChart1 from './GoogleChart1 '
import HomePopup from './HomePopup';
import WarningImg from '../images/HomeWarning.png'

/*eslint-disable no-unused-vars*/
var userInputAmtX = "₹100";
var btc = 1;
function Home() {
    var [userInputAmt, setuserInputAmt] = useState("₹100")
    var [userYears, setUserYears] = useState(7)
    var [userMonths, setUserMonths] = useState(2)
    var [userInvested, setUserInvested] = useState(3.6)
    var [userGains, setuserGains] = useState(96.4)
    var [loading, setLoading] = useState(true)
    var [bitCalc, setBitCalc] = useState(0.00003)

    var [buttonPopup1, setbuttonPopup1] = useState(false)

    function userInputHandler(e) {
        userInputAmtX = e.target.value;
        setuserInputAmt(userInputAmtX);

        if (!userInputAmtX.startsWith("₹")) {
            document.getElementById("input").value = "₹100";
            alert(`You can't remove ₹ symbol`);
            userInputAmtX = "₹100";
            setuserInputAmt("₹100");
        }
        userInputAmtX = userInputAmtX.split("₹");
        userInputAmtX = parseFloat(userInputAmtX[1] || 0);
        setLoading(false);
        setBitCalc((userInputAmtX / btc).toFixed(5))


    }

    //FETCH THE LATEST BTC PRICE ONCE ON PAGE LOAD
    // https://cors-anywhere.herokuapp.com/
    useEffect(() => {
        axios.get("https://api.nomics.com/v1/currencies/ticker?key=ecf232234b93686e9abc884ceda89756&ids=BTC,&interval=1h&convert=INR&per-page=100&page=1")
            .then(function (response) {
                var btcPrice = parseFloat(Number(response.data[0].price).toFixed(2));
                btc = btcPrice;
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    useEffect(() => {
        var amountByUser;
        if (userInputAmtX === "₹100") {
            userInputAmtX = 100
        }
        if (userInputAmtX === 0) {
            setUserYears(0);
            setUserMonths(0);
            setUserInvested(0);
            setuserGains(0);
        } else {
            let ret = 0.9521;//BTC LIFETIME AVERAGE GROWTH RATE 95.21% (YCHARTS.COM)
            let yearswithdecimal;
            let inc = 0.1;
            for (var i = 0; i < 201; i += 0.01) {
                let a =
                    ((1 + ret) * (userInputAmtX * 30.5) * (12 * (Math.pow(1 + ret, i) - Math.pow(1 + inc + 0.0000001, i)))) /
                    (ret - inc + 0.0000001);
                if (a > 10000000) {
                    yearswithdecimal = i;
                    let years = parseInt(i);
                    let months = (i % 1) * 12;
                    months = Math.floor(months);
                    setUserYears(years);
                    setUserMonths(months);
                    break;
                }
            }
            amountByUser = (userInputAmtX * 30.5 * 12 * (Math.pow(1 + inc, yearswithdecimal) - 1)) / (1 + inc - 1);
            let amtInLakhs = Math.abs(amountByUser);
            let interestEarned = Math.abs(10000000 - amountByUser);
            if (amtInLakhs >= 10000000) {
                amtInLakhs = (amtInLakhs / 10000000).toFixed(1);
                interestEarned = (interestEarned / 10000000).toFixed(1);

            } else if (amtInLakhs >= 100000) {
                amtInLakhs = (amtInLakhs / 100000).toFixed(1);
                interestEarned = (interestEarned / 100000).toFixed(1);
            } else {
                amtInLakhs = (amtInLakhs / 10000).toFixed(1);
                interestEarned = (interestEarned / 10000).toFixed(1);
            }
            setUserInvested(amtInLakhs);
            setuserGains(interestEarned);
        }

    }, [userInputAmt])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setTimeout(() => {
            setbuttonPopup1(true);
        }, 2000);
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <Container fluid>
                <Row className="align-items-center c1row">
                    <Col lg={6} >
                        <div className="c1box1">
                            <p className="c1b1p1">Enter your daily investment</p>
                            <input className="c1b1input1"
                                id="input"
                                type="text"
                                value={userInputAmt}
                                autoComplete="off"
                                onChange={userInputHandler}
                                autoFocus
                            />
                            <h5>or {bitCalc} BTC</h5>
                            <p className="c1b1p1">No. of years required to reach ₹1 crore:</p>
                            <p className="c1b1p2"> {userYears} years {userMonths} months</p>
                        </div>
                    </Col>
                    <Col lg={6} >
                        <div className="c1box2">
                            {/* <h1>box1</h1> */}
                            <GoogleChart1
                                userInvested={parseFloat(userInvested)}
                                userGains={parseFloat(userGains)}
                            />
                            <p className="mt-2" style={{ fontSize: "10px" }}>Assumption based on lifetime average yearly growth of 95.21%</p>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container style={{ textAlign: "center" }}>
                <Link to='/register'>
                    <button className="c2btn1">Begin your journey now!</button>
                </Link>
            </Container>
            <HomePopup trigger={buttonPopup1} setTrigger={setbuttonPopup1}>
                <div className="">
                    <h5>1* Please open the console (f12)</h5>
                    <h5>2* Click on the cors link</h5>
                    <h5>3* Click on request access to demo server (Essential for API's in this projext to function)</h5>
                    <h5>4* Refresh</h5>
                    <img className="warningImg" src={WarningImg} alt="warning" />
                    <h5>Also avoid refreshing the browser and using browser navigation as the
                    data is local and refresing the page will cause data reset.</h5>
                </div>
            </HomePopup>
        </>
    )
}

export default Home;
