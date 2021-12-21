import React, { useEffect } from 'react';
import { Formik, Form as FormikForm } from "formik";
import { Button, Form } from 'react-bootstrap';
import * as Yup from "yup";
import { useDispatch } from "react-redux";
//import { useHistory } from 'react-router-dom';
import { RegisterUser } from '../../actions/reg.action';
import { Link } from 'react-router-dom';
import './Registration.styles.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const initialValues = {
    id: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
};

var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);



const Registration = () => {
    const dispatch = useDispatch();
    //const history = useHistory();
    //const userData = useSelector((state) => state.registerUser.registerUser);
    const date = new Date();

    const toastSuccess = () => {
        toast.success("You have success fully registered. Please go to the login page.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }




    const handleSubmitEvent = (values, actions) => {
        const password = values.password
        const confirmPassword = values.confirmPassword
        const hashedPassword = bcrypt.hashSync(password, salt);
        const hashedConfirmPassword = bcrypt.hashSync(confirmPassword, salt);

        let registrationData = {
            id: values.name.slice(0, 3).toUpperCase() + date.getTime().toString(),
            name: values.name,
            email: values.email,
            password: hashedPassword,
            confirmPassword: hashedConfirmPassword
        }

        dispatch(RegisterUser(registrationData,
            (success) => {
                // actions.setErrors(success)
                // toast.success('You have success fully registered. Please go to the login page.')
                toastSuccess()
                actions.resetForm()
                actions.isSubmitting()
            },
            (err) => {
                actions.setErrors(err)
                actions.isSubmitting()
            }
        ));

    }


    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .min(1, 'Name cannot be less than 1 character long')
            .max(40, 'Name cannot be more than 40 characters long')
            .required('Please enter your name'),
        email: Yup.string()
            .required("Please enter your email ID")
            .email("Enter valid Email Id"),

        password: Yup.string()
            .required("Please enter your password")
            .min(5, 'Password is too short - should be 5 chars minimum.')
            .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
        confirmPassword: Yup.string()
            .required("Please enter your confirm password")
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    })




    return (
        <>
            <div className="LoginWrapper">
                <div className="bgLayer"></div>
                <div className="RegistrationBox">
                    <h2>Registration</h2>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmitEvent}

                    >
                        {({ values, errors, handleChange, touched, setFieldTouched, dirty, isSubmitting }) => {

                            return (
                                <FormikForm>

                                    {
                                        errors.success ? (
                                            <div className="alert alert-success"> {errors.success}</div>
                                        ) : (null)
                                    }

                                    <div className="pb-3 mt-2">
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Name*"
                                            id="name"
                                            onChange={handleChange}
                                            value={values.name}
                                            isInvalid={errors.name && touched.name}
                                            onBlur={() => setFieldTouched("name")}
                                        />
                                        {
                                            errors.name && touched.name ? (
                                                <span className="error text-danger small"> {errors.name}</span>
                                            ) : (null)
                                        }

                                    </div>
                                    <div className="pb-3 mt-2">
                                        <Form.Control
                                            type="email"
                                            name='email'
                                            id="email"
                                            placeholder="Enter Email ID *"
                                            onChange={handleChange}
                                            value={values.email}
                                            isInvalid={errors.email && touched.email}
                                            onBlur={() => setFieldTouched("email")}

                                        />
                                        {
                                            errors.email && touched.email ? (
                                                <span className="error text-danger small">{errors.email}</span>
                                            ) : (null)
                                        }
                                    </div>

                                    <div className="pb-3 mt-2">
                                        <Form.Control
                                            type="password"
                                            name='password'
                                            id="password"
                                            placeholder="Enter password*"
                                            onChange={handleChange}
                                            value={values.password}
                                            isInvalid={errors.password && touched.password}
                                            onBlur={() => setFieldTouched("password")}

                                        />
                                        {
                                            errors.password && touched.password ? (
                                                <span className="error text-danger small">{errors.password}</span>
                                            ) : (null)
                                        }
                                    </div>
                                    <div className="pb-3 mt-2">
                                        <Form.Control
                                            type="password"
                                            name='confirmPassword'
                                            id="confirmPassword"
                                            placeholder="Enter confirm Password*"
                                            onChange={handleChange}
                                            value={values.confirmPassword}
                                            isInvalid={errors.confirmPassword && touched.confirmPassword}
                                            onBlur={() => setFieldTouched("confirmPassword")}

                                        />
                                        {
                                            errors.confirmPassword && touched.confirmPassword ? (
                                                <span className="error text-danger small">{errors.confirmPassword}</span>
                                            ) : (null)
                                        }
                                    </div>


                                    <div className="pb-1 mt-2">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <Button
                                                    variant="primary"
                                                    className="btn btnRed"
                                                    type="submit"
                                                    disabled={isSubmitting || !dirty}
                                                >
                                                    Register Now
                                                </Button>
                                            </div>
                                            <div className="col text-end">
                                                <Link to="/">Login</Link>
                                            </div>

                                        </div>
                                    </div>
                                </FormikForm>
                            );
                        }}
                    </Formik>



                </div>
            </div>
        </>
    );
};

export default Registration;