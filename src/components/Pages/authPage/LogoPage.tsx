import React, { useEffect, useState } from 'react'
import LogoPageLogo from '../../../assets/Image/LogoPageLogo.png'
import { useNavigate } from 'react-router-dom'
export default function LogoPage() {
    const navigate = useNavigate()
    const getToken = localStorage.getItem("token")

    useEffect(() => {
        setTimeout(() => {
            navigate("/signIn")
            if (getToken) {
                navigate("/user/home")
            }
        }, 500);
    }, [])

    return (
        <div className='logoPageLogo'>
            <img src={LogoPageLogo} />
            <h6><span>X</span>.Videos</h6>
            <div className='bottomWhiteLine'></div>
        </div>
    )
}
