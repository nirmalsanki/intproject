import React from 'react'
import { Formik, Form as FormikForm } from "formik";
import { Button, Form } from 'react-bootstrap';
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
//import { useHistory } from 'react-router-dom';
import { login } from '../../actions/auth.action';
import { Redirect, Link } from 'react-router-dom';
import './Login.styles.css'


const initialValues = {
    email: '',
    password: ''
};


const Login = () => {
    const dispatch = useDispatch();
    //const history = useHistory();
    //const userData = useSelector((state) => state.auth.userData);
    const isloggedin = useSelector((state) => state.auth.isloggedin);



    const handleSubmitEvent = (values, actions) => {
        let log_data = {
            email: values.email,
            password: values.password,

        }

        dispatch(login(log_data,
            () => {
                // alert('Success')

            },
            (err) => {
                //alert('Failed')
                actions.setErrors(err)
            }

        ))

    }


    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required("Please enter your email ID")
            .email("Enter valid Email Id"),
        password: Yup.string()
            .required("Please enter your password"),
    })

    if (isloggedin) return <Redirect to={{ pathname: '/dashboard' }} />

    return (
        <>
            <div className="LoginWrapper">
                <div className="bgLayer"></div>
                <div className="LoginBox">
                    <h2>Login Admin</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmitEvent}
                    >
                        {({ values, errors, handleChange, touched, setFieldTouched, dirty, isSubmitting }) => {

                            return (
                                <FormikForm>

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



                                    <div className="pb-1 mt-2">
                                        <div className="row align-items-center">
                                            <div className="col">

                                                <Button
                                                    variant="primary"
                                                    className="btn btnRed"
                                                    type="submit"
                                                    disabled={isSubmitting || !dirty}
                                                >
                                                    Login
                                                </Button>
                                            </div>
                                            <div className="col text-end">
                                                <Link to="/registration">New Registration</Link>
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
    )
}

export default Login;
