import { Outlet, Link } from "react-router-dom";
import FeedbackForm from "./FeedbackForm";
import image1 from '../assets/the_much_resounding_sea_1967.9.1.jpg';
import image2 from '../assets/calm_sea_cropped.jpg';
import image3 from '../assets/beach_at_beverly_1978.6.5.jpg';
import '../styles/title-screen.css';
import '../styles/about.css';

function Title () {
    return (
        <div id="aboutScreen">
            <header>
                <h2>About</h2>
                <nav>
                    <Link id="back" to='/'>Return</Link>
                </nav>
            </header>
            <main>
                <section>
                    <h2>Old Cove</h2>
                    <p>This project has been created by Aidan Beck for the LaunchCode 2025 Online Cohort.</p>
                    <p>Old Cove is a text based adventure game. It attempts to showcase an interesting world and allow the user to have an impact on it.</p>

                    <br/>
                </section>
                <br/><br/>
                <section>
                    <h2>Features I'd Like To Add</h2>
                    <p>There are a lot of features I would still like to implement in the future. Here are the main ones.</p>
                    <ul>
                        <li>A fleshed out, thematically notable storyline.</li>
                        <li>An ending to the game, or multiple endings.</li>
                        <li>More background images that change depending on the area.</li>
                        <li>An option to load in your own level file to enable custom experiences.</li>
                        <li>A built in level builder.</li>
                    </ul>
                    <br/>
                </section>
                <br/><br/>
                <section>
                    <h2>Feedback</h2>
                    <p>If you have a bug to report, a feature you'd like to suggest, or any thoughts on the game - I'd love to hear about them. <br/><em>Note: This form is currently not functional.</em></p>
                    <FeedbackForm/>
                    <br/>
                </section>
                <br/><br/>
                <section id="projects">
                    <h2>Painting Credits</h2>
                    <br/>
                    <table>
                        <tbody>
                            <tr>
                                <td className="painting"><a href="https://www.nga.gov/artworks/50729-much-resounding-sea"><img src={image1} alt="a painting of the ocean waves. A small patch of sand represents the beach in the bottom left corner. This painting was used on the main menu, where it animated from left to right giving the illusion of moving waves."/></a></td>
                                <td><strong>The Much Resounding Sea</strong><br/><em>Thomas Moran</em> 1884</td>

                            </tr>
                            <tr>
                                <td className="painting"><a href="https://www.nga.gov/artworks/66408-calm-sea"><img src={image2} alt="a painting of a still ocean. The beach is visible as a small strip of sand along the bottom, and the water extends to the horizon. The piece is mostly dominated by a sky, grey but not gloomy. This piece was blurred out and used for the background of the interactive page." id="calmSea"/></a></td>
                                <td><strong>Calm Sea</strong><br/><em>Gustave Courbet</em><br/>1866</td>
                            </tr>
                            <tr>
                                <td className="painting"><a href="https://www.nga.gov/artworks/56574-beach-beverly"><img src={image3} alt="a painting of a cove. There are large rocks and a green tree on the left side of the painting, but the ocean and sky cover the right half. This piece was blurred out and used as the background for the about page (this page)."/></a></td>
                                <td><strong>Beach at Beverly</strong><br/><em>John Frederick Kensett</em><br/>Between 1869 and 1872</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>All paintings used in this project are in the public domain. Click on an image to see its corresponding page on the National Gallery of Art.</p>
                    <br/>
                </section>
                <footer>
                    <span>&copy; 2025 Aidan Beck</span> 
                    <a href="github.com/aidanbeck">My Github</a>
                    <a href="launchcode.org">LaunchCode</a>
                    <a href="nga.gov">National Gallery of Art</a>
                </footer>
            </main>
        </div>
    )
}

export default Title;