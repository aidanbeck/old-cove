import '../styles/choices.css';
import '../styles/credentials.css';

function Credentials(props) {

    let { title, endPoint, error } = props;
    
    return (
        <div className="Credentials">
            <form action={`/${endPoint}`} method="post" onSubmit={submitData}>
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

function submitData(event) {
    event.preventDefault();

    let formElement = event.target;
    let titleElement = formElement.querySelector(`.formTitle`);
    let usernameElement = formElement.querySelector(`input[name="username"]`);
    let passwordElement = formElement.querySelector(`input[name="password"]`);
    
    let userData = {
        name: usernameElement.value,
        password: passwordElement.value
    }

    let userJSON = JSON.stringify(userData);
    const apiURL = '/api/user'; // !!! replace with actual url endpoint for deployment
    let requestType = titleElement.innerHTML;

    if (requestType == "Sign Up") {
        signUp(apiURL, userJSON);
    }

    if (requestType == "Log In") {
        logIn(apiURL, userJSON);
    }

    if (requestType == "Delete User") {
        deleteUser(apiURL, userJSON);
    }


}

function signUp(apiURL, userJSON) {
    fetch(apiURL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: userJSON,
    })
    
    .then(response => response.json()) // Parse the JSON response
    
    .then(data => {
        console.log(data);
    }) // Handle the parsed data
    
    .catch(error => console.error('Error:', error)); // Handle any errors
}

function logIn(apiURL, userJSON) {
    // This needs to work differently on the API end of things.
    // It needs to use authentication.
    // It need to grab users by their name and password, not id.
    // I will make a temporary mockup for this.
}

function deleteUser(apiURL, userJSON) {
    // This is for debug purposes.
    // If this exists, it will be as an admin panel.
    
    let userID = JSON.parse(userJSON).name; // input username as id;
    apiURL += `/${userID}`;

    fetch(apiURL, { method: 'DELETE' })
    
    .then(response => response.json()) // Parse the JSON response
    
    .then(data => {
        console.log(data);
    }) // Handle the parsed data
    
    .catch(error => console.error('Error:', error)); // Handle any errors
}

export default Credentials;