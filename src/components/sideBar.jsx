import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../public/img/dash_logo.png"
import { useTranslation } from 'react-i18next';


export default function SideBar({isAuthenticated}) {
  const { t, i18n } = useTranslation();

    useEffect(() => {
        var side_link = document.querySelectorAll(".side_link .link")
        var links = document.querySelectorAll(".side_link")
        side_link.forEach((val, index) => {
          var page = window.location.pathname.split("/")[1].split("-").join().replace(",", " ")
          console.log(page)
          if(page == `admin panel`){
            links[0].classList.add("active")
          }
          else if(page == "bike inventory"){
            links[1].classList.add("active")
          }
          else if(page == "bike rentals"){
            links[2].classList.add("active")
          }
          else if(page == "user management"){
            links[3].classList.add("active")
          }
          else if(page == "payments"){
            links[4].classList.add("active")
          }
          else if(page == "notifications"){
            links[5].classList.add("active")
          }
          else if(page == "settings"){
            links[6].classList.add("active")
          }
        })
    }, [])

    return (
        <div className="first">
                    <div className="head">
                        <img src={logo} alt="" />
                    </div>

                    <div className="links_ mt-3">
                        <li className="list-unstyled side_link"><Link to="/admin-panel" className="text-decoration-none link">
                            <i class="fa-solid fa-chart-line"></i> {t("dashboard")}
                        </Link></li>
                        <li className="list-unstyled side_link"><Link to="/bike-inventory" className="text-decoration-none link">
                            <i class="fa-solid fa-motorcycle"></i> {t("bikes")}
                        </Link></li>
                        <li className="list-unstyled side_link"><Link to="/bike-rentals" className="text-decoration-none link">
                            <i class="fa-solid fa-person-biking"></i> {t("rentals")}
                        </Link></li>
                        <li className="list-unstyled side_link"><Link to="/user-management" className="text-decoration-none link">
                            <i class="fa-solid fa-users"></i> {t("users")}
                        </Link></li>
                        <li className="list-unstyled side_link"><Link to="/payments" className="text-decoration-none link">
                            <i class="fa-solid fa-cash-register"></i> {t("payment")}
                        </Link></li>
                        <li className="list-unstyled side_link"><Link to="/notifications" className="text-decoration-none link">
                            <i class="fa-regular fa-bell"></i> {t("notification")}
                        </Link></li>
                        <li className="list-unstyled side_link"><Link to="/settings" className="text-decoration-none link">
                            <i class="fa-solid fa-gears"></i> {t("settings")}
                        </Link></li>
                    </div>
                </div>
    )
}
