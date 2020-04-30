import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const Callback = (props) => {
    const params = useParams();
    const { push } = useHistory();

    useEffect(() => {
        const token = params.token
        if(!token){
           push('/login') 
        } else {
           localStorage.setItem('token', JSON.stringify(token))
           push('/music')
        }
    }, [params.token])

    return (
        <div></div>
    )
}

export default Callback;