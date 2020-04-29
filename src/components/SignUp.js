import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import axios from 'axios';

const initFormValues = {
    name: '',
    email: '',
    password: '',
    term: false
}

const initFormErrors = {
    name: "",
    email: "",
    password: "",
    term: "",
}

const formSchema = yup.object().shape({
    name:yup
        .string()
        .required('Name is required')
        .min(2, 'Name must have at least 3 characters!'),
    email: yup
        .string()
        .required('Email is required')
        .email('a VALID email is required'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must have at least 8 characters!'),
    term: yup
        .boolean()
        .required('Please read and accept the terms of service and privacy policy')
        .oneOf([true], "Please read and accept the terms of service and privacy policy"),
})

const submitErrorMsg = 'Oops, looks like something is missing.'

const SignUp = props =>{

    const [formValues, setFormValues] = useState(initFormValues)
    const [formErrors, setFormErrors] = useState(initFormErrors)
    const [submitError, setSubmitErrors] = useState("")
    const [signupStatus, setSignupStatus] = useState("")
    const [users, setUsers] = useState([])

    /////// Post user to database////
    const postUser = user =>{
        axios.post('https://spotify-song-api.herokuapp.com/api/auth/register', user)
            .then(res =>{
                setSignupStatus("Congrats! You're in, Have fun with our app!")
               
            })
            .catch(err =>{
                console.log(err)
                setSignupStatus("Oh no, this email has been registered already. Try another one!")
            })
    }
    //////////////////////////////////////

    ///////Form Input Handler////////////
    const onInputChange = event =>{
        const name = event.target.name
        const value = event.target.value

        //Form Validation
        yup
        .reach(formSchema, name)
        .validate(value)
        .then(valid =>{
            setFormErrors({
                ...formErrors,
                [name]: "",
            })
        })
        .catch(invalid =>{
            console.log(invalid.message)
            setFormErrors({
                ...formErrors,
                [name]: invalid.message
            })
        })

        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    //////Form Checkbox Change Handler/////
    const onCheckboxChange = event =>{
        const name = event.target.name
        const isChecked = event.target.checked

        yup
        .reach(formSchema, name)
        .validate(isChecked)
        .then(valid =>{
            setFormErrors({
                ...formErrors,
                [name]: "",
            })
        })
        .catch(invalid =>{
            console.log(invalid.message)
            setFormErrors({
                ...formErrors,
                [name]: invalid.message
            })
        })

        setFormValues({
            ...formValues,
            [name]: isChecked
        })
    }

    //////Form Submit Handler/////////////
    const onRegister = event =>{
        event.preventDefault()

        if(formValues.name ===''|| formValues.email===''|| formValues.password===''|| formValues.term === false){
            setSubmitErrors(submitErrorMsg)
        }else{
            const newUser = {
                name: formValues.name,
                email: formValues.email,
                password: formValues.password
            }
    
            setUsers([
                ...users,
                newUser
            ])
            
            postUser(newUser)
            setFormValues(initFormValues)
        }
    }

    ///////Display submit error when required is missing//////
    useEffect(()=>{
        setSubmitErrors("")
    }, [formValues])

    return (
        <div className="sign-up">
            <h3>Just checking? No problem<span role="img" aria-label="face with hearts">🥰</span></h3>
            <h4>{signupStatus}</h4>
            <form className="form">
            
                {/* Username */}
                <label >
                    <input className="input" type="text" name='name' value={formValues.name} onChange={onInputChange} placeholder="What should we call you?"></input>
                </label>
                <p>{formErrors.name}</p>

                {/* Email */}
                <label>
                    <input className="input"type="text" name='email' value={formValues.email} onChange={onInputChange} placeholder="Email"></input>
                </label>
                <p>{formErrors.email}</p>

                {/* Password */}
                <label>
                    <input className="input" type="text" name='password' value={formValues.password} onChange={onInputChange} placeholder="Enter Password"></input>
                </label>
                <p>{formErrors.password}</p>

                {/* Accept Term */}
                <label>I agree to the terms of service and privacy policy <span style={{color: 'red'}}>(required)</span>
                    <input type="checkbox" name='term' checked={formValues.term} onChange={onCheckboxChange}></input>
                </label>
                <p>{formErrors.term}</p>

                {/* Submit */}
                <button name="register" onClick={onRegister}>Try it out!</button>
                <p>{submitError}</p>
            </form>
            <div>
                
            </div>
        </div>
    )

}

export default SignUp;