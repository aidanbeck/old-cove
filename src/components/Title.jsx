import { Outlet, Link } from "react-router-dom";

function Title () {
    return (
        <>
            <h1>Old Cove</h1>
            <Link to='/play'>Begin</Link>
        </> 
    )
}

export default Title;