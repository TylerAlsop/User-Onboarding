import React, {useState, useEffect } from 'react';
import { Form, Field, withFomrik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const NewUserForm = ({ errors, touched, values, status }) => {
    const [userInfo, setUserInfo] = useState ([]);

    useEffect (() => {
        status && setUserInfo (userInfo => [...userInfo, status]);
    }, [status])

    return (
        <div className="new-user-form">
            <Form>
                <h1>New User Form</h1>

                <Field 
                    type="text"
                    name="name"
                    placeholer="Name"
                    value={values.name}
                />
                {touched.name && errors.name && <p>{errors.name}</p>}

                <Field 
                    type="text"
                    name="email"
                    placeholer="E-mail"
                    value={values.email}
                />
                {touched.email && errors.email && <p>{errors.email}</p>}

                <Field 
                    type="text"
                    name="password"
                    placeholer="Password"
                    value={values.password}
                />
                {touched.password && errors.password && <p>{errors.password}</p>}

                <label>
                <Field 
                    type="checkbox"
                    name="terms-of-service"
                    value={values.checkbox}
                />
                </label>

                <button type="submit">Submit</button>

            </Form>

            {userInfo.map(user => (
                <ul>
                    <li>Name: {user.name}</li>
                    <li>E-mail: {user.email}</li>
                    <li>Password: {user.password}</li>
                </ul>
            ))}
        </div>
    );

};

export default NewUserForm;

// Name
//  Email
//  Password
//  Terms of Service (checkbox)
//  A Submit button to send our form data to the server.