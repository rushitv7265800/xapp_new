import React, { useEffect, useState } from 'react'
import LogoPageLogo from '../../../assets/Image/LogoPageLogo.png'
import { useNavigate } from 'react-router-dom'
export default function LogoPage() {
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            navigate("/signIn")
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
