import './App.css';

import BarCharts from "./components/BarCharts";
import Header from "./components/Header";
import {useEffect, useState} from "react";
import {URL} from "./Constants";


function App() {
    const [groupLength, setGroupLength] = useState(2);
    const [data, setData] = useState({});
    const fetchData = async () => {
        const response = await fetch(URL + '/engagement');

        return await response.json();
    };
    useEffect(() => {
        fetchData().then(data => {
            setData(data);
        });


    }, [])
    return (
        <div className="bg-dark text-light">
            <Header title={'Engagements (Daily updated)'}/>

            <div className="App">
                <div className="row justify-content-center">
                    <div className="col-md-3">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Groups length</label>
                            <input min="1" type="number" className="form-control" aria-describedby="Groups length"
                                   defaultValue="3"
                                   onKeyPress={(e) => e.preventDefault()}
                                   placeholder="Enter Groups length" value={groupLength}
                                   onChange={(e) => {

                                       if (e.target.value !== '' && !Number.isNaN(parseInt(e.target.value) && parseInt(e.target.value) >= 1))

                                           setGroupLength(parseInt(e.target.value))
                                   }}/>


                        </div>
                    </div>
                </div>
                <BarCharts data={data} group_length={groupLength}/>

            </div>
        </div>
    );
}


export default App;
