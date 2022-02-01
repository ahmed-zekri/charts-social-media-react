import '../App.css';
import BarChart from "./BarChart";
import {ArcElement, Chart} from 'chart.js'
import {useEffect, useState} from "react";
import {ThreeDots} from "react-loader-spinner";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import sm_unicode from "../utils";


// Drawing all the charts
function BarCharts({group_length, data, location}) {

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
    Chart.defaults.font.family = ['"Font Awesome 5 Brands"', '"Font Awesome 5 Pro"'];
    Chart.defaults.font.size = 30;
    Chart.defaults.font.weight = "bold";
    Chart.defaults.color = "white";


    const groupCharts = (element, index) => {

        return (<div key={index}
                     className="row">{by_groups_dataset[index].map((element_one, index_one) =>


            (
                <div key={index + "_" + index_one} className="col-md mt-5 p-5 bg-dark text-light">

                    <BarChart location={location}

                              options={{

                                  plugins: {
                                      title: {
                                          display: true,
                                          text: Object.values(by_groups_labels[index])[index_one]
                                      },
                                      datalabels: {

                                          display: true,
                                          color: "white",
                                          formatter: function (value, context) {
                                              let code = sm_unicode[context.dataset.label.toLowerCase()]


                                              return "S " + value + (location.includes("percentage") ? "%" : "") + "\n" + String.fromCharCode(parseInt(code, 16));


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

                                      data: Object.values(by_groups_dataset[index][index_one]),
                                      backgroundColor: ['blue', 'red', 'green'],
                                  },


                              ],


                          }}/>

                </div>)
        )}</div>)
    }
    let pieCharts = by_groups_labels.map((element, index) => groupCharts(element, index))


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
