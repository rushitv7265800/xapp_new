import Block from '../../utils/customComponent/Block';
import React, { useState } from 'react';
import { ReactComponent as ArrowList } from "../../../assets/VideoPlayIcons/ArrowList.svg"
import { ReactComponent as Watch } from "../../../assets/VideoPlayIcons/Watch.svg"
import { ReactComponent as Playlist } from "../../../assets/VideoPlayIcons/Playlist.svg"
import WhatsappIcon from "../../../assets/FrontpageIcons/whatsapp.png"
import CommentButton from '../../../assets/FrontpageIcons/commentButton.png'
import { ReactComponent as VectorIcon } from "../../../assets/FrontpageIcons/VectorIcon.svg"
import { ReactComponent as VerticalDots } from "../../../assets/FrontpageIcons/VerticalDots.svg";
import { ReactComponent as CopyLink } from "../../../assets/VideoPlayIcons/CopyLink.svg"
import { ReactComponent as ShareIcon } from "../../../assets/FrontpageIcons/Share.svg"
import InstagramIcon from "../../../assets/FrontpageIcons/instagram.png"
import EmailIcon from "../../../assets/FrontpageIcons/gmail.png"
import LinkdinIcon from "../../../assets/FrontpageIcons/linkedin.png"
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from 'dayjs';
import { useRef, useEffect } from 'react';
// import Play from "../../assets/VideoPlayIcons/Play.svg"
import { ReactComponent as CloseIconShow } from "../../../assets/FrontpageIcons/closeIconShow.svg"
import { ReactComponent as PauseVideoIcon } from "../../../assets/VideoPlayIcons/PauseVideoIcon.svg"
import { ReactComponent as PlayVidIcon } from "../../../assets/VideoPlayIcons/PlayVidIcon.svg"
// import AccountLogo from "../../assets/VideoPlayIcons/AccountLogo.svg"
import { ReactComponent as NotInterested } from "../../../assets/VideoPlayIcons/NotInterested.svg"
import { ReactComponent as DoNotRecommanded } from "../../../assets/VideoPlayIcons/DoNotRecommanded.svg"
import { ReactComponent as Download } from "../../../assets/VideoPlayIcons/download.svg"
// import { ReactComponent as DownArrow } from "../../../assets/VideoPlayIcons/DownArrow.svg"
import { ReactComponent as Share } from "../../../assets/VideoPlayIcons/share.svg"
// import shortImg from "../../assets/FrontpageIcons/shorts_image.webp"
import { ReactComponent as ListenMusic } from "../../../assets/VideoPlayIcons/ListenMusic.svg"
import Grid from '../../utils/customComponent/Grid';
import Image from '../../utils/customComponent/Image';
import { ReactComponent as Tick } from "../../../assets/VideoPlayIcons/Tick.svg"
import { ReactComponent as Music } from "../../../assets/VideoPlayIcons/Music.svg"
import { ReactComponent as Collab } from "../../../assets/VideoPlayIcons/Collab.svg"
import { ReactComponent as GreenScreen } from "../../../assets/VideoPlayIcons/GreenScreen.svg"
import { ReactComponent as CutVideo } from "../../../assets/VideoPlayIcons/CutVideo.svg"
import { ReactComponent as Lock } from "../../../assets/VideoPlayIcons/Lock.svg"
import { ReactComponent as MaximizeVideo } from "../../../assets/auth/MaximizeVideo.svg"
import { ReactComponent as MinimizeVideo } from "../../../assets/auth/MinimizeVideo.svg"
// import CommentBoxComponent from '../CommentBox';
import { ReactComponent as Cross } from "../../../assets/CommentIcons/Cross.svg"
import { ReactComponent as AddIcon } from "../../../assets/VideoPlayIcons/AddIcon.svg"
import { ReactComponent as Like } from "../../../assets/FrontpageIcons/LikeIcon.svg"
import { ReactComponent as Like2 } from "../../../assets/FrontpageIcons/LikeFill.svg"
import AddAppLogo from "../../../assets/FrontpageIcons/addAppLogo.png"
import { ReactComponent as Save } from "../../../assets/VideoPlayIcons/Save.svg"
import { ReactComponent as Star } from "../../../assets/FrontpageIcons/Star.svg"
import { ReactComponent as DownArrow } from "../../../assets/VideoPlayIcons/down_arrow.svg"
import { ReactComponent as Notification } from "../../../assets/FrontpageIcons/Notification.svg"
import { ReactComponent as BlockNotify } from "../../../assets/home/BlockNotify.svg"
import { ReactComponent as AllNotify } from "../../../assets/home/AllNotify.svg"
import { ReactComponent as Unsubscribe } from "../../../assets/home/Unsubscribe.svg"
import { ReactComponent as Clip } from "../../../assets/VideoPlayIcons/Clip.svg"
import { ReactComponent as Report } from "../../../assets/VideoPlayIcons/ReportVideo.svg"
import { ReactComponent as Remix } from "../../../assets/VideoPlayIcons/Short.svg"
import VideoCreator from "../../../assets/FrontpageIcons/VideoCreator.avif";
// import ShareDialog from '../ShareDialog';
import DownloadDialog from './DownloadDialog';
import VideoComponent from './VideoCom';
import { DateTime } from "../../utils/dateFormet/index";
// import AddComponent from './AddComponent';
// import ConnectDevicesDialog from '../../components/Icons/ConnectWithDevices';
import Video_Specification from './VideoSpecification';
import { useLocation, useNavigate } from 'react-router-dom';
// import { getVideoResp } from '../../networking/resp-type';
import { baseURL, userData_ } from '../../utils/config';
import { useDispatch } from 'react-redux';
import { createCommentVideo, getVideoIdToVideo, likeVideo } from '../../../redux/slice/videoSlice';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { createfollowUser, getUserFollow } from '../../../redux/slice/authSlice';
import { RWebShare } from 'react-web-share';
import { Success } from '../../utils/toastServices';
// import UserProfilePage from '../UserProfilePage';

dayjs.extend(relativeTime);
const CategoryBar = () => {
    const [CatSelect, setcatSelect] = useState("")
    const categories = ["All", "Music", "Gaming", "News", "Sports", "Learning", "Live"];
    return (
        <Block className="ml-3 flex overflow-x-auto items-center mt-1 scrollbar-none space-x-2">
            {categories?.map((category, index) => (
                <Block
                    onClick={() => setcatSelect(category)}
                    key={index}
                    className={`cursor-pointer flex-none ${CatSelect == category || (CatSelect == "" && index == 0) ? "text-black font-bold bg-white" : "text-white bg-[#2c2c2c]"} rounded-lg px-4 py-1 whitespace-nowrap text-[16px] font-bold border-none`}
                >
                    {category}
                </Block>
            ))}
        </Block>
    )
}


const AddHeader = () => {
    return (
        <Block className={"p-3 flex justify-between bg-black items-center"}>
            <Block className={"space-x-3 "}>
                <Grid className={"w-9 p-1 bg-white rounded-lg"}>
                    <Image src={AddAppLogo} />
                </Grid>
                <Grid className={"flex"}>
                    <Grid className={"text-[14.5px] text-white"}>Kotak Neo: Stocks Mutual... </Grid>
                    <Grid>
                        <Block>
                            <Grid className={"text-[13px] text-white font-semibold"}>Sponsered</Grid>
                            <Grid className={"w-[0.2rem] h-[0.2rem] rounded-full bg-white ml-1"}></Grid>
                            <Block className={"ml-1 text-[13px] items-center flex opacity-[65%] leading-tight text-white"}>4.5<Block className={"w-[10px] mr-2 ml-0.5 mt-1 pb-1"}> <Star /></Block> FREE</Block>
                        </Block>
                    </Grid>
                </Grid>
            </Block>
            <Block className={"gap-3"}>
                <Grid className={"p-1.5 rounded-full bg-[#242424] w-[34px]"}>
                    <DownArrow />
                </Grid>
                <Grid className={"px-4 py-1.5 bg-blue-500 rounded-3xl text-black font-bold"}>
                    Install
                </Grid>
            </Block>
        </Block>
    )
}



const VideoComPlay = () => {
    useEffect(() => {
        window.scrollTo(0, 0);  // Scroll to the top on component mount
    }, []);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    const { videoOneData } = useSelector((state: any) => state.videos);
    const [videoSpecfication, setVideoSpecification] = useState(false)
    const [share, setShare] = useState(false)
    const locationVideoId = useLocation()
    const [like, setLike] = useState<boolean>(() => {
        const storedLike = localStorage.getItem('like');
        return storedLike ? JSON.parse(storedLike) : false;
    });
    const [clip, setClip] = useState(false)
    const [download, setDownload] = useState(false)
    const [report, setReport] = useState(false)
    const [reportColor, setreportColor] = useState(false)
    const [remix, setRemix] = useState(false)
    const [videoOneDataGet, setVideoOneDataGet] = useState<any>()
    const [vidDes, setVideDes] = useState(false)
    const [save, setSave] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            if (Object?.values(videoOneData)?.length > 0) {
                setVideoOneDataGet(videoOneData)
            } else {
                // setVideoOneDataGet(JSON.stringify(""))
            }
        }, 500);
    }, [videoOneData])
    const checkLikeFilter = videoOneDataGet && videoOneDataGet?.likeData?.filter((item: any) => item?.userId === userData_?._id);
    const checkLike = checkLikeFilter && checkLikeFilter.length > 0 ? checkLikeFilter[0]?.like : false;


    useEffect(() => {
        localStorage.setItem('like', JSON.stringify(like));
    }, [like]);

    useEffect(() => {
        const payload = {
            videoId: locationVideoId?.state?.videoId
        }
        console.log("locationVideoId?.state?.videoId", locationVideoId?.state?.videoId)
        dispatch(getVideoIdToVideo(payload))
    }, [locationVideoId])

    const handleLike = () => {
        const payload = {
            userId: userData_?._id,
            videoId: videoOneDataGet && videoOneDataGet?._id,
            like: like
        }
        dispatch(likeVideo(payload))
        setLike(prevLike => !prevLike);
        // LikeMutation.mutate({ uuid: video._id })
    };

    const handleShare = () => {
        setShare(true)
    }
    const handleClip = () => {
        setClip(true)
    }
    const handleDownload = () => {
        setDownload(true)
    }
    const handleReport = () => {
        setReport(true)
    }
    const handleRemix = () => {
        setRemix(true)
    }
    const handleSave = () => {
        setSave(true)
    }
    const [selectedNotification, setSelectedNotification] = useState<string>('');
    const [animate2, setAnimate2] = useState(false);
    const { userFollowData } = useSelector((state: any) => state.auth);
    const [followDataGet, setFollowDataGet] = useState<any>()
    const [subscribers, setSubscribers] = useState<any>()
    const totalLike = videoOneDataGet && videoOneDataGet?.like
    useEffect(() => {
    }, [videoOneDataGet])

    const specifications = [
        [<Like/>, totalLike, handleLike, true],
        [<Share/>, "Share", handleShare, true],
        [<Clip/>, "Clip", handleClip, false],
        [<Download/>, "Download", handleDownload, true],
        [<Report/>, "Report", handleReport, true],
        [<Remix/>, "Remix", handleRemix, false],
        [<Save/>, "Save", handleSave, false]
    ];

    useEffect(() => {
        dispatch(getUserFollow(userData_?._id))
    }, [])

    useEffect(() => {
        if (userFollowData) {
            setFollowDataGet(userFollowData)
        }
        console.log("getDataCheck userFollowData", userFollowData)
        const getData = userFollowData?.followData?.filter(
            (data: any) => data.userData.userId === userData_?._id
        );
        const getDataCheck = getData ? getData[0] : ""
        setSubscribers(getDataCheck)
        console.log("getDataCheck", getDataCheck)
    }, [userFollowData, userData_])

    // const handleSubscribe2 = () => {
    //     if (isSubscribePost) {
    //         // Unsubscribe
    //         setAnimationPost(true);
    //         setTimeout(() => {
    //             setIsSubscribePost(false);
    //             setAnimationPost(false);
    //         }, 1200);
    //     } else {
    //         // Subscribe
    //         setAnimationPost(true);
    //         setTimeout(() => {
    //             setIsSubscribePost(true);
    //             setAnimationPost(false);
    //         }, 1200);
    //     }
    // }


    const handleSubscribe = () => {
        const filterUnfollowData = userFollowData?.userData?.followActive
        console.log("userFollowData", filterUnfollowData)
        const payload = {
            userId: videoOneDataGet && videoOneDataGet?.userId,
            targetUserId: userData_?._id,
        }
        dispatch(createfollowUser(payload))
    }

    const [getComment, setComment] = useState<boolean>(false);
    const SaveTo = ["Watch", "JS"]
    const RemixList = [[Music, "Sound", "Use the sound from this video"], [Collab, "Collab", "Create alongside this video"], [GreenScreen, "Green screen", "Use this video as a background"], [CutVideo, "Cut", "Use a segment from this video"]]

    const reportList = ["Sexual content", "Violent or repulsive content", "Reality Rathe", "Hateful or abusive content", "Harassment or bullying", "Harmful or dangerous acts", "Misinformation", "Report", "Child abuse", "Legal issue", "Promotes terrorism", "Spam or misleading",]

    const [showCommentBox, setShowCommentBox] = useState<boolean>(false);
    const [notify, setNotyfy] = useState<boolean>(false);

    const handleNotification = () => {
        setNotyfy(true)
    }

    const Video_Specification2 = () => {

        const VideoSpecificationList = [[<ArrowList />, "Play next in queue"], [<Watch />, "Save to watch later"], [<Playlist />, "Save to playlist"], [<Download />, "Download video"], [<Share />, "Share"], [<NotInterested />, "Not interested"], [<DoNotRecommanded />, "Don't recommend channel"], [<Report />, "Report"], [<ListenMusic />, "Listen to youtube music"]]

        return (
            <div className="fixed inset-0 flex items-end justify-center z-20">
                {/* Overlay */}
                <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setVideoSpecification(false)}></div>

                <Grid className="fixed flex items-center z-10 bottom-18 px-4 gap-5 left-0 right-0 h-[47%] bg-[#242424] overflow-y-auto">
                    <Block className={"w-[50px] h-[3px] bg-white rounded-3xl mt-3"}></Block>
                    {VideoSpecificationList.map((item: any) => (
                        <Block className={"w-full flex gap-x-8 items-start"}>
                            <Grid className={"w-6"}>
                                {item[0] && item[0]}
                            </Grid>
                            <Grid className={"text-[16px] font-normal text-white"}>
                                {item[1]}
                            </Grid>
                        </Block>
                    ))}
                </Grid>
            </div>
        )
    }





    const ClipDialog = () => {
        return (
            <div className="fixed inset-0 flex items-end justify-center z-20">
                {/* Overlay */}
                <div className="fixed inset-0 flex bg-black bg-opacity-50" onClick={() => setClip(false)}></div>
                <Grid className="fixed flex items-center justify-center z-10 bottom-0 px-4 gap-5 left-0 right-0 h-[35%] bg-[#242424] overflow-y-auto">
                    This feature is on working...!
                </Grid>
            </div>
        )
    }

    const SubscribeNotifyDialog = () => {
        const handleAllNotify = () => {
            setSelectedNotification('All');
        };
        const handleBlockNotify = () => {
            setSelectedNotification('None');
        };

        const handlePersonalize = () => {
            setSelectedNotification('Personalize');
        };
        const handleUnSubscribe = () => {
            const filterUnfollowData = userFollowData?.userData?.followActive
            const payload = {
                userId: videoOneDataGet && videoOneDataGet?.userId,
                targetUserId: userData_?._id,
                // follow: filterUnfollowData === true ? false : true
            }
            dispatch(createfollowUser(payload))
            setNotyfy(false)
        }
        const notifyList = [
            [<AllNotify/>, "All", handleAllNotify],
            [<Notification/>, "Personalize", handlePersonalize],
            [<BlockNotify/>, "None", handleBlockNotify],
            [<Unsubscribe/>, "Unsubscribe", handleUnSubscribe],

        ]
        return (
            <div className="fixed inset-0 notificationBox flex items-end justify-center z-20">
                {/* Overlay */}
                <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setNotyfy(false)}></div>

                <Grid className="fixed flex items-center z-10 bottom-0 px-4 gap-5 left-0 right-0 h-[58%] bg-[#242424] overflow-y-auto">
                    <Block className={"w-[50px] h-[3px] bg-white rounded-3xl mt-3"}></Block>
                    <Block className={"w-full text-[18px] font-bold justify-between text-white flex items-start"}>
                        Notifications
                        <Cross style={{ width: "25px", cursor: "pointer" }} onClick={() => setNotyfy(false)} />
                    </Block>
                    {notifyList && notifyList?.map((item: any) => (
                        <Block className={"w-full flex justify-between notificatioShow items-start"} onClick={typeof item[2] === 'function' ? item[2] : undefined}>
                            <Block className={"gap-x-5"}>
                                <Grid className={"w-6"}>
                                    {item[0] }
                                </Grid>
                                <Grid className={"text-[16px] font-normal text-white"}>
                                    {item[1]}
                                </Grid>
                            </Block>
                            <Block className={"w-5"}>
                                {
                                    selectedNotification === item[1] ?
                                        <Tick /> : ""
                                }
                            </Block>
                        </Block>
                    ))}
                </Grid>
            </div>
        )
    }

    const RemixDialog = () => {
        return (
            <div className="fixed inset-0 flex items-end justify-center z-20">
                {/* Overlay */}
                <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setRemix(false)}></div>

                <Grid className="fixed flex items-center z-10 bottom-18 px-4 gap-5 left-0 right-0 h-[37%] bg-[#242424] overflow-y-auto">
                    <Block className={"w-[50px] h-[3px] bg-white rounded-3xl mt-3"}></Block>
                    <Block className={"w-full text-[18px] font-bold justify-between text-white flex items-start"}>
                        Remix
                        <Cross onClick={() => setRemix(false)} />
                    </Block>
                    {RemixList.map((item: any) => (
                        <Block className={"w-full flex gap-x-5 items-start"}>
                            <Grid className={"w-6"}>
                                <Image src={item[0] as string} />
                            </Grid>
                            <Grid>
                                <Grid className={"text-[16px] font-normal text-white"}>
                                    {item[1]}
                                </Grid>
                                <Grid className={"text-[14px] font-thin text-white opacity-[70%]"}>
                                    {item[2]}
                                </Grid>
                            </Grid>
                        </Block>
                    ))}
                </Grid>
            </div>
        )
    }
    const ReportDialog = () => {
        return (
            <div className="fixed inset-0 flex items-end justify-center z-20">
                {/* Overlay */}
                <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => (setReport(false), setreportColor(false))}></div>

                <Grid className="fixed flex items-center z-10 top-[7%] left-15 px-4 gap-5 right-0 h-fit bg-[#242424] w-[70%] overflow-y-auto">
                    <Block className={"w-[50px] h-[3px] bg-white rounded-3xl mt-3"}></Block>
                    <Block className={"w-full text-[18px] font-bold justify-between text-white flex items-start"}>
                        Report video
                        <Cross onClick={() => (setReport(false), setreportColor(false))} />
                    </Block>
                    {reportList?.map((item: any) => (
                        <Block onMouseOver={() => setreportColor(true)} className={"w-full flex gap-x-5 items-start"}>
                            <Block className="flex items-center mb-4">
                                <input id={item} type="radio" name="report" value="report" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor={item} className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300">
                                    {item}
                                </label>
                            </Block>
                        </Block>
                    ))}
                    <Block className={"leading-tight text-white font-normal text-[14px] opacity-[60%]"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem recusandae quaerat veritatis accusamus excepturi facere eum tenetur laboriosam facilis laudantium, impedit, voluptatem magni adipisci</Block>
                    <Block className={"justify-end gap-x-2 pb-4 flex w-full"}>
                        <Grid className={"text-blue-500 text-[15px] font-medium"} onClick={() => (setReport(false), setreportColor(false))}>Cancel</Grid>
                        <Grid className={`${!reportColor ? "opacity-[60%]" : ""} text-${!reportColor ? "white" : "red-500"} text-[15px] font-medium`}>Report</Grid>
                    </Block>
                </Grid>
            </div>
        )
    }
    const SaveDialog = () => {
        return (
            <div className="fixed inset-0 flex items-end justify-center z-20">
                {/* Overlay */}
                <div className="fixed inset-0 flex bg-black bg-opacity-50" onClick={() => setSave(false)}></div>
                <Grid className="fixed flex items-center z-10 bottom-10 px-4 gap-3 left-0 right-0 h-[35%] bg-[#242424] overflow-y-auto">
                    <Block className={"w-[50px] h-[3px] bg-white rounded-3xl mt-3"}></Block>
                    <Block className={"w-full text-[18px] font-bold justify-between text-white flex items-start"}>
                        Save video to...
                        <Cross onClick={() => setSave(false)} />
                    </Block>
                    <Block className={"w-full border-[1px] border-gray-400"}></Block>
                    <Block className={"gap-3 w-full"}>
                        <Grid className={"w-7"}>
                            <AddIcon />
                        </Grid>
                        <Grid className={"text-[16px] font-bold text-[#2e8ae1]"}>New Playlist</Grid>
                    </Block>
                    {SaveTo.map((item) => (
                        <Block className={"w-full space-y-2 flex justify-between items-center"}>
                            <Block className="flex items-center">
                                <input
                                    id={item}
                                    type="checkbox"
                                    value=""
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor={item} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    {item}
                                </label>
                            </Block>
                            <Grid className="w-6">
                                <Lock />
                            </Grid>
                        </Block>

                    ))}
                    <Block className={"w-full border-[1px] border-gray-400"}></Block>
                    <Block className={"gap-3 w-full"}>
                        <Grid className={"w-6"}>
                            <Tick />
                        </Grid>
                        <Grid className={"text-md font-medium text-gray-900 dark:text-gray-300"}>Done</Grid>
                    </Block>
                </Grid>
            </div>
        )
    }

    const CommentShowDialog = () => {
        const [commentInput, setCommentInput] = useState<any>()

        const handleCommentSend = () => {
            const payload = {
                userId: userData_?._id,
                comment: commentInput.trim(),
                videoId: videoOneDataGet && videoOneDataGet?._id
            }
            dispatch(createCommentVideo(payload))
            setShowCommentBox(false)
        }
        const handleChange = (e: any) => {
            if (e.target?.value) {
                setCommentInput(e.target.value);
            }

        };
        return (
            <>
                <div className="dialogBoxMain commentDialogue" style={{ width: "100%", maxWidth: "100%" }}>
                    <div className="dialogBoxBody" style={{ width: "100%" }}>
                        <div className={"topLineButton"}>
                            <div onClick={() => setShowCommentBox(false)} className={"showButtonTop"}></div>
                        </div>
                        <div className="relative" style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "20px",
                            alignItems: "center",
                            borderBottom: "1px solid white",
                            paddingBottom: "10px",
                            width: "100%"
                        }}>
                            <h6 style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>Comments</h6>
                            <div onClick={() => setShowCommentBox(false)} style={{
                                cursor: "pointer",
                                zIndex: "11111",
                                width: "35px",
                                height: "35px",
                                borderRadius: "10px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <CloseIconShow style={{ width: "20px" }} />
                            </div>
                        </div>
                        <Block className={"space-x-1.5 gap-2 py-1 w-[100%]"} style={{
                            paddingBottom: "20px",
                            borderBottom: "2px solid #2d2c2c", // Subtle border to separate sections
                            width: "100%"
                        }}>
                            <img className={"rounded-full w-10 h-10"} src={VideoCreator} />

                            <input
                                placeholder={"Add a comment..."}
                                value={commentInput}
                                type={"text"}
                                onChange={handleChange}
                                style={{
                                    borderRadius: "20px",
                                    width: "100%",
                                    padding: "12px 16px",
                                    border: "1px solid #444",
                                    fontSize: "14px",
                                    backgroundColor: "transparent",
                                    color: "white",
                                    outline: "none",
                                    transition: "background-color 0.3s ease",
                                }}
                                className={"text-[14px] h-[40px] text-white pl-3"}

                            />
                            <button onClick={handleCommentSend} style={{ backgroundColor: "#8000FF", marginRight: "10px", cursor: "pointer", color: "white", padding: "5px 10px", borderRadius: "5px", fontSize: "13px" }}>Comment</button>

                        </Block>

                        <div className={"scrollbarShow"} style={{
                            maxHeight: "60vh",
                            overflowY: "scroll",
                            marginTop: "10px",
                            paddingRight: "10px",
                            width: "100%"
                        }}>
                            {
                                videoOneDataGet && videoOneDataGet?.commentData?.map((item: any, index: any) => {
                                    return (
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            borderRadius: "10px",
                                            padding: "6px 12px",
                                            margin: "10px 0px",
                                            width: "100%"
                                        }} onClick={() => setShowCommentBox(true)} key={index}>
                                            <div style={{
                                                display: "flex",
                                                alignItems: "center",
                                                width: "100%"
                                            }}>
                                                <img src={item?.userImg ? baseURL + item?.userImg : ""}
                                                    onError={(e: any) => e.target.src = VideoCreator}
                                                    style={{
                                                        width: "40px",
                                                        height: "40px",
                                                        borderRadius: "60px",
                                                        objectFit: "cover",
                                                        objectPosition: "top"
                                                    }} />
                                                <div style={{
                                                    marginLeft: "10px",
                                                    width: "100%"
                                                }}>
                                                    <div style={{
                                                        display: "flex",
                                                        alignItems: "flex-start"
                                                    }}>
                                                        <h5 style={{
                                                            fontWeight: "bold",
                                                            fontSize: "14px",
                                                            color: "white"
                                                        }}>{item?.userName}</h5>
                                                        <div style={{
                                                            display: "flex",
                                                            alignItems: "center"
                                                        }}>
                                                            <div style={{
                                                                width: "10px",
                                                                height: "8px",
                                                                backgroundColor: "#6C6C6C",
                                                                borderRadius: "50%",
                                                                margin: "0px 10px"
                                                            }}></div>
                                                            <span style={{
                                                                fontSize: "14px",
                                                                width: "100%",
                                                                textAlign: "end",
                                                                color: "#6C6C6C"
                                                            }}>{dayjs(item.date).fromNow()}</span>
                                                        </div>
                                                    </div>
                                                    <p style={{
                                                        marginTop: "10px",
                                                        fontSize: "12px",
                                                        color: "white"
                                                    }}>{item?.comment}</p>
                                                </div>
                                            </div>
                                            <VerticalDots style={{ width: "30px", cursor: "pointer" }} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </>
        );
    };


    const NewVideoDescription = () => {
        return (
            <>
                <div style={{ backgroundColor: "#242424", margin: "8px 13px", padding: "10px", borderRadius: "10px" }}>
                    <h5> {videoOneDataGet && videoOneDataGet?.views + " " + "Views" + " " + dayjs(videoOneDataGet?.createdAt).format('D MMM YYYY')}</h5>
                    <span style={{ display: "block", marginTop: "6px", color: "white" }}>Hashtag</span>
                    {
                        videoOneDataGet && videoOneDataGet?.hashTag?.map((item: any) => {
                            return (
                                <span style={{ color: "#4242d3", textDecoration: "underline", padding: "0px 6px", cursor: "pointer" }}>{item}</span>
                            )
                        })
                    }
                    <h5 style={{ marginTop: "6px", color: "white" }}>Description</h5>
                    <p> {videoOneDataGet && videoOneDataGet?.videoDescription}</p>
                </div>
            </>
        )
    }
    const [controls, setControls] = useState(true)
    const [playPause, setPlayPause] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [progress, setProgress] = useState(0);
    const handlePlayPause = () => {
        if (videoRef.current) {
            setPlayPause(prev => !prev);
            if (playPause) {
                videoRef.current.pause();
            }
            else {
                videoRef.current.play();
            }

        }
    };

    const updateProgress = () => {
        if (videoRef.current) {
            const percentage = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(percentage);
        }
    };

    const handleRewind = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
            updateProgress();
        }
    };

    const handleFastForward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 10);
            updateProgress();
        }
    }

    const toggleFullscreen = () => {
        const videoElement = videoRef.current;

        if (videoElement) {
            if (!Maxamize) {
                setMaximize(prev => !prev);
                // Enter Fullscreen
                if (videoElement.requestFullscreen) {
                    videoElement.requestFullscreen();
                } else if ((videoElement as any).webkitRequestFullscreen) {
                    (videoElement as any).webkitRequestFullscreen(); // Safari
                } else if ((videoElement as any).msRequestFullscreen) {
                    (videoElement as any).msRequestFullscreen(); // IE11
                } else if ((videoElement as any).mozRequestFullScreen) {
                    (videoElement as any).mozRequestFullScreen(); // Firefox
                }
            } else {
                // Exit Fullscreen
                if (document.exitFullscreen) {

                    document.exitFullscreen();
                } else if ((document as any).webkitExitFullscreen) {
                    (document as any).webkitExitFullscreen(); // Safari
                } else if ((document as any).msExitFullscreen) {
                    (document as any).msExitFullscreen(); // IE11
                } else if ((document as any).mozCancelFullScreen) {
                    (document as any).mozCancelFullScreen(); // Firefox
                }
            }

            setMaximize(prev => !prev);
            setControls(true); // Keeps controls visible after toggle
        }
    };


    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.addEventListener('timeupdate', updateProgress);
        }
        return () => {
            if (videoElement) {
                videoElement.removeEventListener('timeupdate', updateProgress);
            }
        };
    }, []);

    const [videoAssets, setVideoAssets] = useState(false);
    const [cast, setCast] = useState(false)
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [Maxamize, setMaximize] = useState(false)
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleCopyClickLink = (textToCopy: any) => {
        navigator.clipboard.writeText(baseURL + textToCopy)
            .then(() => {
                Success("Link copied to clipboard")
            })
            .catch((error) => {
                console.error("Failed to copy text:", error);
            });
    };
    //////

    const ShareDialog = () => {
        const getVideoData = videoOneDataGet && videoOneDataGet
        return (
            <>
                <div className="dialog-box-main">
                    <div className="dialog-box-body share-dialog-video">
                        <div className="dialog-header">
                            <h6>Share Video</h6>
                            <div className="close-btn" onClick={() => setShare(false)}>
                                <CloseIconShow />
                            </div>
                        </div>
                        <div className="dialog-content">
                            <div className="share-icons-container">
                                <div className="share-icons">
                                    <img src={WhatsappIcon} alt="Whatsapp" className="share-icon" />
                                    <img src={InstagramIcon} alt="Instagram" className="share-icon" />
                                    <img src={LinkdinIcon} alt="LinkedIn" className="share-icon" />
                                    <img src={EmailIcon} alt="Email" className="share-icon" />
                                    <RWebShare
                                        data={{
                                            text: `${baseURL}${getVideoData?.videoDescription}`,
                                            url: `${baseURL}${getVideoData?.videoFile || ''}`,
                                            title: `${baseURL}${getVideoData?.videoTitle}`,
                                        }}
                                        onClick={() => console.info('share successful!')}
                                    >
                                        <button className="share-btn">
                                            <ShareIcon />
                                            Share
                                        </button>
                                    </RWebShare>
                                </div>
                                <div className="copy-link-container">
                                    <span>{`${baseURL}${getVideoData?.videoFile || ''}`}</span>
                                    <CopyLink
                                        onClick={() => handleCopyClickLink(getVideoData?.videoFile || '')}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    //Full Page
    return (
        <Grid className="bg-black font-roboto relative overflow-hidden">
            {/* Play video */}
            <div
                className="fixed z-10 w-full"
                id="video-container"
            >
                <Grid className="videoContent  w-full h-54vh] relative">
                    {controls && (
                        <Block className="absolute z-1 w-full justify-between p-4">
                            <Block onClick={() => navigate("/user/home")}>
                                <DownArrow className="w-4" />
                            </Block>
                            <Block className="space-x-5">
                                {/* <Grid onClick={() => setCast(true)}>
                                    <Image src={Cast} />
                                </Grid>
                                <Grid>
                                    <Image src={CC2} />
                                </Grid> */}
                                {/* <Grid onClick={() => setVideoAssets(true)}>
                                    <Image src={VertiDots} />
                                </Grid> */}
                            </Block>
                        </Block>
                    )}

                    {controls && (
                        <Block
                            onClick={handlePlayPause}
                            className="absolute z-1 right-[46%] top-[45%]">
                            {
                                playPause && !(formatTime(currentTime) == formatTime(duration)) ?
                                    <PauseVideoIcon /> : <PlayVidIcon />
                            }
                            {/* <Image src={playPause && !(formatTime(currentTime) == formatTime(duration)) ? PauseVideoIcon : PlayVidIcon} /> */}
                        </Block>
                    )}

                    {controls && (
                        <Block className={"bottom-0 px-4 w-full justify-between z-1 right-0 absolute"}>
                            <Block className="px-2 w-fit bg-black rounded-md text-white text-[12px] m-3 py-1 ">
                                {formatTime(currentTime)} / {formatTime(duration)}

                            </Block>
                            <Grid onClick={toggleFullscreen} className="w-5 h-5">
                                {
                                    !Maxamize ? <MaximizeVideo /> : <MinimizeVideo />
                                }
                            </Grid>
                        </Block>
                    )}



                    <div className="w-full h-1 bg-gray-300 absolute bottom-0">
                        <div
                            className="h-1 bg-blue-600"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>

                    <video
                        onClick={() => setControls(prev => !prev)}
                        onTimeUpdate={() => {
                            if (videoRef.current) {
                                setCurrentTime(videoRef.current.currentTime);
                            }
                        }}
                        onLoadedMetadata={() => {
                            if (videoRef.current) {
                                setDuration(videoRef.current.duration);
                            }
                        }}
                        onDoubleClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const clickX = e.clientX - rect.left;
                            if (clickX < rect.width / 2) {
                                handleRewind();
                            } else {
                                handleFastForward();
                            }
                        }}
                        src={videoOneDataGet && videoOneDataGet?.videoFile ? baseURL + videoOneDataGet?.videoFile : ""}
                        className="w-full  bg-cover object-contain videoMainShow"
                        style={{ backgroundColor: "#000000", height: "53vh" }}
                        ref={videoRef}
                    />
                </Grid>


                <Grid>
                    {
                        false &&
                        <AddHeader />
                    }
                </Grid>
            </div>
            <Grid className={"w-full h-[0.07rem] videoDataShow opacity-[70%] mt-[53vh] overflow-y-auto bg-gray-500"}></Grid>
            {/* Title and Description */}
            <Block className={"px-3.5  pt-3 flex"} style={{ justifyContent: "space-between" }}>
                <Grid className={"text-[19.5px] font-bold leading-snug opacity-[90%] text-white"} style={{ textTransform: "capitalize" }}>
                    {videoOneDataGet && videoOneDataGet?.videoTitle}
                </Grid>

                <button onClick={() => setVideDes(!vidDes)} style={{ transform: `${vidDes === true ? "rotate(180deg)" : "unset"}` }}><VectorIcon /></button>
            </Block>
            <Block className={"px-3 pt-2"}>
                <Grid className={"text-[12.5px] text-white  flex"} style={{ flexDirection: "row", alignItems: "center" }}>
                    <span className={"opacity-[60%]"}>{videoOneDataGet && videoOneDataGet?.views} views {DateTime.DateToLocal(new Date(videoOneDataGet?.createdAt))}</span>
                    {
                        videoOneDataGet && videoOneDataGet?.hashTag?.map((item: any) => {
                            return (
                                <span className={"text-[12.5px] "} style={{ marginLeft: "10px", color: "rgb(37, 99, 235)", fontWeight: "bold" }}>{item}</span>
                            )
                        })
                    }
                </Grid>
                {/* <button onClick={() => setVideDes(!vidDes)}>
                    <Grid style={{ cursor: "pointer" }} className={"text-[12.5px] text-white font-semibold opacity-[70%] ml-2"}> {vidDes === false ? "...more" : "...less"}</Grid>
                </button> */}
            </Block>
            {
                vidDes === true &&
                <NewVideoDescription />
            }
            {/* {
                vidDes === true &&
                <VideoDescription video={video} />
            } */}
            <Block className="text-xs mt-3 overflow-x-auto scrollbar-none space-x-2 pl-3 py-2 flex items-center">
                {specifications && specifications.map((item: any, index: number) => (
                    item[3] === true && (
                        <Block
                            key={index}
                            className="relative cursor-pointer flex items-center justify-center md:px-3 px-6 py-2 rounded-3xl bg-[#242424] hover:bg-[#333333] transition duration-300"
                            onClick={() => {
                                if (typeof item[2] === 'function') {
                                    !like ? setAnimate2(true) : "";
                                    setTimeout(() => setAnimate2(false), 1200);
                                    item[2]();
                                }
                            }}
                        >
                            <div
                                onClick={like && item[0] === Like ? handleLike : undefined}
                                className={`w-8 h-8 rounded-full p-1 transition-transform duration-500 ease-in-out ${animate2 && checkLike && item[0] === Like ? 'animate-clicked2' : ''}`}
                                style={{ opacity: `${checkLike ? "1" : "0.6"}`, cursor: 'pointer' }}
                            >
                                {
                                    like && item[0] === Like ? (
                                        <Like2 />
                                    ) : (
                                        item[0] 
                                    )
                                }
                            </div>
                            <div className="lg:text-base text-sm ml-3 text-white">
                                {item[1]}
                            </div>
                        </Block>
                    )
                ))}

            </Block>

            <Block className={"flex justify-between pl-1"} style={{ margin: "10px", padding: "6px 4px", borderTop: "0.5px solid #CECECE", borderBottom: "0.5px solid #CECECE" }}>
                <Block className={"gap-x-3"} >
                    <Block className={"flex gap-2"}>
                        <Image
                            src={videoOneDataGet && videoOneDataGet?.user ? baseURL + videoOneDataGet?.user?.userImg : baseURL + videoOneDataGet?.userData?.userImg
                            }
                            style={{ borderRadius: "40px", width: "40px", height: "40px", objectFit: "cover", objectPosition: "top" }}
                        />
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Grid className={"text-[14px]"} style={{ color: "#2563eb", fontWeight: "bold" }}>{videoOneDataGet && videoOneDataGet?.user?.userName}</Grid>
                            <Grid className={"text-[12.5px] text-[#ffffff] font-normal "}>{followDataGet?.follow ? followDataGet?.follow + " " + "Follower" : (0 + " " + "Follow")}</Grid>
                        </div>
                    </Block>
                </Block>
                {subscribers?.userData?.followActive === true ?
                    <Block className={"gap-3 "}>
                        <Block className={`px-3.5 py-1 bg-white text-[14.5px] font-bold rounded-3xl text-black }`} >
                            {subscribers?.userData?.followActive === true ? "Unfollow" : "follow"}
                            <Block
                                className={"px-2 py-1 ml-2 cursor-pointer bg-[#242424] font-bold rounded-3xl text-black"}
                                onClick={handleNotification}
                            >
                                <Grid className={"w-6"}>

                                    {
                                        selectedNotification === 'All' ? <AllNotify style={{ width: "20px" }} /> : selectedNotification === 'Personalize' ? <Notification style={{ width: "20px" }} /> : selectedNotification === 'None' ? <BlockNotify style={{ width: "20px" }} /> : <Notification style={{ width: "20px" }} />
                                    }
                                </Grid>
                                <DownArrow style={{ width: "20px" }} />
                            </Block>
                        </Block>
                    </Block>
                    :
                    <Block
                        className={`relative cursor-pointer px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-full transition-transform duration-500 ease-in-out 
                            }`}
                        onClick={handleSubscribe}
                    >
                        Follow
                    </Block>
                }
            </Block>


            <Grid className={"m-3 mt-2 rounded-xl"}>
                <Block className={"flex justify-between"}>
                    <Block className={"flex space-x-2"}>
                        <Grid className={"text-[20px] font-normal text-white"}>Comments</Grid>
                        <Grid className={"text-gray-400 text-[14px] font-normal opacity-[80%]"}>{videoOneDataGet && videoOneDataGet?.commentCount}</Grid>
                    </Block>
                    <Block>
                        <Image onClick={() => setShowCommentBox(true)} style={{ cursor: "pointer", width: "17px" }} src={CommentButton} />
                    </Block>
                </Block>
                <Block className={"flex gap-x-2"}>
                    <Grid className="text-[13px] mt-3 opacity-[90%] w-[100%] leading-tight font-light text-white">

                        {videoOneDataGet && videoOneDataGet?.commentData && videoOneDataGet?.commentData.length > 0 ? (
                            <div>
                                {videoOneDataGet?.commentData[0] && videoOneDataGet?.commentData[0] ? (
                                    videoOneDataGet?.commentData?.slice(0, 1)?.map((item: any, index: any) => {
                                        return (
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "spaceBetween", backgroundColor: "#353434", borderRadius: "10px", padding: "13px 12px" }} onClick={() => setShowCommentBox(true)}>
                                                <div style={{ display: "flex", alignItems: "center", width: "100%" }} key={index}>
                                                    <img src={item?.userImg ? baseURL + item?.userImg : ""} onError={(e: any) => e.target.src = VideoCreator} style={{ width: "40px", height: "40px", borderRadius: "60px", objectFit: "cover", objectPosition: "top" }} />
                                                    <div style={{ marginLeft: "10px", width: "100%" }}>
                                                        <h5 style={{ fontWeight: "bold", fontSize: "13px    " }}>{item?.userName}</h5>
                                                        <p style={{ marginTop: "10px", fontSize: "12px" }}>{item?.comment}</p>
                                                    </div>
                                                </div>
                                                <span style={{ width: "100%", textAlign: "end" }}>{item?.date
                                                    ? dayjs(item.date).fromNow() : ""}</span>
                                            </div>
                                        )
                                    })
                                ) : (
                                    "No content available"
                                )}
                            </div>
                        ) : (
                            <span style={{ marginBottom: "10px" }}>No comments available</span> // Fallback when no comments exist
                        )}
                    </Grid>
                </Block>

            </Grid>
            <CategoryBar />
            <Grid className={"mb-20"}>
                <VideoComponent pb={0} />
            </Grid>
            {notify &&
                <SubscribeNotifyDialog />
            }
            {share &&
                <ShareDialog />
            }
            {clip &&
                <ClipDialog />
            }
            {
                showCommentBox === true && (
                    <CommentShowDialog />
                )
            }
            {remix &&
                <RemixDialog />
            }
            {report &&
                <ReportDialog />
            }
            {download &&
                <DownloadDialog setDownload={() => setDownload(false)} />
            }
            {save &&
                <SaveDialog />
            }
            {videoSpecfication &&
                <Video_Specification2 />
            }

            {
                videoAssets &&
                <Video_Specification setVideoSpecification={() => setVideoAssets(false)} />
            }
        </Grid>
    );
};

export default VideoComPlay;