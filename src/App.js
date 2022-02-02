import './App.css';

import PieCharts from "./components/PieCharts";
import Header from "./components/Header";
import {useEffect, useState} from "react";
import {
    ENGAGEMENT,
    FOLLOWERS,
    FOLLOWERS_PERCENTAGE_24,
    FOLLOWERS_PERCENTAGE_28,
    RESPONSE_TIME,
    TEST_SUFFIX,
    TEST_URL,
    URL
} from "./Constants";
import {useLocation} from 'react-router-dom';
import BarCharts from "./components/BarCharts";


function App() {

    // Get the location from the URL
    const location = useLocation();
    // Get error from the URL
    const [dataError, setDataError] = useState(false);
    // Get the length of each group
    const [groupLength, setGroupLength] = useState(3);
    // Get the data from the URL
    const [data, setData] = useState({});
    //Fetch the data from the URL
    const fetchData = async () => {
        let usedUrl = (!location.pathname.includes(TEST_SUFFIX) ? URL : TEST_URL) + location.pathname.replace(TEST_SUFFIX, "")

        const response = await fetch(usedUrl);
        try {

            let jsonData = await response.json()

            return await jsonData;
        } catch (e) {
            alert(e)
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
            case ENGAGEMENT:
            case ENGAGEMENT + TEST_SUFFIX:
                return 'Engagements (Daily updated)';
            case FOLLOWERS:
            case FOLLOWERS + TEST_SUFFIX:
                return 'Followers (Daily updated)';
            case FOLLOWERS_PERCENTAGE_24:
            case FOLLOWERS_PERCENTAGE_24 + TEST_SUFFIX:
                return 'Followers percentage last 24 hours (Daily updated)';
            case FOLLOWERS_PERCENTAGE_28:
            case FOLLOWERS_PERCENTAGE_28 + TEST_SUFFIX:
                return 'Followers percentage last 28 days (Daily updated)';
            case RESPONSE_TIME:
            case RESPONSE_TIME + TEST_SUFFIX:
                return 'Response time (Daily updated)';

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
            <Header title={title(location.pathname)} data={data} hideAlert={hideAlert} dataError={dataError}
                    groupLength={groupLength} setGroupLength={setGroupLength} location={location.pathname}/>

            <div className="App">


                {/*// Show the bar charts*/}

                {location.pathname.includes(RESPONSE_TIME)?
                    <PieCharts data={data} group_length={groupLength} location={location.pathname}/>
                    :
                    <BarCharts data={data} group_length={groupLength} location={location.pathname}/>
                }

            </div>

        </div>
    );
}


export default App;
