import '../App.css';
import PieChart from "./PieChart";
import {ArcElement, CategoryScale, Chart, LinearScale} from 'chart.js'
import {useEffect, useState} from "react";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {sm_colors} from "../utils";


// Drawing all the charts
function PieCharts({group_length, data, location}) {

//grouping the data by groups of group_length
    const [by_groups_labels, setLabels_by_groups] = useState([]);
    const [by_groups_dataset, set_dataset_by_groups] = useState([]);


// use effect to group the data by groups of group_length
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
        //set the data
        setLabels_by_groups(labels_by_groups);
        set_dataset_by_groups(dataset_by_groups);


    }, [data, group_length]);
// Register the plugin to all charts:
    Chart.register(ChartDataLabels);

    Chart.register(ArcElement);
    Chart.register(LinearScale)
    Chart.register(CategoryScale)
    Chart.defaults.font.family = ['"Font Awesome 5 Brands"', '"Font Awesome 5 Pro"'];
    Chart.defaults.font.size = 30;
    Chart.defaults.font.weight = "bold";
    Chart.defaults.color = "white";


    const groupCharts = (element, index) => {

        return (<div key={index}
                     className="row">{by_groups_dataset[index].map((element_one, index_one) =>


            (
                <div key={index + "_" + index_one} className="col-md pt-5 bg-dark text-light">

                    <PieChart location={location}

                              options={{
                                  // responsive: false,
                                  scales: {

                                      y: {display: false,
                                          ticks: {
                                              font: {
                                                  size: 12,
                                              }
                                          },
                                          grid: {borderWidth: 5, borderColor: "white"},


                                      }
                                      , x: {
                                          grid: {borderWidth: 0, borderColor: "white"},

                                          ticks: {



                                              // Include a dollar sign in the ticks
                                              callback: function (value, index, values) {
if(index===0)
                                            return "    Company name";


                                              }
                                          }
                                      }

                                  },
                                  plugins: {
                                      title: {
                                          display: true,
                                          text: by_groups_labels[index][index_one],
                                          position: 'top',
                                          color: "white",
                                      }
                                      ,
                                      datalabels: {

                                          display: true,
                                          color: "white",
                                          formatter: function (value) {


                                              return "S " + value + (location.includes("percentage") ? "%" : "") + "\n";


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
                                          id: index + "_" + index_one,

                                          data: Object.values(by_groups_dataset[index][index_one]),
                                          backgroundColor: [sm_colors['facebook'], sm_colors['instagram'], sm_colors['twitter']],
                                      },


                                  ],


                              }}/>

                </div>)
        )}</div>)
    }
    let pieCharts = by_groups_labels.map((element, index) => groupCharts(element, index))


    return (

        <>


            {pieCharts}


        </>
    )

}

export default PieCharts;
