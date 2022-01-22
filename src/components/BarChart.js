import {Bar} from "react-chartjs-2";
import plugin from "chartjs-plugin-datalabels";


const BarChart = ({data,options,plugins}) => {

    return (
        <div className="chart">
            <Bar plugins={plugins} options={options} data={data}/>
        </div>
    );

}

export default BarChart;