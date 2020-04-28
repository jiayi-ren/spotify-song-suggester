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

    /////////////get Spotify User/////////
    // const getUser = () =>{
    //     axios.get("https://spotify-song-api.herokuapp.com/api/auth/spotify", { withCredentials: true })
    //         .then(res => {
                
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }

    // const postUser = user =>{
    //     axios.post("https://spotify-song-api.herokuapp.com/api/auth/spotify", { withCredentials: true }, user)
    //         .then(res =>{

    //         })
    //         .catch(err =>{
    //             console.log(err)
    //         })
    // }

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

    const onSuccess = response => console.log(response);
    const onFailure = response => console.error(response);
    const clientId = '5857f6d2c6bd497b89d485dd096265ab';
    const redirectUri = 'http://localhost:3000/callback'

    return (
        <div>
            <form className="form">
                <label >
                    <input className="input" type="text" name='username' value={formValues.username} onChange={onInputChange} placeholder="What should we call you?"></input>
                </label>
                {/* <p>{errors.username}</p> */}
                <label>
                    <input className="input"type="text" name='email' value={formValues.email} onChange={onInputChange} placeholder="Email"></input>
                </label>
                {/* <p>{errors.email}</p> */}
                <label>Password:
                    <input className="input" type="text" name='password' value={formValues.password} onChange={onInputChange} placeholder="Enter Password"></input>
                </label>
                <label>Date of Birth
                    <select>

                    </select>
                </label>
                {/* <p>{errors.password}</p> */}
                <label>I agree to the terms of service and privacy policy
                    <input type="checkbox" name='term' checked={formValues.term} onChange={onCheckboxChange}></input>
                </label>
                {/* <p>{errors.term}</p> */}
                <button name="register" onClick={onRegister}>Register</button>
            </form>
            <div>
                
            </div>
        </div>
    )

}

export default SignUp;