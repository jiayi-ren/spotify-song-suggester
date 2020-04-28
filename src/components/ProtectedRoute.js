import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from "axios";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        axios
          .get("https://spotify-song-api.herokuapp.com/api/spotify/search")
          .then(response => {
            if (response.data = 200){
              return <Component {...props} />
            }
            else {
              return <Redirect to="/" />
            }
          })
          .catch(err => {
            console.log({ err },"there was an error with the ProtectedRoute")
          })
      }}
    />
  );
};
export default ProtectedRoute;