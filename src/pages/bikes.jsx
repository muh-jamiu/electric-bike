import React, { useEffect, useState } from 'react'
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

    if (!cookie.user) {
        window.location.href = "/"
    }

    useEffect(() => {
        axios.post("/bike")
            .then(
                res => {
                    console.log(res)
                    setBikes(res.data.Bikes)
                    setloading(false)
                }
            )
            .catch(error => {
                setloading(false)
                console.log(error)
            })
    }, [bikes])

    const deleteBike = () => {
        axios.post("/delete-bike")
        .then(
            res => {
                console.log(res)
            }
        )
        .catch(error => {
            console.log(error)
        })
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
                                                        <td>{val._id}</td>
                                                        <td className=''><div className="bike_status"><div className="dot"></div>Active</div></td>
                                                        <td>none</td>
                                                        <td><div className="table_act">
                                                            <div class="dropdown dpd">
                                                            <i class="fa-solid fa-ellipsis" data-bs-toggle="dropdown"></i>
                                                                <ul class="dropdown-menu dpd bg-dark">
                                                                    <li onClick={deleteBike}><h5 class="dropdown-header mt-3 ft mb-3 btn text-white mx-2 btn-danger">Delete</h5></li>
                                                                    <li><h5 class="dropdown-header ft mb-3 btn text-white mx-2 btn-primary">Edit</h5></li>
                                                                    <li><h5 class="dropdown-header ft mb-3 btn text-white mx-2 btn-info">Change Status</h5></li>
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
                            <h4 class="modal-title">Modal Heading</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>


                        <div class="modal-body">
                            Modal body..
                        </div>


                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
