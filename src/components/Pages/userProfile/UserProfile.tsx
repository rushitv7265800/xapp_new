import { useNavigate } from 'react-router-dom';
import UserProfileBg from '../../../assets/AccountIcons/userProfileBg.png'
import { baseURL, userData_ } from '../../utils/config'
import { AppDispatch, RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as BottomPlaylistIcon } from "../../../assets/AccountIcons/BottomPlaylistIcon.svg";
import { useEffect, useState } from 'react';
import UserProfileIcon from '../../../assets/auth/User.svg'
import { ReactComponent as AccountSvg } from "../../../assets/BottomNavigatorIcons/Account.svg";
import { getUserProfile } from '../../../redux/slice/authSlice';


import PostImg1 from '../../../assets/postImage/1.png'
import PostImg2 from '../../../assets/postImage/2.png'
import PostImg3 from '../../../assets/postImage/3.png'
import PostImg4 from '../../../assets/postImage/4.png'

const postData = [
    { img: PostImg1, views: "213.2k", duration: "5:14" },
    { img: PostImg2, views: "213.2k", duration: "5:14" },
    { img: PostImg3, views: "213.2k", duration: "5:14" },
    { img: PostImg4, views: "213.2k", duration: "5:14" },
]
const UserProfile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();
    const { userProfile } = useSelector((state: RootState) => state.auth);
    const [userProfileData, setUserProfileData] = useState<any>()
    const [detailsCount, setDetailsCount] = useState(false)

    useEffect(() => {
        dispatch(getUserProfile(userData_?._id))
    }, [])

    useEffect(() => {
        console.log("userProfile", userProfile)
        setUserProfileData(userProfile)
    }, [userProfile]
    )

    const formatNumber = (num) => {
        if (num >= 1e9) {
            return (num / 1e9).toFixed(1) + 'B';  // Billion
        }
        if (num >= 1e6) {
            return (num / 1e6).toFixed(1) + 'M';  // Million
        }
        if (num >= 1e3) {
            return (num / 1e3).toFixed(1) + 'K';  // Thousand
        }
        return num;  // No formatting for smaller numbers
    };

    const getView = userProfileData?.shortView + userProfileData?.videoView
    const totalShort = userProfileData?.totalShort
    const totalVideo = userProfileData?.totalVideo
    const followActiveCount = userProfileData?.followData?.filter(item => item?.userData?.followActive)?.length;
    const visitCount = userProfileData?.followData?.length;

    const userData = {
        name: "Lori Bauer",
        username: "@loribauer",
        profilePic: "/placeholder.svg?height=128&width=128",
        stats: {
            views: formatNumber(getView),
            followers: userProfileData?.follow,
            shorts: totalShort,
            videos: totalVideo
        },
        posts: [...Array(12)].map((_, i) => ({
            id: i,
            image: "/placeholder.svg?height=300&width=300",
            views: `${213.4 + i}k`,
            duration: `5:${10 + i}`,
        })),
    };

    return (
        <div className="min-h-screen bg-black text-white profilePage">
            <div className='profilePageBG'></div>
            <header className="flex items-center justify-between p-4 md:p-6">
                <button className="text-white" onClick={() => navigate("/user/userPage")}>
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        />
                    </svg>
                </button>
                <button className="text-white" onClick={() => navigate("/user/editPageProfile")} style={{ backgroundColor: "#9333ea", padding: "5px 4px", borderRadius: "5px" }}>
                    <svg style={{ fill: "white" }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" id="edit"> <path d="M18.2 24H3.8C1.7 24 0 22.3 0 20.2V5.8C0 3.7 1.7 2 3.8 2H11c.6 0 1 .4 1 1s-.4 1-1 1H3.8C2.8 4 2 4.8 2 5.8v14.3c0 1 .8 1.8 1.8 1.8h14.3c1 0 1.8-.8 1.8-1.8V13c0-.6.4-1 1-1s1 .4 1 1v7.2c.1 2.1-1.6 3.8-3.7 3.8z"></path> <path d="M6 19c-.3 0-.5-.1-.7-.3-.2-.2-.3-.6-.3-.9l1-5c0-.2.1-.4.3-.5l12-12c.4-.4 1-.4 1.4 0l4 4c.4.4.4 1 0 1.4l-12 12c-.1.1-.3.2-.5.3l-5 1H6zm1.9-5.5l-.6 3.2 3.2-.6L21.6 5 19 2.4 7.9 13.5z"></path> </svg>
                </button>
            </header>

            <div className="relative px-4 md:px-6 userProfileDetail" style={{ marginTop: "8%" }}>
                <div className="relative mx-auto w-fit">
                    <div className="relative h-24 w-24 md:h-32 md:w-32 bg-white rounded-full">
                        {
                            userProfileData?.userImg ?
                                <img
                                    src={baseURL + userProfileData?.userImg}
                                    alt="Profile picture"
                                    style={{ width: "100%", height: "100%", objectPosition: "top" }}
                                    className="rounded-full object-cover"
                                />
                                :
                                <AccountSvg
                                    style={{ width: "100%", height: "100%", objectPosition: "top" }}
                                    className="rounded-full object-cover" />
                        }
                        {/* <img
                            src={AccountSvg}
                            alt="Profile picture"
                            style={{ width: "100%", height: "100%", objectPosition: "top" }}
                            className="rounded-full object-cover"
                        /> */}

                    </div>
                </div>
                <div className="mt-4 text-center ">
                    <h1 className="text-xl font-semibold md:text-2xl" style={{ textTransform: "capitalize", display: "flex", justifyContent: "center", alignItems: "center" }}><span>{userProfileData?.fullName}</span>
                        <div style={{ position: "relative" }}><BottomPlaylistIcon style={{ position: "absolute", cursor: "pointer", right: "-38px", top: " -5px", width: "17px", transform: `${detailsCount ? "rotate(180deg)" : "rotate(360deg)"}` }} onClick={() => setDetailsCount(!detailsCount)} /></div></h1>
                    <p className="text-gray-400">{userProfileData?.userName}</p>
                </div>

                <div className="mt-6 flex items-center justify-center text-sm md:gap-2">
                    {/* {Object.entries(userData.stats).map(([key, value], index, arr) => (
                        <div key={key} className="flex items-center gap-1">
                            <p className="font-semibold">{value}</p>
                            <p className="text-gray-400 capitalize">{key}</p>
                            {index < arr.length - 1 && (
                                <span className="text-gray-400 mx-2">|</span>
                            )}
                        </div>
                    ))} */}
                    <div className="flex items-center gap-1">
                        <p className="font-semibold">{formatNumber(getView)}</p>
                        <p className="text-gray-400 capitalize">views</p>
                        <span className="text-gray-400 mx-2">|</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <p className="font-semibold">{followActiveCount}</p>
                        <p className="text-gray-400 capitalize">Followers</p>
                        <span className="text-gray-400 mx-2">|</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <p className="font-semibold">{totalShort}</p>
                        <p className="text-gray-400 capitalize">Shorts</p>
                    </div>
                </div>
                {
                    detailsCount && (
                        <>
                            <div className='mt-3 flex items-center justify-center text-sm md:gap-2'>
                                <div className="flex items-center gap-1">
                                    <p className="font-semibold">{totalVideo}</p>
                                    <p className="text-gray-400 capitalize">Videos</p>
                                    <span className="text-gray-400 mx-2">|</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <p className="font-semibold">{visitCount}</p>
                                    <p className="text-gray-400 capitalize">Visit</p>
                                </div>
                            </div>
                        </>
                    )
                }
            </div >

            <div className="mt-6 flex justify-center">
                <button className=" bg-purple-600 hover:bg-purple-700 py-2 rounded-md font-semibold w-[35%] md:w-[40%] lg:w-[20%]">
                    + Follow
                </button>
            </div>


            <div className="mt-8 mb-8 grid grid-cols-2 gap-2 p-4 sm:grid-cols-3 lg:grid-cols-4 md:gap-4 md:p-6">
                {postData?.map((post, index) => (
                    <div
                        key={index}
                        className="relative aspect-square overflow-hidden rounded-lg"
                    >
                        <img
                            height={50}
                            width={100}
                            src={post?.img}
                            alt={`Post ${index + 1}`}
                            className="h-full w-full object-cover bg-white"
                        />
                        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-black/50 px-2 py-1 backdrop-blur">
                            <span className="text-xs">{post?.views}</span>
                            <span className="text-xs">{post?.duration}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default UserProfile;
