import React, { useEffect, useState } from 'react'
import SideBar from '../components/sideBar'
import NavBar from '../components/navBar';
import loader from "../../public/img/loader.gif"
import axios from '../utils/axios';
import { CookiesProvider, useCookies } from "react-cookie";

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
                    {
                        loading &&
                        <div className='text-center img_loader'>
                            <img src={loader} alt="" width={280} />
                        </div>
                    }

                    {!loading &&
                        <div className="main_">
                            <div className="d-flex sec_head justify-content-between">
                                <h4 className="fw-bold mt-3">Settings</h4>
                            </div>                            
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
