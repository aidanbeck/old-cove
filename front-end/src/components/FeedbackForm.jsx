import { useState } from 'react';

function FeedbackForm() {

    const [formData, setFormData] = useState(
        {name:"", email:"", feedback:"" }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData( (prevData) => ({...prevData, [name]: value }) );
    }

    return (
        <div id="feedbackForm">
            <label>Name:
                <input type="text" name="name" onChange={handleChange}></input>
            </label><br/>
            <label>Email:
                <input type="email" name="email" onChange={handleChange}></input>
            </label><br/>
            <label>Feedback:
                <textarea name="feedback" maxLength="200" onChange={handleChange}></textarea>
            </label><br/>
            <span>{formData.feedback.length}/200 characters.</span>

            <p>
                <u>Preview</u><br/>
                Name: {formData.name}<br/>
                Email: {formData.email}<br/>
                Feedback: {formData.feedback}<br/>
            </p>
        </div>
    );
}

export default FeedbackForm;