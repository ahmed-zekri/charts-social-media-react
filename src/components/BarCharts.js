import '../App.css';
import BarChart from "./BarChart";
import {Chart as ChartJS} from 'chart.js/auto'
import {Chart} from 'react-chartjs-2'
import {useEffect, useState} from "react";
import {URL} from "../Constants";
import {TailSpin, ThreeDots} from "react-loader-spinner";

// Drawing all the charts
function BarCharts() {
    const fetchData = async () => {
        const response = await fetch(URL + '/engagement');

        return await response.json();
    };

    const [chartLabels, setChartLabels] = useState([]);
    const [chartDataSet, setChartDataSet] = useState([]);
    useEffect(() => {

        fetchData().then(data => {
            setChartDataSet(Object.values(data));
            setChartLabels(Object.keys(data));
        });
    }, []);
    return (

        <>
            <div className="loading">
                <ThreeDots visible={chartDataSet.length === 0}/></div>
            <div className="row  justify-content-center">

                <div className="col-md">

                    <div className="card" hidden={chartDataSet.length === 0}>
                        <div className="card-body">
                            <BarChart data={{
                                labels: chartLabels,
                                datasets: [
                                    {
                                        id: 1,
                                        label: 'Label',
                                        data: chartDataSet,
                                        backgroundColor: ['red', 'blue', 'green'],
                                    },

                                ],
                            }}/>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default BarCharts;
