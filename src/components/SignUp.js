import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';
import icon from '../assests/images/favicon-32x32.png';

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding:40px;
    margin:40px auto;
    border-radius:4px;
    max-width:100%;
`
const StyledInput = styled.input`
    padding: 8px 0;
    margin: 2px auto;
    width:80%;
    font-size: 20px;
    border: 2px solid #;
    border-radius: 15px;
    max-width:100%;
`
const StyledCheckbox = styled.input`
    vertical-align: bottom;
    transition-duration: 0.3s;
    cursor: pointer;
`

const StyledLabel = styled.label`
    margin-top: 5px;
    font-size: 15px;
`

const StyledInputError = styled.p`
    color: red;
    margin: 0 auto 5px;
    text-align: left;
    width:80%;
`
const StyledCheckboxError = styled.p`
    color: red;
    margin: 0 auto 5px;
    text-align: left;
    font-size: 13px;
`

const StyledSubmitError = styled.p`
    color: red;
    margin: 0 0 4px;
`
const StyledButton = styled.button`
    width: 200px;
    padding:15px 45px;
    margin: 5px auto 0;
    border-radius:500px;
    background-color:#1DB954;
    color:#FFFFFF;
    font-size: 18px;
    transition: all 0.3s ease-in-out;
    &:hover {
        background-color: #1ed760;
        transition: all 0.3s ease-in-out;
    }
`


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
            <StyledForm className="form">

                <h3>Just checking? No problem<span role="img" aria-label="face with hearts">🥰</span></h3>
                <h4>{signupStatus}</h4>

                {/* Username */}
                <StyledInput className="input" type="text" name='name' value={formValues.name} onChange={onInputChange} placeholder="What should we call you?"></StyledInput>
                <StyledInputError>{formErrors.name}</StyledInputError>

                {/* Email */}
                <StyledInput className="input"type="text" name='email' value={formValues.email} onChange={onInputChange} placeholder="Email"></StyledInput>
                <StyledInputError>{formErrors.email}</StyledInputError>

                {/* Password */}
                <StyledInput className="input" type="password" name='password' value={formValues.password} onChange={onInputChange} placeholder="Enter Password"></StyledInput>
                <StyledInputError>{formErrors.password}</StyledInputError>

                {/* Accept Term */}
                <StyledLabel>I agree to the terms of service and privacy policy <span style={{color: 'red'}}>(required)</span>
                    <StyledCheckbox type="checkbox" name='term' checked={formValues.term} onChange={onCheckboxChange}></StyledCheckbox>
                </StyledLabel>
                <StyledCheckboxError>{formErrors.term}</StyledCheckboxError>

                {/* Submit */}
                <StyledButton name="register" onClick={onRegister}>Sign Up&nbsp;<img className="icon" src={icon} alt="spotify song 5 icon"/></StyledButton>
                <StyledSubmitError>{submitError}</StyledSubmitError>
            </StyledForm>
        </div>
    )

}

export default SignUp;