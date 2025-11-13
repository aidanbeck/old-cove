import { Link } from "react-router-dom";
import { wipeSave } from "./Game.jsx";
import { useState } from "react";
import Credentials from "./Credentials.jsx";
import '../styles/title-screen.css';

function Title () {
    let saveExists = localStorage.getItem("auto-save") !== null;

    const [formTitle, setFormTitle] = useState("empty");

    return (

        <div id="titleScreen">
            <div id="titleElements">
                <div id="titleName">Old Cove</div>
                
                <Link className="titleOption" to='' onClick={() => setFormTitle("Sign Up")}>Sign Up</Link><br/>
                <Link className="titleOption" to='' onClick={() => setFormTitle("Log In")}>Log In</Link><br/>
                <Link className="titleOption" to='' onClick={() => setFormTitle("Delete Account")}>Delete Account</Link><br/>
                <Link className="titleOption" to='/about'>About The Project</Link><br/>

                <Credentials title={formTitle} endPoint="user" error="No Error!"/>
            </div> 
        </div>
    )
}

export default Title;