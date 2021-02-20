import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ExampleChart from './ExampleChart '



var userInputAmtX = "₹100";
var btc = 1;
function Comp1() {
    var [userInputAmt, setuserInputAmt] = useState("₹100")
    var [userYears, setUserYears] = useState(7)
    var [userMonths, setUserMonths] = useState(2)
    var [userInvested, setUserInvested] = useState(3.6)
    var [userInterest, setUserInterest] = useState(96.4)
    var [loading, setLoading] = useState(true)
    var [bitCalc, setBitCalc] = useState(0.00003)

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
            setUserInterest(0);
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
            setUserInterest(interestEarned);
        }

    }, [userInputAmt])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <Container fluid>
                <Row className="align-items-center c1row">
                    <Col lg={7} >
                        <div className="c1box1">
                            <p className="c1b1p1">Enter your daily investment</p>
                            <input className="c1b1input1"
                                id="input"
                                type="text"
                                value={userInputAmt}
                                autoComplete="off"
                                onChange={userInputHandler}
                            />
                            <h5>or {bitCalc} BTC</h5>
                            <p className="c1b1p1">No. of years required to reach ₹1 crore:</p>
                            <p className="c1b1p2"> {userYears} years {userMonths} months</p>
                            {loading && <p>User invested 3.6 Lakh & user interest 96.4 Lakh</p>}
                            {!loading && <p>User invested {userInvested} & user interest {userInterest}</p>}

                        </div>
                    </Col>
                    <Col lg={5} >
                        <div className="c1box2">
                            {/* <h1>box1</h1> */}
                            <ExampleChart
                                userInvested={parseFloat(userInvested)}
                                userInterest={parseFloat(userInterest)}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Comp1;
