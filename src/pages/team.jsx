import React, { useEffect, useState } from 'react'
import SideBar from '../components/sideBar'
import NavBar from '../components/navBar';
import loader from "../../public/img/loader.gif"
import axios from '../utils/axios';
import { CookiesProvider, useCookies } from "react-cookie";
import { Link } from 'react-router-dom'

export default function Payments() {
    document.title = 'Team | Dashboard';

    const [rental, setRental] = useState([])
    const [loading, setloading] = useState(true)
    const [cookie, setCookie, removeCookie] = useCookies("")

    if(!cookie.user){
        window.location.href = "/"
    }

    useEffect(() => {
        axios.post("/payment")
            .then(
                res => {
                    console.log(res)
                    setRental(res.data.Bikes)
                    setloading(false)
                }
            )
            .catch(error => {
                setloading(false)
                console.log(error)
            })
    }, [rental])

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
                            <div className="sec_head justify-content-between">
                                <h6 className="fw-bold mt-3 mb-4"><Link className='text-decoration-none text-dark' to="/settings">Settings</Link> &gt; <span className='text-muted ft'>Team</span></h6>
                            </div>
                            
                            <div className="d-flex sec_head justify-content-between">
                                <h4 className="fw-bold mt-3">Team</h4>
                                <div className="d-flex">
                                    <button className="btn ft mx-3 text-white btn-dark bg">Invite by Email</button>
                                    <button className="btn btn-primary ft export__"><i class="fa-solid fa-download"></i> Export</button>
                                </div>
                            </div>

                            <div className="text-center mt-5 pt-5">
                                <h4 className="fw-bold">Empty</h4>
                                <p className="text-muted ft">There is no team member at the moment.</p>
                            </div>

                            {/* <table className="table table-striped text-center table-bordered">
                            <thead className="">
                                <tr>
                                    <th scope="col">Full Name</th>
                                    <th scope="col">Bike ID</th>
                                    <th scope="col">Rental Date</th>
                                    <th scope="col">Rental Start Time</th>
                                    <th scope="col">Rental End Time</th>
                                    <th scope="col">Bike Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Ganiu Jamiu</td>
                                    <td>1293901</td>
                                    <td>july, 8 2020</td>
                                    <td>july, 8 2020</td>
                                    <td>july, 8 2020</td>
                                    <td className=''><div className="bike_status"><div className="dot"></div>Active</div></td>
                                    <td><div className="table_act"><i class="fa-solid fa-ellipsis"></i></div></td>
                                </tr>
                                <tr>
                                    <td>Ganiu Jamiu</td>
                                    <td>1293901</td>
                                    <td>july, 8 2020</td>
                                    <td>july, 8 2020</td>
                                    <td>july, 8 2020</td>
                                    <td className=''><div className="bike_status"><div className="dot"></div>Active</div></td>
                                    <td><div className="table_act"><i class="fa-solid fa-ellipsis"></i></div></td>
                                </tr>
                                <tr>
                                    <td>Ganiu Jamiu</td>
                                    <td>1293901</td>
                                    <td>july, 8 2020</td>
                                    <td>july, 8 2020</td>
                                    <td>july, 8 2020</td>
                                    <td className=''><div className="bike_status"><div className="dot"></div>Active</div></td>
                                    <td><div className="table_act"><i class="fa-solid fa-ellipsis"></i></div></td>
                                </tr>
                            </tbody>
                        </table> */}


                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
