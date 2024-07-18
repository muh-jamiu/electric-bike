import React, { useEffect, useRef, useState } from 'react'
import SideBar from '../components/sideBar'
import NavBar from '../components/navBar';
import axios from '../utils/axios';
import loader from "../../public/img/loader.gif"
import { CookiesProvider, useCookies } from "react-cookie";

export default function Bikes() {
    document.title = 'Bike Inventory | Dashboard';
    const [bikes, setBikes] = useState([])
    const [loading, setloading] = useState(true)
    const [cookie, setCookie, removeCookie] = useCookies("")
    const bikeId = useRef("")
    const bikeStatus = useRef("")
    const bikeStation = useRef("")

    if (!cookie.user) {
        window.location.href = "/"
    }

    useEffect(() => {
        axios.post("/bike")
            .then(
                res => {
                    // console.log(res)
                    setBikes(res.data.Bikes)
                    setloading(false)
                }
            )
            .catch(error => {
                setloading(false)
                console.log(error)
            })
    }, [bikes])

    const postDelete = (id) => {
        axios.post("/bike/delete", {
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

    const deleteBike = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                postDelete(id)
                Swal.fire({
                    title: "Deleted!",
                    text: "Bike has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    const EditBike = () => {
        axios.post("/edit-bike")
            .then(
                res => {
                    console.log(res)
                }
            )
            .catch(error => {
                console.log(error)
            })
    }

    const createBike = () => {
        console.log(bikeId.current.value, bikeStatus.current.value, bikeStation.current.value)
        if (!bikeId.current.value || !bikeStatus.current.value || !bikeStation.current.value) {
            var errors_p = document.querySelector(".errors_p")
            errors_p.classList.remove("d-none")
            return
        }

        var errors_p = document.querySelector(".errors_p")
        errors_p.classList.add("d-none")

        var button_submit = document.querySelector(".button_submit")
        button_submit.innerHTML = `<div class="spinner-border spinner-border-sm text-white"></div>`

        axios.post("/bike/create", {
            BikeCode: bikeId.current.value,
            status: bikeStatus.current.value,
            station: bikeStation.current.value,
        })
            .then(
                res => {
                    button_submit.innerHTML = "Save"
                    bikeStation.current.value = ""
                    bikeStatus.current.value = ""
                    bikeId.current.value = ""
                    console.log(res)
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Bikes was created successfully"
                    });
                }
            )
            .catch(error => {
                button_submit.innerHTML = "Save"
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
                console.log(error)
            })
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

                    {!loading &&
                        <div className="main_">
                            <div className="d-flex sec_head justify-content-between">
                                <h4 className="fw-bold mt-3">Bike Inventory</h4>
                                <button data-bs-toggle="modal" data-bs-target="#createBikeModal" className="btn bg text-white mt-3 ft"><i class="fa-solid fa-plus"></i> Add New Bike</button>
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

                            {/* {
                            true &&
                            <div className='text-center'>
                                <img src={loader} alt=""  width={180}/>
                            </div>
                        } */}


                            {bikes.length == 0 &&
                                <div className="text-center mt-5 pt-5">
                                    <h4 className="fw-bold">Empty</h4>
                                    <p className="text-muted ft">There are no available bikes at the moment.</p>
                                </div>
                            }

                            {
                                !loading &&
                                <>
                                    {
                                        bikes.length > 0 &&
                                        <table className="table table-striped text-center table-bordered">
                                            <thead className="">
                                                <tr>
                                                    <th scope="col">Bike ID</th>
                                                    <th scope="col">Bike Status</th>
                                                    <th scope="col">Station</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bikes.map(val => {
                                                    return (<tr>
                                                        <td className='text-uppercase'>{val.BikeCode ?? "N/A"}</td>
                                                        <td className=''><div className="bike_status text-capitalize"><div className="dot"></div>{val.status}</div></td>
                                                        <td className='text-capitalize'>{val.station}</td>
                                                        <td><div className="table_act">
                                                            <div class="dropdown">
                                                                <i class="fa-solid fa-ellipsis" data-bs-toggle="dropdown"></i>
                                                                <ul class="dropdown-menu bg-light">
                                                                    <li><h5 class="dropdown-header ft mb-1 text-muted">Edit</h5></li>
                                                                    <li><h5 class="dropdown-header ft mb-1 text-muted">Change Status</h5></li>
                                                                    <hr />
                                                                    <li onClick={() => deleteBike(val._id)}><h5 class="dropdown-header mt-3 ft mb-3 btn text-white mx-2 btn-danger">Delete Bike</h5></li>
                                                                </ul>
                                                            </div>
                                                        </div></td>
                                                    </tr>)
                                                })}
                                            </tbody>
                                        </table>
                                    }
                                </>
                            }


                        </div>
                    }
                </div>
            </div>

            <div class="modal fade" id="createBikeModal">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">


                        <div class="modal-header">
                            <div>
                                <h6 class="modal-title">Add New Bike</h6>
                                <p className="text-muted ft">Enter the details of the new bike to add it to the inventory.</p>
                            </div>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>


                        <div class="modal-body">
                            <label htmlFor="">Bike ID</label>
                            <input ref={bikeId} className='createBikeInput' type="text" placeholder='Enter bike ID' />

                            <label htmlFor="">Bike Status</label>
                            <input ref={bikeStatus} className='createBikeInput' type="text" placeholder='Enter bike status' />

                            <label htmlFor="">Bike Station</label>
                            <input ref={bikeStation} className='createBikeInput' type="text" placeholder='Enter bike station' />
                            <p className="ft errors_p d-none text-danger mt-2">* All field must be provided</p>
                        </div>


                        <div class="modal-footer">
                            <button type="button" class="btn px-4 ft btn-outline-dark" data-bs-dismiss="modal">Cancel</button>
                            <button onClick={createBike} type="button" class="btn btn-success button_submit bg ft text-white px-4">Save</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
