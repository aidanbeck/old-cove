import { Link } from "react-router-dom";
import '../styles/title-screen.css';

function Title () {
    return (
        <div id="titleScreen">
            <div id="titleElements">
                <div id="titleName">Old Cove</div>
                <Link id="titleBegin" to='/play'>Begin The Story</Link><br/>
                <Link id="titleAbout" to='/about'>About The Project</Link>
            </div> 
        </div>
    )
}

export default Title;