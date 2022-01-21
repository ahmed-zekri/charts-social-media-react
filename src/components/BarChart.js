import {Bar} from "react-chartjs-2";


const BarChart = ({data}) => {

    return (
        <div className="chart">
            <Bar data={data}/>
        </div>
    );

}

export default BarChart;