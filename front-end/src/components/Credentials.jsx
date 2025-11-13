import { useNavigate } from 'react-router-dom';

import '../styles/choices.css';
import '../styles/credentials.css';

function Credentials(props) {

    const navigate = useNavigate();

    let { title, endPoint, errorMessage, setErrorMessage } = props;

    const submitData = (event) => {
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
        const apiURL = '/api/users'; // !!! replace with actual url endpoint for deployment
        let requestType = titleElement.innerHTML;

        if (requestType == "Sign Up") {
            signUp(apiURL, userJSON, navigate, setErrorMessage);
        }

        if (requestType == "Log In") {
            logIn(apiURL, userJSON, navigate, setErrorMessage);
        }

        if (requestType == "Save Game") {
            updateUser(apiURL, userJSON);
        }

        if (requestType == "Delete Account") {
            deleteUser(apiURL, userJSON, setErrorMessage);
        }

    }

    
    if (title == "empty") { return; }
    
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
                <div className="feedback">{errorMessage}</div>
                <input className="option" type="submit" value="Submit"/>
            </form>
        </div>
    );
}

function signUp(apiURL, userJSON, navigate, setErrorMessage) {
    fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: userJSON,
    })
    
    .then(response => response.json()) // Parse the JSON response
    
    .then(data => {
        if ("error" in data) {
            setErrorMessage(data.message);
        } else {
            // LOAD DATA
            navigate('/play');
        }
    }) // Handle the parsed data
    
    .catch(error => console.error('Error:', error)); // Handle any errors
}

function logIn(apiURL, userJSON, navigate, setErrorMessage) {

    let user = JSON.parse(userJSON);

    apiURL += `/${user.name}`;

    fetch(apiURL, {
        method: 'GET',
        headers: {
            'Authorization': user.password,
            'Content-Type': 'application/json',
        }
    })
    
    .then(response => response.json()) // Parse the JSON response
    
    .then(data => {
        if ("error" in data) {
            setErrorMessage(data.message);
        } else {
            // LOAD DATA
            navigate('/play');
        }
    }) // Handle the parsed data
    
    .catch(error => console.error('Error:', error)); // Handle any errors

}

// Used within main gameplay loop, not here!
function updateUser(apiURL, userJSON) {

    let user = JSON.parse(userJSON);
    apiURL += `/${user.name}`;

    fetch(apiURL, {
        method: 'PUT',
        headers: {
            'Authorization': user.password,
            'Content-Type': 'application/json',
        },
        body: userJSON,
    })

    .then(response => response.json()) // Parse the JSON response
    
    .then(data => {
        console.log(data); // !!! is any response needed?
    }) // Handle the parsed data
    
    .catch(error => console.error('Error:', error)); // Handle any errors
}

function deleteUser(apiURL, userJSON, setErrorMessage) {

    let user = JSON.parse(userJSON);

    apiURL += `/${user.name}`;

    fetch(apiURL, {
        method: 'DELETE',
        headers: {
            'Authorization': user.password,
            'Content-Type': 'application/json',
        }
    })
    
    .then(response => response.json()) // Parse the JSON response
    
    .then(data => {
        if ("error" in data) {
            setErrorMessage(data.message);
        }
    }) // Handle the parsed data
    
    .catch(error => console.error(error)); // Handle any errors

}

export default Credentials;