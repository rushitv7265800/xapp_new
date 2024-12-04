import Grid from "../../utils/customComponent/Grid";
import Image from "../../utils/customComponent/Image";
import { Link, useNavigate } from "react-router-dom";
import Block from "../../utils/customComponent/Block";
import AccountLogo from "../../../assets/FrontpageIcons/VideoCreator.avif";
import { ReactComponent as Cast } from "../../../assets/AccountIcons/Cast.svg";
import { ReactComponent as Google } from "../../../assets/AccountIcons/Google.svg";
import { ReactComponent as VerticleDots } from "../../../assets/FrontpageIcons/VerticalDots.svg";
import { ReactComponent as SwitchAccount } from "../../../assets/AccountIcons/SwitchAccount.svg";
// import Incognito from "../../assets/AccountIcons/Incognito.svg";
import { ReactComponent as GreaterThan } from "../../../assets/VideoPlayIcons/GreaterThanArrow.svg";
import { ReactComponent as Setting } from "../../../assets/AccountIcons/Settings.svg";
import { ReactComponent as Search } from "../../../assets/FrontpageIcons/SearchIcon.svg";
import { ReactComponent as BottomPlaylistIcon } from "../../../assets/AccountIcons/BottomPlaylistIcon.svg";
import { ReactComponent as Notification } from "../../../assets/FrontpageIcons/Notification.svg";
import LogOutIcon from "../../../assets/FrontpageIcons/logOutIcon.png";
import VideoImage from "../../../assets/FrontpageIcons/VideoImage.jpg";
import { ReactComponent as Like } from "../../../assets/FrontpageIcons/LikeIcon.svg";
import { ReactComponent as Plus } from "../../../assets/AccountIcons/AddIcon.svg";
import { ReactComponent as HistoryIcon } from "../../../assets/AccountIcons/HistoryIcon.svg";
import { ReactComponent as PlusIcon } from "../../../assets/AccountIcons/PlusIcon.svg";
import { ReactComponent as YourVideos } from "../../../assets/AccountIcons/YourVideos.svg";
import { ReactComponent as Download } from "../../../assets/VideoPlayIcons/download.svg";
import { ReactComponent as Movies } from "../../../assets/AccountIcons/Movies.svg";
import { ReactComponent as SaveIcon } from "../../../assets/AccountIcons/SaveIcon.svg";
import { ReactComponent as Watchlater } from "../../../assets/AccountIcons/Watchlater.svg";
import { ReactComponent as UserIcon } from "../../../assets/AccountIcons/UserIcon.svg";
import { ReactComponent as Yourmovies } from "../../../assets/AccountIcons/Yourmovies.svg";
import { ReactComponent as YoutubePremium } from "../../../assets/AccountIcons/YoutubeSimple.svg";
import { ReactComponent as TimeWatched } from "../../../assets/AccountIcons/TimeWatched.svg";
import { ReactComponent as Help } from "../../../assets/AccountIcons/Help.svg";
import { ReactComponent as Tick } from "../../../assets/AccountIcons/Tick.svg";
import { useEffect, useState } from "react";
import Header from '../../utils/customComponent/Header';

export default function UserAccountPage() {
    // const[signedUser, setSignedUser]=useState({})
    const navigate = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem("Signup_user");
        if (user) {
            // setSignedUser(JSON.parse(user));
            console.log("Signeeeeee", JSON.parse(user)); // Log the user data
        }
    }, []); // The empty array ensures this effect runs only once after the initial render

    const handleViewChannle = () => {
        console.log("viewChannle");
        navigate("/viewChannle");
    };

    const specifications = [
        [<SwitchAccount />, "Switch Account"],
        [<Google />, "Google Account"],
        // [Incognito, "Turn on Incoginato"],
    ];
    const VideoTitle = ["Liked Videos", "Shorts", "Doraemon vs Shinchan..."];
    const ChannelName = ["Private", "The Motor Mouth"];
    const OtherAccounts = [
        ["bushracuteshort@gmail.com", AccountLogo, "Bushra Cute Shorts", "1.4k"],
        ["Nobiyan@1999@gmail.com", AccountLogo, "Nobita Nobi", "900k"],
        ["Doraemondoraworld@gmail.com", AccountLogo, "Doraemon", "1.2M"],
    ];
    const [account, setAccount] = useState(false);

    const hadnleLogOut = () => {
        localStorage.clear()
        navigate("/signIn")
    }

    const HeaderCom = () => {
        return (
            <Block
                className={
                    "flex justify-end fixed z-10 w-full bg-black pt-3 space-x-5.5 p-4"
                }
            >
                <Cast />
                <Notification />
                <Search />
                <Link to={"/settings"}>
                    <Setting />
                </Link>
            </Block>
        );
    };

    const HistoryVideos = () => {
        return (
            <Block className="overflow-x-auto scrollbar-none mt-2 flex space-x-3">
                <Grid>
                    <Block className="flex items-center relative ml-4">
                        <Grid className={"w-[190px] flex items-center"}>
                            <Grid className="w-[100%] h-1.5 rounded-t-md bg-gray-600"></Grid>
                            <Grid
                                className={
                                    "w-6 text-white font-bold text-[16px] gap-1.5 items-center top-7 left-15 absolute flex"
                                }
                            >
                                <Like />
                                1892
                            </Grid>
                            <img className={"rounded-md"} src={VideoImage} />
                        </Grid>
                    </Block>
                    <Grid className={"leading-tight ml-4"}>
                        <Block className={"flex h-12 items-start justify-between"}>
                            <Grid
                                className={"text-[15px] text-white font-normal opacity-[90%]"}
                            >
                                {VideoTitle[0]}
                            </Grid>
                            <Grid className={"flex items-start"}>
                                <VerticleDots />
                            </Grid>
                        </Block>
                        <Grid className={"text-[13px] text-white font-thin opacity-[70%]"}>
                            {ChannelName[0]}
                        </Grid>
                    </Grid>
                </Grid>
                {Array(4)
                    .fill(null)
                    .map((_, index) => (
                        <Grid>
                            <Block key={index} className="flex items-center mt-2">
                                <Grid className={"w-[190px]"}>
                                    <img className={"rounded-md"} src={VideoImage} />
                                </Grid>
                            </Block>
                            <Grid className={"leading-tight"}>
                                <Block className={"flex h-12 items-start"}>
                                    <Grid
                                        className={
                                            "text-[15px] text-white font-normal opacity-[90%]"
                                        }
                                    >
                                        {VideoTitle[2]}
                                    </Grid>
                                    <Grid className={"flex items-start h-8"}>
                                        <VerticleDots />
                                    </Grid>
                                </Block>
                                <Grid
                                    className={"text-[13px] text-white font-thin opacity-[70%]"}
                                >
                                    {ChannelName[1]}
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}
            </Block>
        );
    };

    const AccountDialog = () => {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-20">
                {/* Overlay */}
                <div
                    className="fixed inset-0 bg-black bg-opacity-50"
                    onClick={() => setAccount(false)}
                ></div>

                <Grid className="fixed z-10 left-15 right-0 h-[60%] w-[70%] bg-[#242424] overflow-y-auto overflow-hidden">
                    <Block className={"flex items-center px-7 justify-between"}>
                        <Grid className={"text-[18px] text-white font-medium"}>
                            Accounts
                        </Grid>
                        <Grid className={"text-[40px] text-white font-thin mb-2"}>+</Grid>
                    </Block>
                    <Grid className={"px-7"}>
                        <Grid className={"text-[15px] text-white"}>Mohan Mangal</Grid>
                        <Grid
                            className={"text-[15px] text-white opacity-[50%] font-normal"}
                        >
                            mohanmangal12@gmail.com
                        </Grid>
                        <div className="border-t my-3 border-gray-400"></div>
                        <Block className={"flex items-start space-x-3"}>
                            <Grid className={"mb-7"}>
                                <img className={"w-10 rounded-full"} src={AccountLogo} />
                            </Grid>
                            <Grid className={"space-y-2"}>
                                <Grid className={"leading-tight"}>
                                    <Grid className={"text-[18px] text-white"}>Mohan Mangal</Grid>
                                    <Grid
                                        className={
                                            "text-[13px] text-white opacity-[50%] font-normal"
                                        }
                                    >
                                        mohanmangal12@gma...
                                    </Grid>
                                    <Grid
                                        className={
                                            "text-[13px] text-white opacity-[50%] font-normal"
                                        }
                                    >
                                        2 subscribers
                                    </Grid>
                                </Grid>
                                <Grid className={"text-[15px] text-blue-400 font-normal"}>
                                    Edit Channel
                                </Grid>
                            </Grid>
                            <Grid className={"mb-7"}>
                                <div className={"w-10 rounded-full"}><Tick /></div>
                            </Grid>
                        </Block>
                    </Grid>
                    <div className="border-[2px] my-3 border-[#4b4b4b]"></div>
                    <Grid className={"flex gap-y-2 px-7 h-[40%]"}>
                        <Grid className={"text-white text-[15.5px] font-bold"}>
                            Other accounts
                        </Grid>
                        <Grid
                            className={
                                "space-y-3 h-[90%] mb-1 overflow-y-auto scrollbar-thin"
                            }
                        >
                            {OtherAccounts.map((_, i) => (
                                <Grid className={"flex space-y-3"}>
                                    <Grid
                                        className={
                                            "text-[15px] font-normal text-white opacity-[60%]"
                                        }
                                    >
                                        {OtherAccounts[i][0].length >= 19
                                            ? OtherAccounts[i][0].substring(0, 19) + "..."
                                            : OtherAccounts[i][0]}
                                    </Grid>
                                    <Block className={"space-x-4"}>
                                        <Grid>
                                            <img
                                                className={"w-8 rounded-full"}
                                                src={OtherAccounts[i][1]}
                                            />
                                        </Grid>
                                        <Grid className={"leading-tight"}>
                                            <Grid className={"text-[15px] font-normal text-white"}>
                                                {OtherAccounts[i][2]}
                                            </Grid>
                                            <Grid
                                                className={
                                                    "text-[13px] opacity-[60%] font-normal text-white"
                                                }
                                            >
                                                {OtherAccounts[i][3]}
                                            </Grid>
                                        </Grid>
                                    </Block>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <div className="border-t border-gray-400"></div>
                    <Grid className={"flex mt-1 space-y-3 pl-7"}>
                        <Grid
                            className={"text-[18px] text-white font-normal opacity-[50%]"}
                        >
                            Manage accounts
                        </Grid>
                        <Grid className={"text-[18px] text-blue-400 font-normal"}>
                            Learn more about account opt...
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    };

    const PlaylistVideos = () => {
        return (
            <Block className="overflow-x-auto scrollbar-none mt-2 flex space-x-3">
                <Grid>
                    <Block className="flex items-center relative ml-4">
                        <Grid className={"w-[190px] flex items-center"}>
                            <Grid className="w-[95%] h-1.5 rounded-t-md bg-gray-600"></Grid>
                            <Grid
                                className={
                                    "w-6 text-white font-bold text-[16px] gap-1.5 items-center top-7 left-15 absolute flex"
                                }
                            >
                                <Like />
                                1892
                            </Grid>
                            <img className={"rounded-md"} src={VideoImage} />
                        </Grid>
                    </Block>
                    <Grid className={"ml-4 leading-tight mt-2"}>
                        <Block className={"flex justify-between"}>
                            <Grid
                                className={"text-[15px] text-white font-normal opacity-[90%]"}
                            >
                                {VideoTitle[0]}
                            </Grid>
                            <VerticleDots />
                        </Block>
                        <Grid className={"text-[13px] text-white font-thin opacity-[70%]"}>
                            {ChannelName[0]}
                        </Grid>
                    </Grid>
                </Grid>
                {Array(4)
                    .fill(null)
                    .map((_, index) => (
                        <Grid>
                            <Block key={index} className="flex items-center mt-2">
                                <Grid className={"w-[190px]"}>
                                    <img className={"rounded-md"} src={VideoImage} />
                                </Grid>
                            </Block>
                            <Grid className={"leading-tight mt-2"}>
                                <Block className={"flex justify-between"}>
                                    <Grid
                                        className={
                                            "text-[15px] text-white font-normal opacity-[90%]"
                                        }
                                    >
                                        {VideoTitle[0]}
                                    </Grid>
                                    <VerticleDots />
                                </Block>
                                <Grid
                                    className={"text-[13px] text-white font-thin opacity-[70%]"}
                                >
                                    {ChannelName[1]}
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}
                <Grid className={"p-4 px-5 flex justify-center gap-3 items-center"}>
                    <Grid>
                        <Plus />
                    </Grid>
                    <Grid className={"w-[90px] flex items-center"}>
                        <Grid
                            className={"text-[16px] font-normal text-white opacity-[90%]"}
                        >
                            New playlist
                        </Grid>
                    </Grid>
                </Grid>
            </Block>
        );
    };

    const OtherCredentials = () => {
        return (
            <Block
                className={
                    "overflow-x-auto scrollbar-none space-x-2 pl-3 py-2 flex items-center mt-3"
                }
            >
                {specifications?.map((item: any) => (
                    <Block
                        onClick={() => item[1] == "Switch Account" && setAccount(true)}
                        className={
                            "flex items-center justify-center px-6 py-2 rounded-3xl bg-[#242424]"
                        }
                    >
                        <div className={"w-5"}>{item[0]}</div>
                        <Block
                            className={"text-[15px] w-40 flex justify-center text-white"}
                        >
                            {item[1]}
                        </Block>
                    </Block>
                ))}
            </Block>
        );
    };

    const History = () => {
        return (
            <Grid className={"mt-4"}>
                <Block className={"px-4 justify-between"}>
                    <Grid className={"text-[21px] text-white font-bold"}>Recent</Grid>
                    <Link to="/history">
                        <Grid
                            className={
                                "px-4 py-1.5 text-[15px] text-white font-bold rounded-3xl opacity-[90%] border-[0.06rem] border-white"
                            }
                        >
                            View all
                        </Grid>
                    </Link>
                </Block>
            </Grid>
        );
    };
    const Playlist = () => {
        return (
            <Grid className={"mt-4"}>
                <Block className={"px-4 justify-between"}>
                    <Grid className={"text-[21px] text-white font-bold"}>Recent</Grid>
                    <Link to="/playlist">
                        <Grid
                            className={
                                "px-4 py-1.5 text-[15px] text-white font-bold rounded-3xl opacity-[90%] border-[0.06rem] border-white"
                            }
                        >
                            View all
                        </Grid>
                    </Link>
                </Block>
            </Grid>
        );
    };

    return (
        <Grid className={"flex bg-black font-roboto showAccount"}>
            <Header />
            {/* <Block className={"px-3 space-x-3 mt-18"}>
                <img className={"w-30 rounded-full"} src={AccountLogo} />
                <Grid className={"leading-tight"}>
                    <Grid
                        className={"text-[24px] opacity-[90%] font-extrabold text-white"}
                    >
                    </Grid>
                    <Grid>
                        <Block className={"gap-3"}>
                            <Grid
                                className={"text-[12px] opacity-[90%] font-normal text-white"}
                            >
                                @manshdeepdhakad1212
                            </Grid>
                            <Grid
                                className={
                                    "w-[3.5px] h-[3.5px] flex items-center rounded-full bg-white"
                                }
                            ></Grid>

                            <Block
                                style={{ cursor: "pointer" }}
                                className={
                                    "text-[12px] justify-center opacity-[70%] font-normal text-white"
                                }
                                onClick={() => handleViewChannle()}
                            >
                                View Channel
                                <GreaterThan />
                            </Block>
                        </Block>
                    </Grid>
                </Grid>
            </Block> */}
            {/* <OtherCredentials /> */}
            <div style={{ borderBottom: "1px solid #6C6C6C", paddingBottom: "24px" }}>
                <History />
                <HistoryVideos />
            </div>
            {/* <Playlist /> */}
            {/* <PlaylistVideos /> */}

            <Grid className={"flex px-6 pt-7 pb-5"}>
                <Grid className="showBottomBoxButton">
                    <Block className={"gap-7 showAccBtn mt-4"} onClick={() => navigate("/user/userProfile")}>
                        <UserIcon style={{ width: "30px", height: "30px", marginLeft: "-4px" }} />
                        <Grid className={"text-white text-[16px]"}>View Profile</Grid>
                    </Block>
                    <Block className={"gap-7 showAccBtn mt-4"}>
                        <HistoryIcon />
                        <Grid className={"text-white text-[16px]" }onClick={() => navigate("/user/history")}>History</Grid>
                    </Block>
                    <Block className={"gap-7 showAccBtn mt-4"}>
                        <YourVideos />
                        <Grid className={"text-white text-[16px]"}>Your Videos</Grid>
                    </Block>

                    <Block className={"flex showAccBtn justify-between items-center mt-4"}>
                        <Block className={"gap-5.5"}>
                            <Download style={{ width: "32px", height: "32px", marginLeft: "-4px" }} />
                            <Grid className={"text-white text-[16px] leading-tight"}>
                                <Grid>Downloads</Grid>
                                <Grid className={"text-white text-[14px] mt-2 opacity-[60%]"}>1 video</Grid>
                            </Grid>
                        </Block>
                        <Block className={"w-7"}>
                            <Tick fill="#8000FF" />
                        </Block>
                    </Block>
                    <Block className={"gap-7 showAccBtn mt-4"}>
                        <Yourmovies />
                        <Grid className={"text-white text-[16px]"}>Your movies</Grid>
                    </Block>
                    <Block className={"flex showAccBtn justify-between items-center mt-4"}>
                        <Block className={"gap-5.5"}>
                            <Watchlater />
                            <Grid className={"text-white text-[16px] leading-tight"}>
                                <Grid>Watch later</Grid>
                                <Grid className={"text-white text-[14px] mt-2 opacity-[60%]"}>4 unwatched videos</Grid>
                            </Grid>
                        </Block>
                    </Block>
                    <Block className={"gap-7 showAccBtn mt-4"} onClick={() => hadnleLogOut()}>
                        <img src={LogOutIcon} style={{ width: "24px", height: "24px" }} />
                        <Grid className={"text-white text-[16px]"}>Log Out</Grid>
                    </Block>
                </Grid>
            </Grid>
            <div style={{ borderTop: "1px solid #6C6C6C", paddingTop: "10px" }}>
                <Block className={"px-4 justify-between"}>
                    <Grid className={"text-[21px] text-white font-bold"}>Playlists</Grid>
                    <Link to="/history">
                        <Block
                            className={
                                "px-4 py-1.5 text-[15px] text-white font-bold flex  border-white"
                            }
                        >
                            Recently added
                            <div className="ml-3"><BottomPlaylistIcon /></div>
                        </Block>
                    </Link>
                </Block>
                <div className="px-4 mb-18">
                    <Block className={"gap-7 showAccBtn mt-4"}>
                        <PlusIcon style={{ color: "#8000FF", fontWeight: "bold" }} />
                        <Grid className={"text-white text-[16px]"} style={{ color: "#8000FF", fontWeight: "bold" }}>New Playlist</Grid>
                    </Block>

                    <Block className={"flex showAccBtn justify-between items-center mt-4"}>
                        <Block className={"gap-5.5"}>
                            <SaveIcon />
                            <Grid className={"text-white text-[16px] leading-tight"}>
                                <Grid>Liked Videos</Grid>
                                <Grid className={"text-white text-[14px] mt-2 opacity-[60%]"}>50 videos</Grid>
                            </Grid>
                        </Block>
                    </Block>
                </div>
            </div>
            {/* <Grid className={"w-full h-[0.09rem] opacity-[70%] bg-slate-500"}></Grid>
            <Grid className={"flex px-6 pt-7 pb-5"}>
                <Grid>
                    <Block className={"gap-5.5 mb-4"} style={{ cursor: "pointer" }} onClick={() => hadnleLogOut()}>
                        <Image src={LogOutIcon} />
                        <Grid className={"text-white text-[16px] leading-tight"}>
                            Log Out
                        </Grid>
                    </Block>
                    <Block className={"gap-7 mt-3"}>
                        <Movies />
                        <Grid className={"text-white text-[16px]"}>Your Movies</Grid>
                    </Block>
                    <Block className={"flex items-center mt-4"}>
                        <Link to={"/premiumpage"}>
                            <Block className={"gap-7  mt-3"}>
                                <YoutubePremium />
                                <Grid className={"text-white text-[16px] leading-tight"}>
                                    Get Youtube Premium
                                </Grid>
                            </Block>
                        </Link>
                    </Block>
                </Grid>
            </Grid>
            <Grid className={"w-full h-[0.09rem] opacity-[70%] bg-slate-500"}></Grid>
            <Grid className={"flex px-6 pt-7 pb-5"}>
                <Grid>
                    <Block className={"gap-7"}>
                        <TimeWatched />
                        <Grid className={"text-white text-[16px]"}>Time Watched</Grid>
                    </Block>
                    <Block className={"flex items-center mt-4"}>
                        <Block className={"gap-5.5"}>
                            <Help />
                            <Grid className={"text-white text-[16px] leading-tight"}>
                                Help & feedback
                            </Grid>
                        </Block>
                    </Block>

                </Grid>
            </Grid>
            <Grid
                className={"w-full h-[0.09rem] opacity-[70%] bg-slate-500 mb-18.5"}
            ></Grid> */}
            {account && <AccountDialog />}
        </Grid>
    );
}
