import { Link } from "react-router-dom";
import { wipeSave } from "./Game.jsx";
import Credentials from "./Credentials.jsx";
import '../styles/title-screen.css';

function Title () {
    let saveExists = localStorage.getItem("auto-save") !== null;
    return (

        <div id="titleScreen">
            <div id="titleElements">
                <div id="titleName">Old Cove</div>
                <Link id="titleBegin" to='/play' onClick={wipeSave}>Begin The Story</Link><br/>
                {saveExists && <span><Link id="titleContinue" to='/play'>Continue The Adventure</Link><br/></span>}
                <Link id="titleAbout" to='/about'>About The Project</Link>
                <Credentials title="Log In" endPoint="user" error="No Error!"/>
            </div> 
        </div>
    )
}

export default Title;