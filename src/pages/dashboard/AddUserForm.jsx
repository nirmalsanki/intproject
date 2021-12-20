import React from 'react';
import { Formik, Form as FormikForm } from "formik";
import { Button, Form } from 'react-bootstrap';
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from '../../actions/addUser.action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const initialValues = {
    name: '',
    email: '',
    phone: '',
    address: ''

};
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const AddUserForm = () => {
    const dispatch = useDispatch();
    const loggedUserId = useSelector((state) => state.auth.id);

    const toastSuccess = () => {
        toast.success("You have successfully added a new user.", {
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
        let userData = {
            id: loggedUserId,
            name: values.name,
            email: values.email,
            phone: values.phone,
            address: values.address
        }


        //console.log(userData)
        dispatch(addUser(userData,
            (success) => {
                //alert('Success')
                // actions.setErrors(success)
                toastSuccess()
                actions.setSubmitting(false)
                actions.resetForm()
            },
            (err) => {
                //alert('Failed')
                actions.setErrors(err)
                actions.setSubmitting(false)
            }
        ))

    }


    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .min(1, 'Name cannot be less than 1 character long')
            .max(40, 'Name cannot be more than 40 characters long')
            .required('Please enter name'),
        email: Yup.string()
            .required("Please enter user email ID")
            .email("Enter valid email ID"),

        phone: Yup.string()
            .required("Please enter mobile number")
            .min(10, 'Mobile number cannot be less than 10 digit')
            .matches(phoneRegExp, 'Phone number is not valid'),
        address: Yup.string()
            .required("Please enter address")

    })




    return (
        <>

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
                                    type="text"
                                    name='phone'
                                    id="phone"
                                    placeholder="Enter Mobile Number*"
                                    onChange={handleChange}
                                    value={values.phone}
                                    isInvalid={errors.phone && touched.phone}
                                    onBlur={() => setFieldTouched("phone")}

                                />
                                {
                                    errors.phone && touched.phone ? (
                                        <span className="error text-danger small">{errors.phone}</span>
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
                                        <span className="error text-danger small">{errors.address}</span>
                                    ) : (null)
                                }
                            </div>


                            <div className="pb-1 mt-2">
                                <Button
                                    variant="primary"
                                    className="btn btnRed"
                                    type="submit"
                                    disabled={isSubmitting || !dirty}
                                >
                                    Add User
                                </Button>
                            </div>
                        </FormikForm>
                    );
                }}
            </Formik>
        </>
    );
};

export default AddUserForm;