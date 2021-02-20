import React from 'react'
import { Chart } from "react-google-charts";

const ExampleChart = (props) => {
    // console.log("Chart Props", props);
    const data = [
        ["Task", "Hours per Day"],
        [`Your investment ₹${props.userInvested} Lakh`, props.userInvested],
        [`Interest you earned ₹${props.userInterest} Lakh`, props.userInterest]
    ]
    var option1 = {
        // title: "My Average Day",
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
        chartArea: { width: "80%", height: "80%" },
        backgroundColor: "white",
        pieSliceBorderColor: "black",
    };

    return (
        <Chart
            chartType="PieChart"
            width="100%"
            height="400px"
            data={data}
            options={option1}
        />
    );
};
export default ExampleChart;


