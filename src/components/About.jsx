import { Outlet, Link } from "react-router-dom";
import '../styles/title-screen.css';
import '../styles/about.css';

import image1 from '../assets/the_much_resounding_sea_1967.9.1.jpg';
import image2 from '../assets/calm_sea_cropped.jpg';
import image3 from '../assets/beach_at_beverly_1978.6.5.jpg';

function Title () {
    return (
        <div id="aboutScreen">
            <h1><Link id="backToTitle" to='/'>Back To Title Screen</Link></h1>

            <p>
                <h2>About Old Cove</h2>
                Text describing primary features of old cove.
            </p>

            <ul>
                <li>Primary feature of Old Cove.</li>
                <li>Another primary feature.</li>
                <li>Yet another.</li>
            </ul>

            <table>
                <caption>Painting Credits</caption>
                <tbody>
                    <tr>
                        <td class="painting"><img src={image1}/></td>
                        <td><strong>The Much Resounding Sea</strong><br/><em>Thomas Moran</em> 1884</td>

                    </tr>
                    <tr>
                        <td class="painting"><img src={image2} id="calmSea"/></td>
                        <td><strong>Calm Sea</strong><br/><em>Gustave Courbet</em><br/>1866</td>
                    </tr>
                    <tr>
                        <td class="painting"><img src={image3}/></td>
                        <td><strong>Beach at Beverly</strong><br/><em>John Frederick Kensett</em><br/>Between 1869 and 1872</td>
                    </tr>
                </tbody>
                
            </table>

            <footer></footer>
        </div>
    )
}

export default Title;