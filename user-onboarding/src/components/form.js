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

                <p>Role:</p>
                <Field component="select" name="role" value={values.role}>
                    <option>Choose an option</option>
                    <option>Section Lead</option>
                    <option>Team Lead</option>
                    <option>Front End Dev</option>
                    <option>Back End Dev</option>
                    <option>Mascot</option>
                    <option>Intern</option>
                </Field>
                {touched.role && errors.role && <p>{errors.role}</p>}

                <p>About:</p>
                <Field 
                    component="textarea"
                    name="about"
                    placeholer="Tell us about yourself"
                    value={values.about}
                />
                {touched.about && errors.about && <p>{errors.about}</p>}

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

                {userInfo.map(userInfo => (
                <ul>
                    <li>Name: {userInfo.name}</li>
                    <li>E-mail: {userInfo.email}</li>
                    <li>Role: {userInfo.role}</li>
                    <li>About: {userInfo.about}</li>
                </ul>
            ))}

            </Form>

            
        </div>
    );

};

const FormikNewUserForm = withFormik ({
    mapPropsToValues ({ }) {
        return {
            name: "",
            email: "",
            about: "",
            role: "",
            password: "",
            terms: false
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("This is a required field"),
        email: Yup.string().required("This is a required field"),
        role: Yup.string().oneOf(["Section Lead", "Team Lead", "Front End Dev", "Back End Dev", "Mascot", "Intern"]).required("This is a required field"),
        about: Yup.string().required("This is a required field"),
        password: Yup.string().min(8, 'Password must be at least 8 characters long, include at least one number, one letter, one symbol, a pie flavor, you mothers maiden name, and promise to stay in touch even after leaving your hometown').required("This is a required field"),
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
            .catch(err => console.log("Error", err.response));
    }
})(NewUserForm);

export default FormikNewUserForm;