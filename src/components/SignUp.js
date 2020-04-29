import React, {useState} from 'react';
import axios from 'axios';
import icon from '../assests/images/Spotify_Icon_RGB_Green.png'

const initFormValues = {
    username: '',
    email: '',
    password: '',
    term: false
}

const initialFormErrors = {
    name: "",
    email: "",
    password: "",
    term: ""
  }

const SignUp = props =>{

    const [formValues, setFormValues] = useState(initFormValues)
    const [users, setUsers] = useState([])

    ///////TO DO: Post user to database////

    //////////////////////////////////////

    const onInputChange = event =>{
        const name = event.target.name
        const value = event.target.value

        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const onCheckboxChange = event =>{
        const name = event.target.name
        const isChecked = event.target.checked

        setFormValues({
            ...formValues,
            [name]: isChecked
        })
    }

    const onRegister = event =>{
        event.preventDefault()
        const newUser = {
            name: formValues.name,
            email: formValues.email,
            password: formValues.password
        }

        setUsers([
            ...users,
            newUser
        ])
        setFormValues(initFormValues)
    }

    const onLogin = event =>{
        event.preventDefault()

    }

    return (
        <div>
            <form className="form">
                {/* Username */}
                <label >
                    <input className="input" type="text" name='username' value={formValues.username} onChange={onInputChange} placeholder="What should we call you?"></input>
                </label>
                {/* <p>{errors.username}</p> */}

                {/* Email */}
                <label>
                    <input className="input"type="text" name='email' value={formValues.email} onChange={onInputChange} placeholder="Email"></input>
                </label>
                {/* <p>{errors.email}</p> */}

                {/* Password */}
                <label>
                    <input className="input" type="text" name='password' value={formValues.password} onChange={onInputChange} placeholder="Enter Password"></input>
                </label>
                {/* <p>{errors.password}</p> */}

                {/* Accept Term */}
                <label>I agree to the terms of service and privacy policy
                    <input type="checkbox" name='term' checked={formValues.term} onChange={onCheckboxChange}></input>
                </label>
                {/* <p>{errors.term}</p> */}

                {/* Submit */}
                <button name="register" onClick={onRegister}>Try it out!</button>
            </form>
            <div>
                
            </div>
        </div>
    )

}

export default SignUp;