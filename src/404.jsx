import React from 'react'
import "/public/css/style.css"
import notFound from "../public/img/404.jpg"

export default function NotFound() {
  document.title = 'Page Not Found';

  return (
    <div className="text-center bg-white notFound pt-3" style={{height:"100vh", width: "100%"}}>
        <div className="img">
            <img src={notFound} alt="" />
        </div>
        <h2 className="fw-bold mt-3">PAGE NOT FOUND</h2>
        <p className="">Sorry, we can't seem to find the page you're looking for.</p>
        <a href="/signup" className="">Go to Sign up Page</a>
    </div>
  )
}
