import {Bar, Pie} from "react-chartjs-2";
import {RESPONSE_TIME} from "../Constants";



const BarChart = ({data, options, plugins, location}) => {

    return (
        <div className="chart">
            {!location.includes(RESPONSE_TIME) ? <Bar plugins={plugins} options={options} data={data}/>

                : <Pie plugins={plugins} options={options} data={data}/>}
            }
        </div>
    );

}

export default BarChart;