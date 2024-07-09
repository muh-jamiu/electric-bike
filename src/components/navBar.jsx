import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CookiesProvider, useCookies, } from "react-cookie";
import Cookies from 'js-cookie';

export default function NavBar() {
    const [logOut, setlogout, removeLogout] = useCookies(["user"])
    const user_data = JSON.parse(Cookies.get('user'))

    const logout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You are logging out your account",
            icon: "question",
            color : "grey",
            showCancelButton: true,
            confirmButtonColor: "green",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Log out!"
          }).then((result) => {
            if (result.isConfirmed) {
                removeLogout(["user"])
                Swal.fire({
                    title: "Logged out!",
                    text: "You are logged out.",
                    icon: "success"
                });
            }
        });
    }


    return (
        <div className="header_ d-flex justify-content-between">
        <div className="input-group">
            <span className="input-group-text"><i class="fa-solid fa-magnifying-glass"></i></span>
            <input type="text" className="form-control" placeholder="Search here..." />
        </div>
        <div className="d-flex icons">
            <i className="fa-regular btn fa-bell mt-1"></i>
            <div class="dropdown dpd">
                <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                <i className="fa-solid fa-user"></i>
                </button>
                <ul class="dropdown-menu dpd">
                    <li><h5 class="dropdown-header">{user_data.fullname}</h5></li>
                    <li><hr class="dropdown-divider"></hr></li>
                    <li><a class="ft text-muted mb-3 dropdown-item" href="#">Settings</a></li>
                    <li><a class="ft text-muted mb-3 dropdown-item" href="#">Notifications</a></li>
                    <li><a class="ft text-muted mb-3 dropdown-item" href="#">User Management</a></li>
                    <li><hr class="dropdown-divider"></hr></li>
                    <li onClick={logout}><h5 class="dropdown-header btn text-white mx-2 btn-danger">Log Out</h5></li>
                </ul>
            </div>
        </div>
    </div>
    )
}
