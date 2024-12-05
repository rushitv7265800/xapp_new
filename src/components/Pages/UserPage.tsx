import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useMatch, useNavigate } from "react-router-dom";
import HomePage from './homePage/HomePage';
import { ReactComponent as HomeSvg } from "../../assets/BottomNavigatorIcons/s.svg"
import { ReactComponent as ShortsSvg } from "../../assets/BottomNavigatorIcons/Group 3.svg";
import { ReactComponent as AddVideoLogo } from "../../assets/BottomNavigatorIcons/Icon.svg"
import { ReactComponent as SubscriptionLogo } from "../../assets/BottomNavigatorIcons/live-svgrepo-com 2.svg";
import { ReactComponent as AccountSvg } from "../../assets/BottomNavigatorIcons/User.svg";
import Grid from '../utils/customComponent/Grid';
import Block from '../utils/customComponent/Block';
import ShortCom from './shortCom/ShortCom';
import VideoComPlay from './videoCom/VideoComPlay';
import VideoCom from './videoCom/VideoCom';
import UserAccountPage from './userProfile/UserAccountPage';
import UserProfile from './userProfile/UserProfile';
import CategoriesCom from './categoriesCom/CategoriesCom';
import EditPageProfile from './userProfile/EditPageProfile';
import VideosUpload from '../../components/uploadComponents/VideosUpload';
import ShortsUpload from '../../components/uploadComponents/ShortsUpload';
// import History from './userProfile/History';


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
            name: "Home", icon: HomeSvg, show: true, router: "/user/home"
        },
        { name: "Shorts", icon: ShortsSvg, show: true, router: "/user/shorts" },
        { name: "Add Video", icon: AddVideoLogo, show: true, router: "/user/Videos" },
        { name: "Subscription", icon: SubscriptionLogo, show: true, router: "" },
        { name: getDataLocal?.userImg ? getDataLocal?.userName : "You", type: "userImg", icon: AccountSvg, show: true, router: "/user/userPage" }
    ]
    const [showBottomBar, setShowBottomBar] = useState(true);
    const location = useLocation()
    const navigate = useNavigate()
    const [currentScreen, setCurrentScreen] = useState(location?.pathname);

    // useEffect(() => {
    //     setCurrentScreen(location?.pathname)
    //     console.log(" currentScreen === location.pathname", currentScreen === location.pathname)
    // }, [location])

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
                        <Route path={`userPage`} element={<UserAccountPage />} />
                        <Route path={`userProfile`} element={<UserProfile />} />
                        <Route path={`videosUpload`} element={<VideosUpload />} />
                        <Route path={`shortsUpload`} element={<ShortsUpload />} />
                        <Route path={`editPageProfile`} element={<EditPageProfile />} />
                        <Route path={`categories`} element={<CategoriesCom />} />
                        {/* <Route path={`history`} element={<History />} /> */}

              


                    </Routes>
                    {showBottomBar && BottomScreensName[0].show && (
                        <Block className="bottom-navigator fixed bottom-0 left-0 z-50 w-full bg-white transition-transform transform duration-300 ease-in-out">
                            <div className="grid h-auto justify-between items-start py-1.5 w-full grid-cols-5 font-medium bg-black">
                                {BottomScreensName?.map((item: any, index: any) => {
                                    const IconComponent = item.icon;
                                    const color =
                                        currentScreen === item.name ? "#8000FF" : "#0000";
                                    return (
                                        <button
                                            type="button"
                                            key={index}
                                            onClick={() => {
                                                setCurrentScreen(() => item.name);
                                                navigate(item?.router)
                                            }}
                                            style={{ height: "100%", justifyContent: "space-evenly" }}
                                            className="inline-flex flex-col items-center justify-center button-nospan"
                                        >
                                            <Grid className={`items-center justify-center font-roboto ${currentScreen === item.name && "bottomIconNavigatation"} `}>
                                                <IconComponent fill={'#0000'} />
                                                {item.name === currentScreen && (
                                                    <span className="h-[3px]"></span>
                                                )}
                                            </Grid>
                                            {
                                                currentScreen === item?.name && (
                                                    <Grid
                                                        style={{ background: `${currentScreen === item?.name ? color : ""}`, width: "8px", height: "8px", borderRadius: "50%" }}
                                                        className={
                                                            "text-[11px] mt-1 tracking-normal text-white font-thin font-roboto"
                                                        }
                                                    >
                                                    </Grid>
                                                )
                                            }
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
