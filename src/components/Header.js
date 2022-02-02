import ErrorDataAlert from "./ErrorDataAlert";
import {ThreeDots} from "react-loader-spinner";
import {RESPONSE_TIME} from "../Constants";

const Header = ({title, dataError, hideAlert, groupLength, setGroupLength, data, location}) => {

    return (
        <>
            <div className="row">
                <div className="col-md text-center font-weight-bold display-4 p-2 pb-3">

                    {title}


                </div>
            </div>
            <ErrorDataAlert show={dataError} hideAlert={hideAlert}/>
            {/*// Show the loading spinner*/}
            <div className="row mb-2 justify-content-center">
                <div className="col-md-3">
                    {!location.includes(RESPONSE_TIME) && <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Groups length</label>
                        <input min="1" type="number" className="form-control" aria-describedby="Groups length"

                               onKeyPress={(e) => e.preventDefault()}
                               placeholder="Enter Groups length" value={groupLength}
                               onChange={(e) => {

                                   if (e.target.value !== '' && !Number.isNaN(parseInt(e.target.value) && parseInt(e.target.value) >= 1))

                                       setGroupLength(parseInt(e.target.value))
                               }}/>


                    </div>}
                </div>
            </div>
            <div className={`${Object.keys(data).length === 0 ? 'loading' : 'loading bg-dark text-light'}`}>
                <ThreeDots visible={Object.keys(data).length === 0}/></div>

        </>)
}

export default Header;