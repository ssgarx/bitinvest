import React from 'react'
import { Chart } from "react-google-charts";

const GoogleChart1 = (props) => {
    const data = [
        ["Task", "Hours per Day"],
        [`Your investment ₹${props.userInvested} Lakh`, props.userInvested],
        [`Interest you earned ₹${props.userInterest} Lakh`, props.userInterest]
    ]
    var option1 = {
        slices: {
            0: { color: "white" },
            1: { color: "black" },
        },
        pieSliceText: "none",
        legend: {
            alignment: "center",
            position: "labeled",
            textStyle: {
                color: "#000",
                fontSize: "16",
                fontName: "Roboto",
                fontWeight: "400"
            },
        },
        chartArea: { width: "100%", height: "100%" },
        backgroundColor: "white",
        pieSliceBorderColor: "black",
    };
    var option2 = {
        slices: {
            0: { color: "rgb(247, 247, 247)" },
            1: { color: "black" },
        },
        pieSliceText: "none",
        legend: {
            alignment: "center",
            position: "right",
            // maxLines: 2,
            textStyle: {
                color: "#000",
                fontSize: "16",
                fontName: "Roboto",
                fontWeight: "400"
            },
        },
        chartArea: { width: "100%", height: "100%" },
        backgroundColor: "white",
        pieSliceBorderColor: "black",
    };

    return (
        <Chart
            chartType="PieChart"
            width="100%"
            height="400px"
            data={data}
            options={window.innerWidth < 600 ? option2 : option1}
        />
    );
};
export default GoogleChart1;


