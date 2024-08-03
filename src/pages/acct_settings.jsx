import React, { useEffect, useState } from 'react'
import SideBar from '../components/sideBar'
import NavBar from '../components/navBar';
import loader from "../../public/img/loader.gif"
import axios from '../utils/axios';
import { CookiesProvider, useCookies } from "react-cookie";
import { Link } from 'react-router-dom'

export default function Settings() {
    document.title = 'Account Setting | Dashboard';

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
                                <h6 className="fw-bold mt-3 mb-4"><Link className='text-decoration-none text-dark' to="/settings">Settings</Link> &gt; <span className='text-muted ft'>Account Settings</span></h6>
                            </div>

                            <div className="form__">
                                <div className="d-flex mb-4 mt-4">
                                    <div className="">
                                        <label htmlFor="">Fullname</label>
                                        <input type="text" placeholder='Enter fullname' />
                                    </div>
                                    <div className="">
                                        <label htmlFor="">Email Address</label>
                                        <input type="text" placeholder='Enter email address' />
                                    </div>
                                </div>
                                
                                <div className="d-flex mb-5">
                                    <div className="">
                                        <label htmlFor="">Password</label>
                                        <input type="text" placeholder='Enter fullname' />
                                    </div>
                                    <div className="">
                                        <label htmlFor="">Language</label>
                                        <input type="text" placeholder='Enter email address' />
                                    </div>
                                </div>

                                <button className="save__ bg btn btn-success text-white ft mb-5">Save Changes</button>
                            </div>                        
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
