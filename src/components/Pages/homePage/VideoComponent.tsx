import Grid from "../../utils/customComponent/Grid";
import Block from "../../utils/customComponent/Block";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../../utils/customComponent/Image";
import { ReactComponent as VerticalDots } from "../../../assets/FrontpageIcons/VerticalDots.svg";
import { ReactComponent as VideoIcon } from "../../../assets/FrontpageIcons/youtube-105.svg";
import Video_Specification from "./VideoSpecification";
// import { useQuery } from "@preact-signals/query";
// import { ApiController } from "../../networking";
// import { ApiFormatter, DateTime } from "../../utils";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { baseURL, userData_ } from "../../../components/utils/config";
import { getAllVideos } from "../../../redux/slice/videoSlice";


interface VideoComponentProps {
  pb: number;
}

const VideoComponent: React.FC<VideoComponentProps> = ({ pb }) => {
  // const { data: videosData } = useQuery({
  //     queryFn: ApiController.getPlayVideo,
  //     queryKey: ["videos"],
  // });
  // const generateShareableLink = (videoId: string) => {
  //     return `${window.location.origin}/playvideo/${videoId}`;
  // };

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [videosData, setVideosData] = useState<any[]>([]);
  const { videosDataAll } = useSelector((state: RootState) => state.videos);
  const [videoSpecification, setVideoSpecification] = useState(false);
  const [start, setStart] = useState(1);
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    setStart(1);
    setLimit(20);
    const payload = {
      start: start,
      limit: limit,
      userId: userData_?._id,
    };
    dispatch(getAllVideos(payload));
  }, [start, limit]);

  useEffect(() => {
    setVideosData(videosDataAll || []);
  }, [videosDataAll]);

  const navigateVideoOpen = (video: any) => {
    navigate("/user/playVideo", { state: { videoId: video?._id } });
  };

  return (
    <Grid className={"p-3 pb-0"} style={{ marginBottom: "56px" }}>
      {/* Responsive grid layout */}
      <Block className="text-white text-lg xl:my-8 lg:my-6 md:my-4 my-2  inline-flex justify-start items-start">
        {/* <img className="mx-2" src={VideoIcon} width="30px" height="30px"/> */}
        <VideoIcon
          style={{ width: "30px", height: "30px", marginRight: "10px" }}
        />
        <Grid className="text-[22px] font-extrabold">Videos</Grid>
      </Block>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 object-cover gap-x-4 md:gap-y-6 sm:gap-y-4  gap-y-0 pb-0">
        {videosData?.map((video: any, index: any) => (
          <Grid
            key={index}
            className={`space-y-2 w-full flex flex-col pb-${pb}`}
          >
            {/* Video Thumbnail */}
            <div
              key={index}
              onClick={() => navigateVideoOpen(video)}
              style={{ cursor: "pointer" }}
            >
              <Block className="relative">
                <img
                  // className="w-full h-full h-[215px] sm:h-[180px] md:h-[200px] lg:h-[215px] object-contain rounded-lg"
                  className="w-full h-full  object-cover rounded-lg videoShowContent"
                  src={video ? baseURL + video?.videoThumbnail : ""}
                  style={{height:"257px"}}
                  alt={video?.videoTitle}
                />
              </Block>
            </div>

            {/* Profile Image + Video Description */}
            <Block className="flex px-3 py-2 items-start videoFornt">
              {/* Profile Image */}
              <Link to={"/channelpage"} className="mr-3">
                <img
                  className="w-[54px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[50px] rounded-full flex justify-center items-center"
                  style={{ objectFit: "fill" }}
                  src={video.userData ? baseURL + video?.userData?.userImg : ""}
                  alt="Channel Profile"
                />
              </Link>

              {/* Description (next to profile) */}
              <Grid className="w-full">
                <Grid className=" showVideoTitle text-[14px] sm:text-[15px] md:text-[16px] text-white font-semibold leading-normal">
                  {video?.videoTitle}
                </Grid>
                <Grid className="text-white opacity-70 text-[12px] sm:text-[12px] md:text-[12px]">
                  {video?.views} views • {video?.date}
                </Grid>
              </Grid>

              {/* Vertical dots for video specification */}
              <Grid
                onClick={() => setVideoSpecification(true)}
                className="cursor-pointer ml-auto"
              >
                <VerticalDots />
              </Grid>
            </Block>
          </Grid>
        ))}
      </div>

     
      {videoSpecification && (
        <Video_Specification
          setVideoSpecification={() => setVideoSpecification(false)}
        />
      )}
    </Grid>
  );
};

export default VideoComponent;
