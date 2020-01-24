import React, {useState, useEffect } from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const NewUserForm = ({ errors, touched, values, status }) => {
    const [userInfo, setUserInfo] = useState ([]);

    useEffect (() => {
        status && setUserInfo (users => [...users, status]);
    }, [status])

    return (
        <div className="new-user-form">
            <Form>
                <h1>New User Form</h1>

                <p>Name:</p>
                <Field 
                    type="text"
                    name="name"
                    placeholer="Name"
                    value={values.name}
                />
                {touched.name && errors.name && <p>{errors.name}</p>}

                <p>E-mail:</p>
                <Field 
                    type="text"
                    name="email"
                    placeholer="E-mail"
                    value={values.email}
                />
                {touched.email && errors.email && <p>{errors.email}</p>}

                <p>Password:</p>
                <Field 
                    type="text"
                    name="password"
                    placeholer="Password"
                    value={values.password}
                />
                {touched.password && errors.password && <p>{errors.password}</p>}

                <label>
                    <p>Agree to Terms of Service</p>
                    <Field 
                        type="checkbox"
                        name="terms-of-service"
                        value={values.checkbox}
                    />
                </label>

                <button type="submit">Submit</button>

            </Form>

            {userInfo.map(userInfo => (
                <ul>
                    <li>Name: {userInfo.name}</li>
                    <li>E-mail: {userInfo.email}</li>
                    <li>Password: {userInfo.password}</li>
                </ul>
            ))}
        </div>
    );

};

const FormikNewUserForm = withFormik ({
    mapPropsToValues ({ name }) {
        return {
            name: "",
            email: "",
            password: "",
            terms: false
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("This is a required field"),
        email: Yup.string().required("This is a required field"),
        password: Yup.string().required("This is a required field"),
        terms: Yup.bool().required("This is a required field")
    }),

    handleSubmit (values, { setStatus, resetForm }) {
        console.log("Submitting Form:", values);

        axios
            .post ("https://reqres.in/api/users", values)
            .then (res => {
                console.log("Success:", res);
                setStatus(res.data)
                resetForm();
            })
            .catch(err => console.log("Error", err));
    }
})(NewUserForm);

export default FormikNewUserForm;