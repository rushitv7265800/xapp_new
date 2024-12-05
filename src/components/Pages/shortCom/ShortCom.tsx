import Block from "../../utils/customComponent/Block";
import { ReactComponent as CopyLink } from "../../../assets/VideoPlayIcons/CopyLink.svg"
// import WhatsApp from "../assets/VideoPlayIcons/WhatsApp.svg"
// import Telegram from "../assets/VideoPlayIcons/Telegram.svg"
// import Insta from "../assets/VideoPlayIcons/Instagram.svg"
import { RWebShare } from 'react-web-share';
// import XMeta from "../assets/VideoPlayIcons/XMeta.svg"
import { ReactComponent as PauseVideoIcon } from "../../../assets/VideoPlayIcons/PauseVideoIcon.svg"
import { ReactComponent as VerticalDots } from "../../../assets/FrontpageIcons/VerticalDots.svg";
import { ReactComponent as PlayVidIcon } from "../../../assets/VideoPlayIcons/PlayVidIcon.svg"
import VolumeIcon from "../../../assets/VideoPlayIcons/volume.png"
import MuteIcon from "../../../assets/VideoPlayIcons/mute.png"
import GiftIcon from "../../../assets/FrontpageIcons/GiftIcon.png"
import { ReactComponent as Save2 } from "../../../assets/shorts/Save2.svg"
import { ReactComponent as CloseIconShow } from "../../../assets/FrontpageIcons/closeIconShow.svg"
import { ReactComponent as ShareIcon } from "../../../assets/FrontpageIcons/Share.svg"
// import Messanger from "../../../assets/VideoPlayIcons/Messanger.svg"
// import Bluetooth from "../../../assets/VideoPlayIcons/BlueTooth.svg"
// import QuickShare from "../../../assets/VideoPlayIcons/QuickShare.svg"
import WhatsappIcon from "../../../assets/FrontpageIcons/whatsapp.png"
import InstagramIcon from "../../../assets/FrontpageIcons/instagram.png"
import EmailIcon from "../../../assets/FrontpageIcons/gmail.png"
import LinkdinIcon from "../../../assets/FrontpageIcons/linkedin.png"
// import CreatePost from "../assets/VideoPlayIcons/CreatePost.svg"
import Grid from "../../utils/customComponent/Grid"
// import Cross from "../assets/CommentIcons/Cross.svg"
import { HeroIcon } from "../../utils/customComponent/Icon";
// import Cover from "../assets/shorts/cover.png"
import Image from "../../utils/customComponent/Image";
import InfiniteScroll from 'react-infinite-scroll-component';
import { ReactComponent as Like } from "../../../assets/VideoPlayIcons/like.svg";
import { ReactComponent as Like2 } from "../../../assets/FrontpageIcons/LikeFill.svg"
import { ReactComponent as Camera } from "../../../assets/home/Camera.svg"
import VideoCreator from "../../../assets/FrontpageIcons/VideoCreator.avif";
// import Gift from "../assets/home/Gift.svg"
import { ReactComponent as Saved } from "../../../assets/home/SavedLogo.svg"
import { ReactComponent as Comment } from "../../../assets/shorts/comment.svg";
// import CommentBoxComponent from "../screens/CommentBox"
import { ReactComponent as Share } from "../../../assets/shorts/share.svg";
// import Music from "../assets/shorts/music.svg";
import "../../../css/shorts.css";
import { useState, useRef, useEffect } from "react";
// import { useQuery } from "@preact-signals/query";
// import { ApiController } from "../networking";   
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { createCommentShort, getAllShort, likeShort, toggleFollowShort } from "../../../redux/slice/shortsSlice";
import { baseURL, userData_ } from "../../utils/config";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { Success } from "../../utils/toastServices";
import { getUserFollow } from "../../../redux/slice/authSlice";
import relativeTime from 'dayjs/plugin/relativeTime';
import { useLocation, useNavigate } from "react-router-dom";

// Add the plugin to dayjs
dayjs.extend(relativeTime);
const ShortCom = () => {
    // const { data: videosData } = useQuery({
    //     queryFn: ApiController.getShortVideos,
    //     queryKey: ["shorts"]
    // })
    const dispatch = useDispatch<AppDispatch>();
    const [start, setStart] = useState(1)
    const [limit, setLimit] = useState(20)
    const [showCommentBox, setShowCommentBox] = useState<boolean>(false);
    const [getShort, setGetShort] = useState<any>()
    const { shorts, isLoading } = useSelector((state: any) => state.short);
    const [shortsData, setShortsData] = useState<any[] | undefined>(undefined);
    const storedData = sessionStorage.getItem("selectShort");
    const [mutedGet, setMutedGet] = useState<boolean>(true)
    const navigate = useNavigate()
    const location = useLocation()

    // Check if storedData is valid and not an empty string before parsing
    const handleMuteToggle = () => {
        setMutedGet((prev) => !prev);
    };

    let getSelectShort = null;
    if (storedData && storedData.trim() !== "") {
        try {
            getSelectShort = JSON.parse(storedData);
        } catch (e) {
            console.error("Error parsing JSON:", e);
            // Handle the error as needed, for example:
            // getSelectShort = null; or default data
        }
    } else {
        getSelectShort = null;
    }
    useEffect(() => {
        setStart(1)
        setLimit(20)
        const payload = {
            start: start,
            limit: limit,
            userId: userData_?._id
        }
        dispatch(getAllShort(payload))
    }, [start, limit])

    const moveToTop = (data, targetId) => {
        const targetItem = data.find(item => item._id === targetId);
        if (!targetItem) return data;
        return [targetItem, ...data.filter(item => item._id !== targetId)];
    };


    useEffect(() => {
        if (location.state?.key === "homePage") {
            if (!shorts || !getSelectShort?._id) return;

            const updatedShorts = moveToTop(shorts, getSelectShort._id);

            // Update only if the data changes
            if (JSON.stringify(shortsData) !== JSON.stringify(updatedShorts)) {
                setShortsData(updatedShorts);
            }
        } else {
            setShortsData(shorts);
        }
    }, [shorts, location, getSelectShort, shortsData]);



    const fetchData = () => {
        // setShortsData([...shortsData, ...shorts]); 

    }
    const refresh = () => {
        console.log("refreshed")
    }
    const handleComment = (video: any) => {
        console.log("id", video)
        setGetShort(video)
        setShowCommentBox(true)
        // setComment(true);
    };


    const [like, setLike] = useState(false)
    // const [subscribers, setSubscribers] = useState<any>()
    const [animate, setAnimate] = useState(false);
    const [followShortId, setFollowShortId] = useState<any>()
    const [animateFollow, setAnimateFollow] = useState(false);
    const [animateplayPause, setAnimatePlayPause] = useState(false)
    const [commentInput, setCommentInput] = useState<any>()
    const [follow, setFollow] = useState(false)

    useEffect(() => {
        console.log("followShortId", followShortId)
        if (shortsData) {
            setTimeout(() => {
                if (videoRefs.current[0]) {
                    videoRefs.current[0]?.play();
                }
            }, 500);
        }
    }, [shortsData]);
    // const [getComment, setComment] = useState<boolean>(false);
    const [share, setShare] = useState(false)
    // const [followCheck, setFollowCheck] = useState<any>()
    const [save, setSave] = useState(false)
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    // const location=useLocation()
    const { userFollowData } = useSelector((state: any) => state.auth);
    const [playPause, setPlayPause] = useState<boolean[]>(Array(5).fill(true));
    // const video: getVideoResp[number] = location.state?.video;

    // const videoUser={videoId:video.video_id, videoName:video.title, avatar:video.thumbnail}



    // useEffect(() => {
    //     console.log("userFollowData",userFollowData)
    //     const checkShort = shortsData && shortsData[followShortId]
    //     const findFollowData = shortsData?.map(short => {
    //         const followEntry = userFollowData?.followData?.find((follow: any) => follow?.userData?.userId === short?.userId);
    //         console.log("followEntry",followEntry)
    //         return {
    //             ...short,
    //             followActive: followEntry === true ? followEntry?.userData?.followActive : false
    //         };
    //     });
    //     console.log("findFollowData",findFollowData)
    //     // console.log("followEntry",findFollowData)
    //     const checkFilter = findFollowData?.filter((item: any) => item?.userId === checkShort?.userId)
    //     console.log("checkFilter", checkFilter)
    //     const getFollow = checkFilter
    //     // console.log("checkFilter getFollow", getFollow,followShortId)
    //     if (getFollow) {
    //         // setFollowCheck(getFollow?.followActive)
    //     }
    // }, [shortsData, followShortId,userFollowData])

    // useEffect(() => {
    //     if (getComment) {
    //         const payload = shortsData ? shortsData[0]?._id : ""
    //         dispatch(getCommentForShort(payload))
    //     }
    // }, [shortsData, getComment])

    const handleCopyClickLink = (textToCopy: any) => {
        navigator.clipboard.writeText(baseURL + textToCopy)
            .then(() => {
                Success("Link copied to clipboard")
            })
            .catch((error) => {
                console.error("Failed to copy text:", error);
            });
    };
    const handlePlayPause = (index: number) => {
        setAnimate(false)
        setAnimatePlayPause(true);
        setTimeout(() => {
            setAnimatePlayPause(false);
        }, 1500);

        const videoElement = videoRefs.current[index];
        if (videoElement) {
            if (playPause[index]) {
                videoElement.pause();
            } else {
                videoElement.play();
            }

            setPlayPause((prevState) => {
                const newState = [...prevState];
                newState[index] = !newState[index];
                return newState;
            });
        }
    };

    useEffect(() => {
        dispatch(getUserFollow(userData_?._id))
    }, [])

    const handleFollow = (video: any) => {
        console.log("video", video)
        const filterUnfollowData = userFollowData?.userData?.followActive
        console.log("userFollowData", filterUnfollowData)
        const payload = {
            userId: video?.userId,
            targetUserId: userData_?._id,
            shortId: video?._id,
            filterUnfollowData: filterUnfollowData
        }
        dispatch(toggleFollowShort(payload))
        if (follow) {
            // Unsubscribe
            setAnimateFollow(true);
            setTimeout(() => {
                setFollow(false);
                setAnimateFollow(false);
            }, 1200);
        } else {
            // Subscribe
            setAnimateFollow(true);
            setTimeout(() => {
                setFollow(true);
                setAnimateFollow(false);
            }, 1200);
        }
    }

    // useEffect(() => {
    //     console.log("followShortId", followShortId)
    //     const getFilter = userFollowData?.followData?.filter((item: any) => {
    //         return userData_?._id === item?.userData?.userId
    //     })
    //     const getFollow = getFilter ? getFilter[0] : ""
    //     setSubscribers(getFollow)
    // }, [followShortId, userFollowData, shortsData])




    // useEffect(() => {
    //     console.log("getDataCheck userFollowData", userFollowData)
    //     const getData = userFollowData?.followData?.filter(
    //         (data: any) => data.userData.userId === userData_?._id
    //     );
    //     const getDataCheck = getData ? getData[0] : ""
    //     setSubscribers(getDataCheck)
    //     console.log("getDataCheck", getDataCheck)
    // }, [userFollowData, userData_])


    // const handleCommentData=()=>{
    //     alert("jkhgf")
    // }


    // const CommentDialog = () => {
    //     return (
    //         <div className=" flex items-end justify-center z-20 no-scrollbar shortCommentShow">
    //             {/* Overlay */}
    //             <div onClick={() => setComment(false)} style={{ position: "absolute", top: "-39px", cursor: "pointer", right: "4px", backgroundColor: "#a9a9a9", zIndex: "11111", width: "35px", height: "35px", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
    //                 <img src={CloseIconShow} style={{ width: "20px" }} />
    //             </div>
    //             <div className=" z-20 inset-0 bg-black bg-opacity-50 no-scrollbar showBgShort"></div>
    //             <div>
    //                 <Grid className=" shortDialogeBox z-20 bottom-0 left-0 right-0 h-[75%] bg-[#242424] overflow-y-auto">
    //                     {
    //                         getComment && (
    //                             <CommentBoxComponent User={shortsData} Type={"short"} setComment={setComment} />
    //                         )
    //                     }
    //                     {
    //                         commentsShort?.length > 0 ? (commentsData?.map((item: any, index: number) => {
    //                             return (
    //                                 <>
    //                                     <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "spaceBetween", backgroundColor: "#353434", borderRadius: "10px", padding: "13px 12px", margin: "10px 0px" }}>
    //                                         <div style={{ display: "flex", alignItems: "center", width: "100%" }} key={index}>
    //                                             <img src={item?.userImg ? baseURL + item?.userImg : VideoCreator} style={{ width: "40px", height: "40px", borderRadius: "60px", objectFit: "cover", objectPosition: "top" }} />
    //                                             <div style={{ marginLeft: "10px" }}>
    //                                                 <h5 style={{ fontWeight: "bold", fontSize: "13px    " }}>{item?.userName}</h5>
    //                                                 <p style={{ fontSize: "12px" }}>{item?.comment}</p>
    //                                             </div>
    //                                         </div>
    //                                         <span style={{ width: "100%", textAlign: "end", fontSize: "10px" }}>{dayjs(item?.date)?.format("DD MMM YYYY HH:mm:ss A")}</span>
    //                                     </div>
    //                                 </>
    //                             )
    //                         })
    //                         ) : (
    //                             <span>No Comment...</span>
    //                         )
    //                     }



    //                 </Grid>
    //             </div>
    //         </div>
    //     )
    // }

    const ShareDialog = () => {

        const getShortData = shortsData ? shortsData[0] : []
        return (
            <>
                <div className=" z-20 no-scrollbar shareCommentShow">
                    {/* Overlay */}
                    <div onClick={() => setShare(false)} style={{ position: "absolute", cursor: "pointer", right: "4px", zIndex: "11111", width: "35px", height: "35px", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <CloseIconShow style={{ width: "20px" }} />
                    </div>
                    <div className=" z-20 inset-0 bg-black bg-opacity-50 no-scrollbar showBgshare"></div>
                    <Grid className=" shareDialogeBox z-20 bottom-0 left-0 right-0 h-[75%] bg-[#242424] overflow-y-auto">
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "spaceBetween", backgroundColor: "#353434", borderRadius: "10px", padding: "13px 12px", margin: "10px 0px" }}>
                            <div style={{ display: "flex", alignItems: "center", width: "100%" }} >
                                <img src={WhatsappIcon} style={{ width: "40px", height: "40px", borderRadius: "10px", margin: "0px 4px", objectFit: "contain", objectPosition: "top" }} />
                                <img src={InstagramIcon} style={{ width: "40px", height: "40px", borderRadius: "10px", margin: "0px 4px", objectFit: "contain", objectPosition: "top" }} />
                                <img src={LinkdinIcon} style={{ width: "40px", height: "40px", borderRadius: "10px", margin: "0px 4px", objectFit: "contain", objectPosition: "top" }} />
                                <img src={EmailIcon} style={{ width: "40px", height: "40px", borderRadius: "10px", margin: "0px 4px", objectFit: "contain", objectPosition: "top" }} />
                                <div style={{ marginLeft: "10px" }}>
                                    <RWebShare
                                        data={{
                                            text: baseURL + getShortData?.shortDescription,
                                            url: baseURL + getShortData?.shortFile ? baseURL + getShortData?.shortFile : "",
                                            title: baseURL + getShortData?.shortTitle,
                                        }}
                                        onClick={() => console.info("share successful!")}
                                    >
                                        <button style={{ display: "flex", alignItems: "center", border: "1px solid white", padding: "6px", borderRadius: "10px", fontWeight: "bold" }}><ShareIcon style={{ marginRight: "6px" }} />Share</button>
                                    </RWebShare>
                                </div>
                            </div>
                        </div>
                        <div className="copyLinkShort">
                            <span>{baseURL + getShortData?.shortFile ? baseURL + getShortData?.shortFile : ""}</span>
                            <div>
                                <CopyLink onClick={() => handleCopyClickLink(getShortData?.shortFile ? getShortData?.shortFile : "")} />
                            </div>
                        </div>
                    </Grid>
                </div>
            </>
        )
    }
    const handleVideoEnd = (index: number) => {
        // Scroll to the next video when the current one ends
        const nextVideoIndex = index + 1;
        if (nextVideoIndex < videoRefs.current.length) {
            // Scroll to the next video element
            videoRefs.current[nextVideoIndex]?.scrollIntoView({
                behavior: 'smooth', // smooth scroll
                block: 'start', // align to the start of the container
            });
        }
    };
    const hadnleLikeShort = (video: any) => {
        const payload = {
            userId: userData_?._id,
            shortId: video?._id,
            like: like
        }
        dispatch(likeShort(payload))
        setLike(prevLike => !prevLike);
        // LikeMutation.mutate({ uuid: video._id })
    }

    // useEffect(() => {
    //     const observer = new IntersectionObserver(
    //         (entries) => {
    //             entries.forEach((entry) => {
    //                 const index = videoRefs.current.indexOf(entry.target as HTMLVideoElement);

    //                 if (entry.isIntersecting) {
    //                     // Play the video that is in view
    //                     if (videoRefs.current[index]) {
    //                         videoRefs.current[index]?.play();
    //                         setPlayPause((prevState) => {
    //                             const newState = [...prevState];
    //                             newState[index] = true;
    //                             return newState;
    //                         });
    //                     }
    //                 } else {
    //                     // Pause the video that is out of view
    //                     if (videoRefs.current[index]) {
    //                         videoRefs.current[index]?.pause();
    //                         setPlayPause((prevState) => {
    //                             const newState = [...prevState];
    //                             newState[index] = false;
    //                             return newState;
    //                         });
    //                     }
    //                 }
    //             });
    //         },
    //         {
    //             threshold: 0.5, // Trigger when 50% of the video is in view
    //         }
    //     );

    //     // Observe all videos in the ref
    //     videoRefs.current.forEach((video) => {
    //         if (video) {
    //             observer.observe(video);
    //         }
    //     });

    //     return () => {
    //         // Cleanup the observer when the component unmounts
    //         videoRefs.current.forEach((video) => {
    //             if (video) {
    //                 observer.unobserve(video);
    //             }
    //         });
    //     };
    // }, [shortsData]);

    useEffect(() => {
        if (shortsData && videoRefs?.current) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries?.forEach((entry) => {
                        const index = videoRefs.current.indexOf(entry.target as HTMLVideoElement);
                        if (entry.isIntersecting) {
                            videoRefs.current[index]?.play();
                            setPlayPause(prevState => {
                                const newState = [...prevState];
                                newState[index] = true;
                                return newState;
                            });
                            setFollowShortId(index)
                            setShowCommentBox(false)
                            setShare(false)
                        } else {
                            videoRefs.current[index]?.pause();
                            setPlayPause(prevState => {
                                const newState = [...prevState];
                                newState[index] = false;
                                return newState;
                            });
                        }
                    });
                },
                { threshold: 0.5 }
            );

            videoRefs.current.forEach(video => {
                if (video) {
                    observer.observe(video);
                }
            });

            return () => {
                videoRefs.current.forEach(video => {
                    if (video) {
                        observer.unobserve(video);
                    }
                });
            };
        }
    }, [shortsData]);


    // useEffect(() => {
    //     const observer = new IntersectionObserver(
    //         (entries) => {
    //             entries.forEach((entry) => {
    //                 const index = videoRefs.current.indexOf(entry.target as HTMLVideoElement);
    //                 if (entry.isIntersecting) {
    //                     videoRefs.current[index]?.play();
    //                     setPlayPause((prev) => {
    //                         const newState = [...prev];
    //                         newState[index] = true;
    //                         return newState;
    //                     });
    //                 } else {
    //                     videoRefs.current[index]?.pause();
    //                     setPlayPause((prev) => {
    //                         const newState = [...prev];
    //                         newState[index] = false;
    //                         return newState;
    //                     });
    //                 }
    //             });
    //         },
    //         { threshold: 0.5 }
    //     );

    //     videoRefs.current.forEach((video) => {
    //         if (video) observer.observe(video);
    //     });

    //     return () => {
    //         observer.disconnect();
    //     };
    // }, [videoRefs, shortsData]);
    useEffect(() => {
        console.log("commentDialogue", showCommentBox)
    }, [showCommentBox])

    const CommentShowDialog = () => {
        const inputRef = useRef<any>(null);

        const handleCommentSend = () => {
            console.log("commentInput", commentInput)
            console.log("getShort", getShort)
            const payload = {
                userId: userData_?._id,
                comment: commentInput.trim(),
                shortId: getShort?._id
            }
            dispatch(createCommentShort(payload))
            setShowCommentBox(false)
        }
        useEffect(() => {
            if (inputRef.current) {
                // Always focus the input while maintaining the cursor position
                const cursorPosition = inputRef.current.selectionStart ?? commentInput.length;
                inputRef.current.focus();
                inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
            }
        }, [commentInput]);

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const cursorPosition = e.target.selectionStart; // Capture current cursor position
            const newValue = e.target.value; // New value from textarea

            setCommentInput(newValue); // Update state with new value

            // Restore cursor position after state update
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
                }
            }, 0);
        };



        return (
            <>
                <div className="dialogBoxMain scrollbarShow commentDialogue" style={{ width: "100%", maxWidth: "100%" }}>
                    <div className="dialogBoxBody scrollbarShow" style={{ width: "100%" }}>
                        <div className={"topLineButton"}>
                            <button onClick={() => setShowCommentBox(false)} className={"showButtonTop"}></button>
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
                        <Block className={"space-x-1.5  gap-2 py-1 w-[100%]"} style={{
                            paddingBottom: "20px",
                            borderBottom: "2px solid #2d2c2c", // Subtle border to separate sections
                            width: "100%",
                            display: "flex",
                            position: "relative",
                            alignItems: "center"
                        }}>
                            <img className={"rounded-full w-10 h-10"} src={VideoCreator} />
                            <textarea
                                ref={inputRef}
                                placeholder={"Add a comment..."}
                                value={commentInput}
                                typeof="text"
                                onChange={handleChange}
                                style={{
                                    // borderRadius: "20px",
                                    // width: "100%",
                                    // padding: "12px 16px",
                                    // border: "1px solid #444",
                                    // fontSize: "14px",
                                    // backgroundColor: "transparent",
                                    // color: "white",
                                    // outline: "none",
                                    // transition: "background-color 0.3s ease",
                                    borderRadius: '20px',
                                    width: '100%',
                                    padding: '12px 16px',
                                    border: '1px solid #444',
                                    fontSize: '14px',
                                    backgroundColor: 'transparent',
                                    color: 'white',
                                    outline: 'none',
                                    height: '100px',
                                    maxHeight: "200px",
                                    // Remove the transition to test if it resolves the issue
                                    transition: 'none',
                                }}
                                className={"text-[14px] scrollbarShow h-[40px] text-white pl-3"}

                            ></textarea>
                            <button onClick={handleCommentSend} style={{ backgroundColor: "#8000FF", marginRight: "10px", cursor: "pointer", color: "white", padding: "5px 10px", borderRadius: "5px", fontSize: "13px" }}>Comment</button>
                        </Block>

                        <div className={"scrollbarShow"} style={{
                            maxHeight: "30vh",
                            overflowY: "scroll",
                            marginTop: "10px",
                            marginBottom: "10px",
                            paddingRight: "10px",
                            width: "100%"
                        }}>
                            {
                                getShort?.commentData?.length > 0 ? (
                                    getShort?.commentData?.map((item: any, index: any) => {
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
                                ) : (
                                    <h6 style={{ textAlign: "center", fontSize: "16px", color: "white" }} className={"pt-3 pb-3"}>No Comments...</h6>
                                )
                            }
                        </div>
                    </div>
                </div>
            </>
        );
    };


    return (
        <div>

            <Grid className="items-center showShortContentBox w-full bg-black-600 relative">
                <InfiniteScroll
                    dataLength={shorts && shorts?.length}
                    next={fetchData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                    // below props only if you need pull down functionality
                    refreshFunction={refresh}
                    scrollableTarget="scrollableDiv"
                    className="h-full overflow-scroll no-scrollbar snap-y snap-mandatory"
                    pullDownToRefresh
                    pullDownToRefreshThreshold={50}
                    pullDownToRefreshContent={
                        <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                    }
                    releaseToRefreshContent={
                        <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                    }
                >
                    {shorts?.length > 0 && shortsData?.map((video, index) => {
                        const checkLike = video?.likeData?.filter((item: any) => item?.userId === userData_?._id)
                        const getLikeUserData = checkLike ? checkLike[0]?.like : ""
                        const getFollowUserData = video?.user ? video?.user?.userData?.followActive : false
                        return (
                            <Grid className="justify-between w-full relative snap-start" key={index} style={{ minHeight: "calc(100vh - 24px)" }}>
                                <Grid className="absolute top-0 w-full h-screen">
                                    <video
                                        muted={mutedGet}
                                        onClick={() => handlePlayPause(index)}
                                        onEnded={() => handleVideoEnd(index)} // Detect when the video ends
                                        className="h-full w-full object-contain"
                                        src={video ? baseURL + video?.shortFile : ""}
                                        ref={(el) => (videoRefs.current[index] = el)}
                                    >
                                        Your browser does not support the video tag.
                                    </video>

                                </Grid>
                                {/* {getComment &&
                                <div className={"relative"}>
                                    <CommentDialog />
                                </div>
                            } */}

                                {share &&
                                    <div className={"relative"}>
                                        <ShareDialog />
                                    </div>
                                }
                                <Block className="justify-between z-10 h-full p-4">
                                    <HeroIcon iconName="ArrowLongLeftIcon" onClick={() => navigate("/user/home")} className="h-6 w-6 text-white cursor-pointer" />
                                    <Block className={"flex items-center gap-5"}>
                                        <Grid className="items-center cursor-pointer">
                                            {/* <Camera /> */}
                                            <Grid onClick={handleMuteToggle} className="items-center z-10 cursor-pointer w-[40px]">
                                                <Grid className={"w-7"}>
                                                    {
                                                        mutedGet ?
                                                            <img src={MuteIcon} style={{ filter: "invert(100%)", width: "28px", height: "28px" }} />
                                                            :
                                                            <img src={VolumeIcon} style={{ filter: "invert(100%)", width: "28px", height: "28px" }} />
                                                    }
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Block>
                                    {/* <Grid onClick={handleMuteToggle} style={{position:"absolute",top:"13%",right:"2%"}} className="items-center z-10 cursor-pointer w-[40px]">
                                            <Grid className={"w-7"}>
                                                {
                                                    mutedGet ?
                                                    <img src={MuteIcon} style={{filter:"invert(100%)",width:"28px",height:"28px"}}/>
                                                    :
                                                    <img src={VolumeIcon} style={{filter:"invert(100%)",width:"28px",height:"28px"}} />
                                                }
                                            </Grid>
                                        </Grid> */}
                                </Block>
                                <Block className=" justify-between p-4">
                                    <Grid className="gap-5 p-2 z-10 self-end">
                                        <Block>
                                            <div className="shorts-text responsive-text text-white text-[16px] max-w-[50%]">
                                                <span style={{ textTransform: "capitalize" }}>{video?.shortTitle + " " + "|" + " " + video?.shortDescription + " " + "|"}</span>
                                                {
                                                    video?.hashTag?.map((item: any) => {
                                                        return (
                                                            <a style={{ fontWeight: "bold", cursor: "pointer", fontSize: "18px" }}>{" " + item}</a>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Block>
                                        <Block className="shorts-icons gap-4 w-full">
                                            <Image src={video?.userData?.userImg ? baseURL + video?.userData?.userImg : VideoCreator} style={{ width: "36px", height: "36px" }} classname=" rounded-full object-top object-cover border-2 border-white" />
                                            <Grid className="text-white text-[18px] font-semibold">{video?.userData?.userName}</Grid>
                                            <Grid onClick={() => handleFollow(video)} style={{ padding: "3px 20px", width: "78px", fontSize: "14px" }} className={`text-white cursor-pointer px-4 flex items-center py-1 w-[100px] bg-[#8000FF] ${animateFollow ? "animate-clicked" : ""}  rounded-md text-[18px] font-semibold`}> {getFollowUserData === true ? "Followed" : "Follow"}</Grid>
                                            <Image src={GiftIcon} style={{ width: "25px", height: "25px", cursor: "pointer" }} />
                                        </Block>
                                        <Grid className="text-white font-normal text-[18px] leading-snug">{video.caption}</Grid>

                                    </Grid>

                                    <Grid className="gap-[15px] mb-[2%]">
                                        {animateplayPause && (
                                            <Block
                                                className={`absolute cursor-pointer  z-1 bg-gray-400 transition-transform rounded-full duration-500 ease-in-out p-2 right-[46%] top-[48%] ${animateplayPause ? "animate-clicked" : ""}`}>
                                                {/* <Image src={animateplayPause && playPause[index] ? PauseVideoIcon : PlayVidIcon} /> */}
                                                {
                                                    animateplayPause && playPause[index] ?
                                                        <PauseVideoIcon /> :
                                                        <PlayVidIcon />
                                                }
                                            </Block>
                                        )}

                                        <Grid
                                            className={`items-center cursor-pointer `}
                                            onClick={() =>
                                                hadnleLikeShort(video)
                                            }
                                        >

                                            <Grid className={`w-10 z-10 p-1 transition-transform rounded-full duration-500 ease-in-out ${animate && like ? "animate-clicked2" : ""}`}>
                                                {
                                                    getLikeUserData ? <Like2 /> : <Like style={{ width: "35px", height: "35px" }} />
                                                }
                                            </Grid>
                                            <Grid className="text-white z-10 font-semibold text-sm">{video?.like}</Grid>
                                        </Grid>
                                        <Grid onClick={() => setSave(prev => !prev)} className="items-center z-10 cursor-pointer w-[40px]">
                                            <Grid className={"w-7"}>
                                                {
                                                    save ?
                                                        <Saved />
                                                        :
                                                        <Save2 />
                                                }
                                                {/* <Image src={save ? Saved : Save2} /> */}
                                            </Grid>
                                            <Grid className=" text-white font-semibold text-sm"> {save ? "Saved" : "Save"}</Grid>
                                        </Grid>
                                        <Grid className="items-center z-20 cursor-pointer" onClick={() => handleComment(video)}>
                                            <Comment />
                                            <Grid className=" text-white font-semibold text-sm">{video?.commentCount}</Grid>
                                        </Grid>

                                        <Grid className="items-center cursor-pointer z-20" onClick={() => setShare(true)}>
                                            <Share />
                                            <Grid className=" text-white font-semibold text-xs">Share</Grid>
                                        </Grid>
                                        <Grid>
                                            <div className="soundAnimation">
                                                <div className="Soundicon">
                                                    <span className="Soundbar"></span>
                                                    <span className="Soundbar Soundsmall"></span>
                                                    <span className="Soundbar"></span>
                                                    <span className="Soundbar Soundsmall"></span>
                                                    <span className="Soundbar"></span>
                                                </div>
                                            </div>
                                        </Grid>
                                        {/* <Grid className="border z-10 border-white rounded-md items-center p-2 shadow-sm">
                                    <Image src={Music} />
                                </Grid> */}
                                    </Grid>
                                </Block>
                            </Grid>
                        )
                    })}


                </InfiniteScroll>

            </Grid >
            {
                showCommentBox === true && (
                    <div className={"relative"} style={{ display: `${showCommentBox === true ? "block" : "none"}` }}>
                        <CommentShowDialog />
                    </div>
                )
            }

            {isLoading &&
                <div className='loader'>
                    <div className='loaderShow'>
                        <div className="three-body">
                            <div className="three-body__dot"></div>
                            <div className="three-body__dot"></div>
                            <div className="three-body__dot"></div>
                        </div>
                    </div>
                </div>}
        </div>

    )
}

export default ShortCom;
