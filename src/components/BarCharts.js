import '../App.css';
import BarChart from "./BarChart";
// eslint-disable-next-line no-unused-vars
import {Chart as ChartJS} from 'chart.js/auto'
// eslint-disable-next-line no-unused-vars
import {Chart} from 'chart.js'
import {useEffect, useState} from "react";
import {URL} from "../Constants";
import {ThreeDots} from "react-loader-spinner";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import sm_unicode from "../utils";



// Drawing all the charts
function BarCharts() {
    const fetchData = async () => {
        const response = await fetch(URL + '/engagement');

        return await response.json();
    };


    const [by_3_labels, setLabels_by3] = useState([]);
    const [by_3_dataset, setDataset_by3] = useState([]);


    useEffect(() => {


        fetchData().then(data => {

            let labels_by_3 = [];
            let dataset_by_3 = [];
            Object.values(data).forEach(function (element, index) {

                if (index % 3 === 0) {
                    dataset_by_3.push([element])
                    labels_by_3.push([Object.keys(data)[index]])
                } else {
                    dataset_by_3[Math.floor(index / 3)].push(element)
                    labels_by_3[Math.floor(index / 3)].push((Object.keys(data)[index]))

                }


            });
            setLabels_by3(labels_by_3);
            setDataset_by3(dataset_by_3);


        });
    }, []);
// Register the plugin to all charts:
    Chart.register(ChartDataLabels);
    Chart.defaults.font.family = ['"Font Awesome 5 Brands"', '"Font Awesome 5 Pro"'];
    Chart.defaults.font.size = 30;
    Chart.defaults.font.weight = "bold";
    Chart.defaults.color = "white";

    return (

        <>
            <div className={`${by_3_labels.length===0?'loading':'loading bg-dark text-light'}`}>
                <ThreeDots visible={by_3_labels.length === 0}/></div>
            <div className="row  justify-content-center bg-dark text-light">

                <div className="col-md ">


                    {by_3_labels.map((element, index) => {
                        return (<div key={index} className="card mt-5 p-5 bg-dark text-light">

                            <BarChart

                              options={{scales: {

                                      y: {
                                          ticks: {
                                              font: {
                                                  size: 25,
                                              }
                                          },
                                          grid: {borderWidth: 5, borderColor: "white"},


                                      }
                                      , x: {
                                          grid: {borderWidth: 5, borderColor: "white"}

                                      }

                                  },
                                  plugins: {
                                      datalabels: {

                                          display: true,
                                          color: "white",
                                          formatter:  function (value, context) {
                                              let code = sm_unicode[context.dataset.label.toLowerCase()]


                                              return "+"+value+"\n"+String.fromCharCode(parseInt(code, 16));


                              },

                                          align: "start",
                                          offset:-70
                                      }
                                  },
                                  legend: {
                                      display: false
                                  }
                              }}
                                data={{
                                    labels: element,
                                    datasets: [
                                        {
                                            id: 1,
                                            label: 'Facebook',
                                            data: by_3_dataset[index],
                                            backgroundColor: 'blue',
                                        },


                                    ],


                                }}/>
                        </div>)

                    })}


                </div>
            </div>


        </>
    )
        ;
}

export default BarCharts;
