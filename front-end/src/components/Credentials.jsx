import '../styles/choices.css';
import '../styles/credentials.css';

function Credentials(props) {
    
    return (
        <div className="Credentials">
            <form action="/user" method="post">
                <div className="formTitle">Sign Up</div>

                <div className="credential">
                    <label for="username">Username</label>
                    <input className="field" type="text" id="username" name="username"/>
                </div>
                
                <div className="credential">
                    <label for="password">Password </label>
                    <input className="field" type="password" id="password" name="password"/>
                </div>
                <div className="feedback">This is an Error!</div>
                <input className="option" type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default Credentials;