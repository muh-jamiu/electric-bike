import React, { useEffect, useState } from 'react'
import SideBar from '../components/sideBar'
import NavBar from '../components/navBar';
import loader from "../../public/img/loader.gif"
import axios from '../utils/axios';
import { CookiesProvider, useCookies } from "react-cookie";
import { Link } from 'react-router-dom'

export default function Settings() {
    document.title = 'Settings | Dashboard';

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

                    {!false &&
                        <div className="main_ settings__">
                            <div className="sec_head justify-content-between">
                                <h4 className="fw-bold mt-3 mb-4">Settings</h4>

                                <div className="d-flex flex-wrap justify-content-evenly">
                                    <Link to="/account-settings" className="_box text-decoration-none">
                                        <p className="iconic"><i class="fa-regular fa-user"></i></p>
                                        <h6 className="fw-bold text-dark">Account Settings</h6>
                                        <p className='text-muted ft'>This is a general feature made for the admin and the others</p>
                                    </Link>

                                    <Link to="/team" className="_box text-decoration-none">
                                        <p className="iconic"><i class="fa-solid fa-people-group"></i></p>
                                        <h6 className="fw-bold text-dark">Team</h6>
                                        <p className='text-muted ft'>This is a general feature made for the admin and the others</p>
                                    </Link>

                                    <div className="_box">
                                        <p className="iconic"><i class="fa-solid fa-cash-register"></i> </p>
                                        <h6 className="fw-bold">Payment Settings</h6>
                                        <p className='text-muted ft'>This is a general feature made for the admin and the others</p>
                                    </div>

                                    <div className="_box">
                                        <p className="iconic"><i class="fa-solid fa-person-biking"></i></p>
                                        <h6 className="fw-bold">Rental Settings</h6>
                                        <p className='text-muted ft'>This is a general feature made for the admin and the others</p>
                                    </div>

                                    <div className="_box">
                                        <p className="iconic"><i class="fa-solid fa-bars-progress"></i></p>
                                        <h6 className="fw-bold">Management Settings</h6>
                                        <p className='text-muted ft'>This is a general feature made for the admin and the others</p>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
