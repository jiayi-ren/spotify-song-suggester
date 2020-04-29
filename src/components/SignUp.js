import React, {useState, useEffect} from 'react';
import * as yup from 'yup';

const initFormValues = {
    username: '',
    email: '',
    password: '',
    term: false
}

const initFormErrors = {
    username: "",
    email: "",
    password: "",
    term: "",
}

const formSchema = yup.object().shape({
    username:yup
        .string()
        .required('Username is required')
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
    const [users, setUsers] = useState([])

    ///////TO DO: Post user to database////

    //////////////////////////////////////

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
            console.log(invalid)
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
            console.log(invalid)
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

    const onRegister = event =>{
        event.preventDefault()

        if(formValues.username ===''|| formValues.email===''|| formValues.password===''|| formValues.term === false){
            setSubmitErrors(submitErrorMsg)
        }else{
            const newUser = {
                username: formValues.username,
                email: formValues.email,
                password: formValues.password
            }
    
            setUsers([
                ...users,
                newUser
            ])
            
            /// To Do:postUser
            setFormValues(initFormValues)
        }
    }

    useEffect(()=>{
        setSubmitErrors("")
    }, [formValues])

    return (
        <div className="sign-up">
            <h3>Just checking? No problem<span role="img" aria-label="face with hearts">🥰</span></h3>
            <form className="form">
            
                {/* Username */}
                <label >
                    <input className="input" type="text" name='username' value={formValues.username} onChange={onInputChange} placeholder="What should we call you?"></input>
                </label>
                <p>{formErrors.username}</p>

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