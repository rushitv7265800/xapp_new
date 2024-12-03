import React, { useEffect, useState } from "react";
import Share from "../../../assets/shorts/share.svg";
import HeartLogo from "../../../assets/FrontpageIcons/LiveHeart.svg";  // Import SVG as React component
import FillHeartIcon from "../../../assets/FrontpageIcons/fillHeartIcon.png";  // Import SVG as React component
import BackArrow from "../../../assets/home/backArrow.svg";
import { baseURL, userData_ } from "../../../components/utils/config";
import ArrowNext from '../../../assets/FrontpageIcons/nextArrowStory.png'
import { useDispatch } from "react-redux";
import { storyAction } from "../../../redux/slice/storysSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

const StoryView: React.FC<{ story?: any; onBack?: () => any }> = ({
  story,
  onBack,
}) => {
  const [liked, setLiked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [storyData, setStoryData] = useState<any>()
  const dispatch = useDispatch<AppDispatch>();
  const { storyAll } = useSelector((state: RootState) => state.story);

  useEffect(() => {
    const filterData = storyAll?.filter((item: any) => {
      return item?._id === story?._id
    })
    if (filterData) {
      setStoryData(filterData[0])
    }
  }, [story, storyAll])

  useEffect(() => {
    const filterData = storyData?.likeData?.filter((item: any) => item?.userId === userData_?._id)
    const getLike = filterData && filterData[0]?.like
    setLiked(getLike)
    console.log("getLike", getLike)
  }, [storyData])

  console.log("story", story)

  const handleHeartClick = () => {
    setLiked(!liked);
    const payload = {
      action: "like",
      userId: userData_?._id,
      storyId: story?._id
    }
    dispatch(storyAction(payload))
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };


  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % story?.storyData?.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? story?.storyData?.length - 1 : prevIndex - 1
    );
  };

  const timeAgo = (date: any) => {
    const now = new Date();
    const pastDate = new Date(date);

    // Convert both dates to timestamps (milliseconds)
    const diff = now.getTime() - pastDate.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  };


  return (
    <div className="storyViewModel w-full h-screen relative bg-black overflow-hidden">
      {/* Back Button */}
      <div className="topButtonShow">
        <button onClick={handleBack} className="">
          <img src={BackArrow} alt="Back" className="w-6 h-6" />
        </button>
        <div className="showUserImgBox flex items-center  max-w-full px-4">
          <img
            src={story?.userData?.userImg ? baseURL + story?.userData?.userImg : ""}
            alt="User"
            className="w-14 h-14 rounded-full border-2 border-white mr-3"
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="text-white font-bold text-lg">{story?.userData?.userName}</span>
            <span className="text-white font-bold text-lg">{story?.storyData[currentIndex]?.date ? timeAgo(story?.storyData[currentIndex]?.date) : ""}</span>
          </div>
        </div>
      </div>
      {/* Story Image */}
      {

      }

      <div className="w-full h-full flex justify-center items-center slider-container">
        <button className="prev" onClick={prevImage}>
          <img src={ArrowNext} style={{ width: "43px", backgroundColor: "white", borderRadius: "50%" }} />
        </button>
        {story?.storyData && story?.storyData[currentIndex] && (
          <img
            src={story?.storyData[currentIndex]?.storyFile ? baseURL + story?.storyData[currentIndex]?.storyFile : ""}
            alt={`Image ${currentIndex + 1}`}
            className="w-full md:max-w-4xl lg:max-w-3xl xl:max-w-2xl h-full object-cover slider-image"
          />
        )}
        <button className="next" onClick={nextImage}>
          <img src={ArrowNext} style={{ width: "43px", backgroundColor: "white", borderRadius: "50%" }} />
        </button>
      </div>

      {/* <div className="w-full h-full flex justify-center items-center">
        <img
          src={story?.image}
          alt={story.name}
          className="w-full md:max-w-4xl lg:max-w-3xl xl:max-w-2xl h-full object-cover"
        />
      </div> */}

      {/* User Info (Overlay on Image) */}


      {/* Interaction Buttons (Heart & Share) */}
      <div className="absolute bottomHearBox bottom-8 right-8 flex gap-6 z-10">
        {/* Heart Button */}
        <button
          onClick={handleHeartClick}
          className="p-2"
          style={{
            borderRadius: "50%",
            padding: "10px",
          }}
        >
          {
            liked ?
              <img
                src={FillHeartIcon}
                alt="Heart Icon"
                className="w-10 h-10"
                style={{
                  width: "40px",
                  height: "40px",
                  fill: liked ? "white" : "none",
                }}
              />
              :
              <img
                src={HeartLogo}
                alt="Heart Icon"
                className="w-10 h-10"
                style={{
                  fill: liked ? "white" : "none",
                }}
              />
          }
        </button>

        {/* Share Button */}
        <button className="text-white text-4xl">
          <img src={Share} alt="Share Icon" className="w-10 h-10" />
        </button>
      </div>
    </div>
  );
};

export default StoryView;
