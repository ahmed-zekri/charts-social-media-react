import './App.css';

import {useEffect} from "react";
import BarCharts from "./components/BarCharts";
import Header from "./components/Header";



function App() {

    return (
        <div className="bg-dark text-light">
            <Header title={'Engagements (Daily updated)'}/>
            <div className="App">
                <BarCharts/>

            </div>
        </div>
    );
}

export default App;
