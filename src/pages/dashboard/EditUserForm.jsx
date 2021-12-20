import React, { useState, useEffect } from 'react';
import { Formik, Form as FormikForm } from "formik";
import { Button, Form } from 'react-bootstrap';
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";


import { editUserHandler } from '../../actions/addUser.action';
const initialValues = {
    name: '',
    email: '',
    phone: '',
    address: ''
};


const EditUserForm = (props) => {
    const dispatch = useDispatch();
    const editUser = useSelector((state) => state.addUser.addUser);
    const loggedUserId = useSelector((state) => state.auth.id);
    const [userData, setUserData] = useState({})


    useEffect(() => {
        const editUserDetails = editUser.find(user => user.email === props.getUserEmail)
        setUserData(editUserDetails)

    }, []);


    const handleSubmitEvent = (values, actions) => {
        let userData = {
            id: loggedUserId,
            name: values.name,
            email: values.email,
            phone: values.phone,
            address: values.address
        }


        //console.log(userData)
        dispatch(editUserHandler(userData,
            (success) => {
                //alert('Success')
                actions.setErrors(success)
            },
            (err) => {
                //alert('Failed')
                actions.setErrors(err)
            }
        ))

    }


    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .min(1, 'Name cannot be less than 1 character long')
            .max(40, 'Name cannot be more than 40 characters long')
            .required('Please enter User Name'),
        email: Yup.string()
            .required("Please enter your email ID")
            .email("Enter valid Email Id"),

        phone: Yup.string()
            .required("Please enter your phone number"),
        address: Yup.string()
            .required("Please enter your address")

    })

    const newInitialValues = Object.assign(initialValues, {
        name: userData && Object.keys(userData).length > 0 ? userData.name : "",
        email: userData && Object.keys(userData).length > 0 ? userData.email : "",
        phone: userData && Object.keys(userData).length > 0 ? userData.phone : "",
        address: userData && Object.keys(userData).length > 0 ? userData.address : "",
        // dob         : userData && Object.keys(userData).length > 0 && userData.dob != '' ? Number(userData.dob) : '',
    })


    return (
        <>
            <h4 className="pt-2 pb-2">Update User Details</h4>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmitEvent}
            >
                {({ values, errors, handleChange, touched, setFieldTouched }) => {

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
                                    //defaultValue={editUserDetails?.name}
                                    value={values.name}
                                    isInvalid={errors.name && touched.name}
                                    onBlur={() => setFieldTouched("name")}
                                />
                                {
                                    errors.name && touched.name ? (
                                        <span className="error text-danger"> {errors.name}</span>
                                    ) : (null)
                                }

                            </div>
                            <div className="pb-3 mt-2">
                                <Form.Control
                                    type="email"
                                    name='email'
                                    id="email"
                                    disabled
                                    placeholder="Enter Email ID *"
                                    onChange={handleChange}
                                    value={values.email}
                                    isInvalid={errors.email && touched.email}
                                    onBlur={() => setFieldTouched("email")}

                                />
                                {
                                    errors.email && touched.email ? (
                                        <span className="error text-danger">{errors.email}</span>
                                    ) : (null)
                                }
                            </div>

                            <div className="pb-3 mt-2">
                                <Form.Control
                                    type="text"
                                    name='phone'
                                    id="phone"
                                    placeholder="Enter Phone Number*"
                                    onChange={handleChange}
                                    value={values.phone}
                                    isInvalid={errors.phone && touched.phone}
                                    onBlur={() => setFieldTouched("phone")}

                                />
                                {
                                    errors.phone && touched.phone ? (
                                        <span className="error text-danger">{errors.phone}</span>
                                    ) : (null)
                                }
                            </div>
                            <div className="pb-3 mt-2">
                                <Form.Control
                                    type="text"
                                    name='address'
                                    id="address"
                                    placeholder="Enter Address"
                                    onChange={handleChange}
                                    value={values.address}
                                    isInvalid={errors.address && touched.address}
                                    onBlur={() => setFieldTouched("address")}

                                />
                                {
                                    errors.address && touched.address ? (
                                        <span className="error text-danger">{errors.address}</span>
                                    ) : (null)
                                }
                            </div>


                            <div className="pb-1 mt-2">
                                <Button
                                    variant="primary"
                                    className="btn btnRed"
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </div>
                        </FormikForm>
                    );
                }}
            </Formik>
        </>
    );
};

export default EditUserForm;