import '../styles/choices.css';
import '../styles/credentials.css';

function Credentials(props) {

    let { title, endPoint, error } = props;
    
    return (
        <div className="Credentials">
            <form action={`/${endPoint}`} method="post" onSubmit={submit}>
                <div className="formTitle">{title}</div>

                <div className="credential">
                    <label for="username">Username</label>
                    <input className="field" type="text" id="username" name="username" required/>
                </div>
                
                <div className="credential">
                    <label for="password">Password </label>
                    <input className="field" type="password" id="password" name="password" required/>
                </div>
                <div className="feedback">{error}</div>
                <input className="option" type="submit" value="Submit"/>
            </form>
        </div>
    );
}

function submit(event) {
    event.preventDefault();
    alert("test!");
}

export default Credentials;