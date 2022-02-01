import {Pie} from "react-chartjs-2";


const PieChart = ({data, options, plugins}) => {

    return (



                <Pie plugins={plugins} options={options} data={data} type={"pie"}/>


    );

}

export default PieChart;