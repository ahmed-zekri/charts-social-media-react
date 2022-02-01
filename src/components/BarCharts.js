import '../App.css';
import BarChart from "./BarChart";
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import {Chart} from 'chart.js'
import {useEffect, useState} from "react";
import {ThreeDots} from "react-loader-spinner";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import sm_unicode from "../utils";


// Drawing all the charts
function BarCharts({group_length, data, location}) {

//grouping the data by groups of 3
    const [by_groups_labels, setLabels_by_groups] = useState([]);
    const [by_groups_dataset, set_dataset_by_groups] = useState([]);


// fetching the data
    useEffect(() => {


        let labels_by_groups = [];
        let dataset_by_groups = [];
        Object.values(data).forEach(function (element, index) {

            if (index % group_length === 0) {
                dataset_by_groups.push([element])
                labels_by_groups.push([Object.keys(data)[index]])
            } else {
                dataset_by_groups[Math.floor(index / group_length)].push(element)
                labels_by_groups[Math.floor(index / group_length)].push((Object.keys(data)[index]))

            }


        });
        setLabels_by_groups(labels_by_groups);
        set_dataset_by_groups(dataset_by_groups);


    }, [data, group_length]);
// Register the plugin to all charts:
    Chart.register(ChartDataLabels);
    Chart.defaults.font.family = ['"Font Awesome 5 Brands"', '"Font Awesome 5 Pro"'];
    Chart.defaults.font.size = 30;
    Chart.defaults.font.weight = "bold";
    Chart.defaults.color = "white";
    let pieCharts = by_groups_labels.map((element, index) =>
        by_groups_dataset[index].map((element_one, index_one) =>

            <div key={index+"_"+index_one} className="card mt-5 p-5 bg-dark text-light">

                <BarChart location={location}

                          options={{

                              plugins: {
                                  datalabels: {

                                      display: true,
                                      color: "white",
                                      formatter: function (value, context) {
                                          let code = sm_unicode[context.dataset.label.toLowerCase()]


                                          return "+" + value + (location.includes("percentage") ? "%" : "") + "\n" + String.fromCharCode(parseInt(code, 16));


                                      },


                                  }
                              },
                              legend: {
                                  display: false
                              }
                          }}
                          data={{
                              labels: ['Facebook', 'Twitter', 'Instagram'],
                              datasets: [
                                  {
                                      id: index+"_"+index_one,
                                      label: element[index_one],
                                      data: Object.values(by_groups_dataset[index][index_one]),
                                      backgroundColor: ['blue', 'red', 'green'],
                                  },


                              ],


                          }}/>

            </div>
        )
    )
    console.log(pieCharts)
    return (

        <>
            <div className={`${by_groups_labels.length === 0 ? 'loading' : 'loading bg-dark text-light'}`}>
                <ThreeDots visible={by_groups_labels.length === 0}/></div>
            <div className="row  justify-content-center bg-dark text-light">

                <div className="col-md ">


                    {pieCharts}


                </div>
            </div>


        </>
    )

}

export default BarCharts;
