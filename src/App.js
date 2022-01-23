import './App.css';

import BarCharts from "./components/BarCharts";
import Header from "./components/Header";
import {useEffect, useState} from "react";
import {URL} from "./Constants";
import {useLocation} from 'react-router-dom';
import ErrorDataAlert from "./components/ErrorDataAlert";


function App() {
    // Get the location from the URL
    const location = useLocation();
    // Get error from the URL
    const [dataError, setDataError] = useState(false);
    // Get the length of each group
    const [groupLength, setGroupLength] = useState(2);
    // Get the data from the URL
    const [data, setData] = useState({});
    //Fetch the data from the URL
    const fetchData = async () => {

        const response = await fetch(URL + location.pathname);
        try {
            return await response.json();
        } catch (e) {
            //detect if the data is not JSON
            setDataError(true);
            return {}
        }

    };
    useEffect(() => {
        fetchData().then(data => {
            // Set the data
            setData(data);
        });


    }, [])
    const title = (path) => {
// handle the title of the page
        switch (path) {
            case '/engagement':
                return 'Engagements (Daily updated)';
            default:
                return '404 Not Found'
        }
    }
    const hideAlert = () => {
        // hide the alert
        setDataError(false);
    }
    return (

        <div className="bg-dark text-light">
            <Header title={title(location.pathname)}/>

            <div className="App">
                <ErrorDataAlert show={dataError} hideAlert={hideAlert}/>
                <div className="row mb-2 justify-content-center" hidden={location.pathname !== '/engagement'}>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Groups length</label>
                            <input min="1" type="number" className="form-control" aria-describedby="Groups length"

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
