import React, { useContext, useEffect, useState } from 'react'
import "/public/css/style.css"
import { Link, json } from 'react-router-dom'
import dotenv from "dotenv";
import path from 'path'
import axios from '../utils/axios';
import { AuthContext } from '../utils/Context';
import logo from "../../public/img/logo.png"
import login_image from "../../public/img/login_image.png"
import { CookiesProvider, useCookies } from "react-cookie";
import { useTranslation } from 'react-i18next';

export default function Login() {
    document.title = 'Admin Login | Login to continue to the dashboard';
    const [cookie, setCookie] = useCookies("")

    const { t, i18n } = useTranslation();

    const login = () => {
        const input = document.querySelectorAll(".r_input")
        const submit = document.querySelector(".submit_")

        if (input[0].value == "") {
            input[0].classList.add("error")
            return
        }

        if (input[1].value == "") {
            input[1].classList.add("error")
            return
        }

        input[0].classList.remove("error")
        input[1].classList.remove("error")
        submit.innerHTML = `${t("processing")} <div class="text-white spinner-border spinner-border-sm"></div>`

        axios.post("/user/admin-login", {
            email: input[0].value,
            password: input[1].value
        })
            .then(
                res => {
                    console.log(res)
                    setCookie("user", res.data.user)
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        text: `${t("redirect")}`,
                        showConfirmButton: false,
                        timer: 1500
                    });

                    setTimeout(() => {
                        window.location.href = "/admin-panel"
                    }, 2000)
                }
            )
            .catch(error => {
                submit.innerHTML = "Login"
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    text: `${t("invalid")}`,
                    showConfirmButton: false,
                    timer: 1500
                });
                console.log(error)
            })
    }

    const mobileAlert = () => {
        Swal.fire({
            title: `${t("not_support1")}`,
            text: `${t("not_support")}`,
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Okay"
          }).then((result) => {
          });
    }

    return (
        <div className="login bg-white d-flex">
            <div className="first">
                <div className="img">
                    <img src={logo} alt="" width={70} />
                </div>

                <div className="mt-3">
                    <h2 className="fw-bold">{t('welcome')}</h2>
                    <p className="text-muted ft mt-3">{t('description')}</p>
                </div>

                <div className="imputs mt-4">
                    <div className="mb-3">
                        <label className='text-muted ft' htmlFor="">{t('email')}</label>
                        <input type="text" className='r_input' placeholder={t('email')} />
                    </div>

                    <div className="mb-3">
                        <label className='text-muted ft' htmlFor="">Password</label>
                        <input type="password" className='r_input' placeholder='Enter your password' />
                    </div>

                    <button onClick={login} className="btn d_submit submit_ btn-success bg text-white mt-4">{t('welcome')}</button>
                    <button onClick={mobileAlert} className="btn submit_ m_submit btn-success bg text-white mt-4">{t('welcome')}</button>
                </div>

            </div>

            <div className="sec">
                <div className="img">
                    <div className="over">
                        <h2 className="text-center fw-bold text-white">{t('welcome_to')} Serre Admin</h2>
                        <p className="text-white text-center ft">{t('perform')} </p>
                    </div>
                    <img src={login_image} alt="" />
                </div>
            </div>
        </div>
    )
}
