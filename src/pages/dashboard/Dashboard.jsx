import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from '../../actions/addUser.action';
import Layout from '../../components/layouts/Layout';
import AddUserForm from './AddUserForm';
import EditUserForm from './EditUserForm';
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
    const dispatch = useDispatch();
    //const registeredUsers = useSelector((state) => state.registerUser.registerUser);
    const loggedID = useSelector((state) => state.auth.id);
    const users = useSelector((state) => state.addUser.addUser);
    const filteredUserList = users.filter(user => user.id === loggedID);
    let [showPopup, setShowPopup] = useState(false)
    let [userEmail, setUserEmail] = useState('')
    // Edit Course and popup
    const editUserHandler = (email) => {
        setShowPopup(true);
        setUserEmail(email)
        // console.log(userEmail)

    }


    const toastSuccess = () => {
        toast.success("You have successfully removed this user.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    return (
        <>
            <Layout>
                <div className="pt-1 pb-5">
                    <div>
                        <div className="row ">
                            <div className="col-md-3">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="pb-2">Add New User</h5>
                                        <AddUserForm />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-hover table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Phone</th>
                                                        <th>Address</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredUserList.length >= 1 ? filteredUserList && filteredUserList.map((user, idx) =>

                                                        <tr key={idx}>
                                                            <td>{user.name}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.phone}</td>
                                                            <td>{user.address}</td>
                                                            <td>
                                                                <button className="btn btn-outline-warning btn-sm m-1" onClick={() => editUserHandler(user.email)}><FontAwesomeIcon icon={faEdit} /></button>
                                                                <button className="btn btn-outline-danger btn-sm m-1" onClick={() => [dispatch(removeUser(user.email)), toastSuccess()]}><FontAwesomeIcon icon={faTrash} /></button></td>
                                                        </tr>
                                                    ) :
                                                        <tr >
                                                            <td colSpan="5">

                                                                <span className="text-danger"><strong>Sorry, We could not find any result.</strong></span>
                                                            </td>
                                                        </tr>

                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Layout>
            {
                showPopup &&
                <div className={showPopup ? "overlay show" : "overlay"}>
                    <div className="popup-content">
                        <div className="popup-body">
                            <button className="btn btn-danger btn-sm close-btn" onClick={() => setShowPopup(false)}>X</button>
                            <EditUserForm getUserEmail={userEmail} />
                        </div>
                    </div>
                </div>
            }


        </>

    )
}

export default Dashboard
