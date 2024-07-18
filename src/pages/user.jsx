import React, { useEffect, useState } from 'react'
import SideBar from '../components/sideBar'
import NavBar from '../components/navBar';
import axios from '../utils/axios';
import loader from "../../public/img/loader.gif"
import { CookiesProvider, useCookies } from "react-cookie";

export default function User() {
    document.title = 'User Management | Dashboard';
    const [users, setUsers] = useState([])
    const [loading, setloading] = useState(true)
    const [cookie, setCookie, removeCookie] = useCookies("")

    if(!cookie.user){
        window.location.href = "/"
    }

    useEffect(() => {
        axios.get("/user")
            .then(
                res => {
                    console.log(res)
                    setUsers(res.data.users)
                    setloading(false)
                }
            )
            .catch(error => {
                setloading(false)
                console.log(error)
            })
    }, [users])

    const postDelete = (id) => {
        axios.post("/user/delete-user", {
            id: id
        })
        .then(
            res => {
                console.log(res)
            }
        )
        .catch(error => {
            console.log(error)
        })
    }

    const deleteUser = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete user!"
        }).then((result) => {
            postDelete(id)
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "User has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    return (
        <div className="dashbord bikes bg-white">
            <div className="d-flex">
                <SideBar />
                <div className="sec">
                    <NavBar />
                    {
                        loading &&
                        <div className='text-center img_loader'>
                            <img src={loader} alt="" width={280} />
                        </div>
                    }

                    { !loading &&
                        <div className="main_">
                            <div className="d-flex sec_head justify-content-between">
                                <h4 className="fw-bold mt-3">User Management</h4>
                            </div>

                            <div className="d-flex sec_head mt-4 mb-3 justify-content-between">
                                <input type="text" placeholder='search for bike ID, status etc.....' />
                                <div class="">
                                    <button type="button" class="btn btn-outline-dark mt-1 ft dropdown-toggle" data-bs-toggle="dropdown">
                                        Sorting Order
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><h5 class="dropdown-header">Sorting Order</h5></li>
                                        <li><hr class="dropdown-divider"></hr></li>
                                        <li><a class="ft text-muted mb-3 dropdown-item" href="#">Latest</a></li>
                                        <li><a class="ft text-muted mb-3 dropdown-item" href="#">Old</a></li>
                                        <li><a class="ft text-muted mb-3 dropdown-item" href="#">Station</a></li>
                                        <li><a class="ft text-muted mb-3 dropdown-item" href="#">Status</a></li>
                                    </ul>
                                </div>
                            </div>

                            {users.length == 0 &&
                                <div className="text-center mt-5 pt-5">
                                    <h4 className="fw-bold">Empty</h4>
                                    <p className="text-muted ft">There are no available users at the moment.</p>
                                </div>
                            }

                            {
                                users.length > 0 &&
                                <>
                                 {
                                !loading &&
                                <table className="table table-striped text- table-bordered">
                                    <thead className="">
                                        <tr>
                                            <th scope="col">Full Name</th>
                                            <th scope="col">Email Address</th>
                                            <th scope="col">Phone Number</th>
                                            <th scope="col">Last Ride Date</th>
                                            <th scope="col">Account Status</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users.map((user) => {
                                                return (
                                                    <tr>
                                                        <td>{user.firstname} {user.lastname}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.phone}</td>
                                                        <td>None</td>
                                                        <td className=''><div className="bike_status"><div className="dot"></div>Active</div></td>
                                                        <td>
                                                        <div className="table_act">
                                                            <div class="dropdown">
                                                                <i class="fa-solid fa-ellipsis" data-bs-toggle="dropdown"></i>
                                                                <ul class="dropdown-menu bg-light">
                                                                    <li><h5 class="dropdown-header mt-2 ft mb-1 text-muted">Block User</h5></li>
                                                                    <hr />
                                                                    <li onClick={() => deleteUser(user._id)}><h5 class="dropdown-header mt-3 ft mb-3 btn text-white mx-2 btn-danger">Delete User</h5></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            }

                                </>
                            }

                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
