import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useMatch } from "react-router-dom";
import HomePage from './homePage/HomePage';
import { ReactComponent as HomeSvg } from "../../assets/BottomNavigatorIcons/Home.svg"
import { ReactComponent as ShortsSvg } from "../../assets/BottomNavigatorIcons/ShortsLogo.svg";
import { ReactComponent as AddVideoLogo } from "../../assets/BottomNavigatorIcons/AddVideo.svg"
import { ReactComponent as SubscriptionLogo } from "../../assets/BottomNavigatorIcons/Subscription.svg";
import { ReactComponent as AccountSvg } from "../../assets/BottomNavigatorIcons/Account.svg";
import Grid from '../utils/customComponent/Grid';
import Block from '../utils/customComponent/Block';
import ShortCom from './shortCom/ShortCom';
import VideoComPlay from './videoCom/VideoComPlay';
import VideoCom from './videoCom/VideoCom';


export default function UserPage() {
    const userData = localStorage.getItem("user");
    let getDataLocal: any = {};
    if (userData) {
        try {
            getDataLocal = JSON.parse(userData);
        } catch (error) {
            console.error("Error parsing JSON data:", error);
        }
    }
    const BottomScreensName = [
        {
            name: "Home", icon: HomeSvg, show: true, router: <HomePage />
        },
        { name: "Shorts", icon: ShortsSvg, show: false, router: <ShortCom /> },
        { name: "Add Video", icon: AddVideoLogo, show: true, router: "" },
        { name: "Subscription", icon: SubscriptionLogo, show: true, router: "" },
        { name: getDataLocal?.userImg ? getDataLocal?.userName : "You", type: "userImg", icon: AccountSvg, show: true, router: "" }
    ]
    const [showBottomBar, setShowBottomBar] = useState(true);
    const location = useLocation()
    const [currentScreen, setCurrentScreen] = useState(location?.pathname);

    useEffect(() => {
        setCurrentScreen(location?.pathname)
    }, [location])

    return (
        <div>

            <Grid className="md:items-center w-full h-[100vh]">
                <Grid className="w-full">
                    {/* <ShowScreen /> */}
                    <Routes>
                        <Route path={`home`} element={<HomePage />} />
                        <Route path={`shorts`} element={<ShortCom />} />
                        <Route path={`Videos`} element={<VideoCom pb={0} />} />
                        <Route path={`playVideo`} element={<VideoComPlay />} />
                    </Routes>
                    {showBottomBar && BottomScreensName[0].show && (
                        <Block className="bottom-navigator fixed bottom-0 left-0 z-50 w-full bg-white transition-transform transform duration-300 ease-in-out">
                            <div className="grid h-auto justify-between items-start pt-1.5 w-full grid-cols-5 font-medium bg-black">
                                {BottomScreensName?.map((item: any, index: any) => {
                                    const IconComponent = item.icon;
                                    const color =
                                        currentScreen === item.name ? "#ff86ac" : "#0000";
                                    return (
                                        <button
                                            type="button"
                                            key={index}
                                            onClick={() => {
                                                setCurrentScreen(() => item.name);
                                            }}
                                            className="inline-flex flex-col items-center justify-center button-nospan"
                                        >
                                            <Grid className="items-center justify-center font-roboto">
                                                {/* {
                          item?.type === "userImg"
                            ?
                            // <img src={getDataLocal?.userImg ? baseURL + getDataLocal?.userImg : AccountSvg} style={{ borderRadius: "40px", width: "28px", height: "28px", objectFit: "cover", objectPosition: "top" }} />
                            <img src={userData_?.userImg ? userData_?.userImg : AccountSvg} onError={(e: any) => e.target.src = AccountSvg} style={{ borderRadius: "40px", width: "28px", height: "28px", objectFit: "cover", objectPosition: "top" }} />
                            :
                            <IconComponent fill={color} />
                        } */}
                                                <IconComponent fill={color} />
                                                {item.name === currentScreen && (
                                                    <span className="h-[3px]"></span>
                                                )}
                                            </Grid>
                                            <Grid
                                                className={
                                                    "text-[11px] mt-1 tracking-normal text-white font-thin font-roboto"
                                                }
                                            >
                                                {index == 2 ? "" : item.name}
                                            </Grid>
                                        </button>
                                    );
                                })}
                            </div>
                        </Block>
                    )}
                </Grid>
            </Grid>

            {/* <BottomNavigator screens={BottomScreensName} initialScreen="Home" /> */}
        </div>
    )
}
