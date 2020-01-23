import React, {useState, useEffect } from 'react';
import { Form, Field, withFomrik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Form = ({ errors, touched, values, status }) => {
    const [userInfo, setUserInfo] = useState ([]);

    useEffect (() => {
        status && setUserInfo (userInfo => [...userInfo, status]);
    }, [status])

}

export default Form;