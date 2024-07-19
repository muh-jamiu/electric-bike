import React, { useEffect, useRef, useState } from 'react'
import axios from '../utils/axios';
import { Link } from 'react-router-dom'
import logo from "../../public/img/dash_logo.png"
import SideBar from '../components/sideBar';
import NavBar from '../components/navBar';
import loader from "../../public/img/loader.gif"
import { CookiesProvider, useCookies } from "react-cookie";
import Cookies from 'js-cookie';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
    document.title = 'Admin Panel | Dashboard';
    const [bikes, setBikes] = useState([])
    const [users, setUsers] = useState([])
    const [loading, setloading] = useState(true)
    const [cookie, setCookie, removeCookie] = useCookies("")
    const { t, i18n } = useTranslation();

    if (!cookie.user) {
        window.location.href = "/"
    }
    const user_data = JSON.parse(Cookies.get('user'))

    const chartRef = useRef(null);

    useEffect(() => {
        const chartInstance = chartRef.current;

        return () => {
            // Cleanup on component unmount
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, []);

    const data = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            {
                label: `${t("dashboard")}`,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
                hoverBorderColor: 'rgba(75, 192, 192, 1)',
                data: [65, 59, 80, 81, 56, 55, 40],
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    useEffect(() => {

        axios.get("/user")
            .then(
                res => {
                    console.log(res)
                    setUsers(res.data.users)
                }
            )
            .catch(error => {
                setloading(false)
            })
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
    }, [bikes, users])

    return (
        <div className="dashbord bg-white">
            <div className="d-flex">
                <SideBar />

                <div className="sec">
                    {/* <div className="header_ d-flex justify-content-between">
                        <div className="input-group">
                            <span className="input-group-text"><i class="fa-solid fa-magnifying-glass"></i></span>
                            <input type="text" className="form-control" placeholder="Search here..." />
                        </div>
                        <div className="d-flex icons">
                            <i className="fa-regular btn fa-bell mt-1"></i>
                            <div class="dropdown">
                                <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                                <i className="fa-solid fa-user"></i>
                                </button>
                                <ul class="dropdown-menu">
                                    <li><h5 class="dropdown-header">Ganiu Jamiu</h5></li>
                                    <li><hr class="dropdown-divider"></hr></li>
                                    <li><a class="ft text-muted mb-3 dropdown-item" href="#">Settings</a></li>
                                    <li><a class="ft text-muted mb-3 dropdown-item" href="#">Notifications</a></li>
                                    <li><a class="ft text-muted mb-3 dropdown-item" href="#">User Management</a></li>
                                    <li><hr class="dropdown-divider"></hr></li>
                                    <li><h5 class="dropdown-header btn text-white mx-2 btn-danger">Log Out</h5></li>
                                </ul>
                            </div>
                        </div>
                    </div> */}
                    <NavBar />

                    {
                        loading &&
                        <div className='text-center img_loader'>
                            <img src={loader} alt="" width={280} />
                        </div>
                    }

                    {!loading &&
                        <div className="main_">
                            <h4 className="fw-bold mt-3">{t("dashboard")}</h4>

                            <div className="d-flex justify-content-evenly mt-3">
                                <div className="box">
                                    <p className="text-muted ft">{t("total_bike")}</p>
                                    <div className="icon">
                                        <i class="fa-solid fa-motorcycle"></i>
                                    </div>
                                    <h4 className="fw-bold">{bikes.length}</h4>
                                </div>
                                <div className="box">
                                    <p className="text-muted ft">{t("total_user")}</p>
                                    <div className="icon">
                                        <i class="fa-solid fa-users"></i>
                                    </div>
                                    <h4 className="fw-bold">{users.length}</h4>
                                </div>
                                <div className="box">
                                    <p className="text-muted ft">{t("active_bike")}</p>
                                    <div className="icon">
                                        <i class="fa-solid fa-motorcycle"></i>
                                    </div>
                                    <h4 className="fw-bold">0</h4>
                                </div>
                                <div className="box">
                                    <p className="text-muted ft">{t("active_rental")}</p>
                                    <div className="icon">
                                        <i class="fa-solid fa-person-biking"></i>
                                    </div>
                                    <h4 className="fw-bold">0</h4>
                                </div>
                            </div>
                            <br />
                            <Bar ref={chartRef} data={data} options={options} />

                            <div className="chart">

                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
