import React from 'react'
import LogoPageLogo from '../../../assets/Image/LogoPageLogo.png'
export default function LogoPage() {
    return (
        <div className='logoPageLogo'>
            <img src={LogoPageLogo} />
            <h6><span>X</span>.Videos</h6>
            <div className='bottomWhiteLine'></div>
        </div>
    )
}
