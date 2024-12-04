import React, { useEffect, useState } from "react";
import Grid from "../../../components/utils/customComponent/Grid";
import StoryView from "./StoryView";
import Userstoryview from "../homePage/StoryView"; // Import the new component
import S1 from "../../../assets/FrontpageIcons/StoriesLogos/S1.jpg";
import S2 from "../../../assets/FrontpageIcons/StoriesLogos/S2.jpg";
import S3 from "../../../assets/FrontpageIcons/StoriesLogos/S3.jpg";
import CloseIconShow from "../../../assets/FrontpageIcons/closeIconShow.svg"
import StoryLogo from "../../../assets/FrontpageIcons/YoutubeShort.png";
import S4 from "../../../assets/FrontpageIcons/StoriesLogos/S4.avif";
import S5 from "../../../assets/FrontpageIcons/StoriesLogos/S5.jpeg";
import S6 from "../../../assets/FrontpageIcons/StoriesLogos/S6.jpg";
import P1 from "../../../assets/FrontpageIcons/StoriesLogos/P1.jpg";
import P2 from "../../../assets/FrontpageIcons/StoriesLogos/P2.jpg";
import P3 from "../../../assets/FrontpageIcons/StoriesLogos/P3.jpg";
import P4 from "../../../assets/FrontpageIcons/StoriesLogos/P4.jpg";
import P5 from "../../../assets/FrontpageIcons/StoriesLogos/P5.jpg";
import P6 from "../../../assets/FrontpageIcons/StoriesLogos/P6.jpg";
import AddLogo from "../../../assets/FrontpageIcons/StoriesLogos/Add.svg";
import Block from "../../utils/customComponent/Block";
import { useDispatch } from "react-redux";
import { createStort, getStory } from "../../../redux/slice/storysSlice";
import { baseURL, userData_ } from "../../utils/config";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";

const storiesList = [
  { name: "You", image: S1, userlogo: P1 },
  { name: "Jonathan", image: S2, userlogo: P2 },
  { name: "Jessica12", image: S3, userlogo: P3 },
  { name: "Jessica", image: S4, userlogo: P4 },
  { name: "Wiston", image: S5, userlogo: P5 },
  { name: "Queen", image: S6, userlogo: P6 },
];

const Stories: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedStory, setSelectedStory] = useState(null); // State for the selected story
  const [showAddStory, setShowAddStory] = useState(false); // State to track "Add story" click
  const [storyImg, setStoryImg] = useState<any>()
  const { storyAll } = useSelector((state: RootState) => state.story);
  const [storyShowImg, setStoryShowImg] = useState<any>()
  const [adStoryModel, setAdStoryModel] = useState(false)
  const [storyAllData, setStoryAllData] = useState<any>([])

  useEffect(() => {
    dispatch(getStory(userData_?._id))
  }, [])

  useEffect(() => {
    if (storyAll) {
      setStoryAllData(storyAll)
    }
  }, [storyAll])

  const handleStoryClick = (story: any) => {
    console.log("story", story)
    setSelectedStory(story); // Set the selected story when clicked
  };

  const handleBack = () => {
    setSelectedStory(null); // Clear the selected story to go back
    setShowAddStory(false); // Reset Add Story mode
  };

  // const handleAddStoryClick = () => {
  //   // setShowAddStory(true); // Show the Userstoryview when Add story is clicked
  //   console.log("story")
  // };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      const file = e.currentTarget.files[0]; // Get the first file only
      const imageURL = URL.createObjectURL(file);
      setStoryShowImg(imageURL)
      setStoryImg(file)
      setAdStoryModel(true)
    }
  };

  const uploadStory = () => {
    const formData = new FormData();
    if (storyImg && storyImg instanceof File) {
      formData.append("storyFile", storyImg);
    }
    formData.append("userId", userData_?._id);
    dispatch(createStort(formData))
  }

  useEffect(() => {
    console.log("storyAll", storyAll)
  }, [storyAll])

  return (
    <>
      {showAddStory ? (
        // If the "Add story" button is clicked, show Userstoryview
        <Userstoryview onBack={handleBack} />
      ) : selectedStory ? (
        // If a story is selected, show StoryView
        <StoryView story={selectedStory} onBack={handleBack} />
      ) : (
        // Show Stories list
        <Grid
          className={"flex overflow-y-auto scrollbar-none"}
          style={{
            backgroundColor: "#2a2a2a",
            margin: "0px 10px",
            borderRadius: "10px",
          }}
        >
          <Block className="text-white text-lg mt-3 mb-0 inline-flex justify-start items-start">
            <img className="mx-2" src={StoryLogo} />
            <Grid className={"text-[22px] font-extrabold"}>Story</Grid>
          </Block>
          <div className="grid grid-flow-col auto-cols-max md:gap-4 gap-2 p-2 storyHome xl:mb-6 lg:mb-4 md:mb-3 mb-1 overflow-x-auto no-scrollbar">
            <Grid
              onClick={() => document.getElementById("thumbnailUpload")!.click()} // Trigger input click
              className="w-[140px] h-[200px] text-white flex items-center justify-center rounded-lg bg-gray-500 text-gray-700 font-bold text-[15px] shadow-lg"
              style={{ background: "rgba(59, 59, 59, 1)", cursor: "pointer" }}
            // onClick={handleAddStoryClick} // Add onClick handler
            >
              <input
                type="file"
                id="thumbnailUpload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleThumbnailUpload}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out p-4 shadow-md"
              />
              <img src={AddLogo} style={{ marginBottom: "6px" }} />
              Add story
            </Grid>
            {Array.isArray(storyAllData) && storyAllData?.length > 0 && storyAllData?.map((story: any, index: number) => (
              <article
                key={index}
                className="inline-block relative"
                onClick={() => handleStoryClick(story)}
              >

                <div className="w-[140px] h-[200px] bg-cover rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={story?.storyData[0]?.storyFile ? baseURL + story?.storyData[0]?.storyFile : storiesList[0]?.image}
                    alt={story?.userData?.userName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <figure className="absolute bottom-0 transform translate-x-1/2 left-5.5 w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-white overflow-hidden -translate-y-1/2">
                  <img
                    src={story?.userData?.userImg ? baseURL + story?.userData?.userImg : storiesList[0]?.userlogo}
                    alt={story?.userData?.userName}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <figcaption className="text-center mt-5 font-semibold">
                  {story?.userData?.userName}
                </figcaption>
              </article>
            ))}
          </div>
        </Grid>
      )}
      {
        adStoryModel && (
          <>
            <div className="dialogBoxMain scrollbarShow storyViewDialog" style={{ width: "100%", maxWidth: "100%" }}>
              <div className="dialogBoxBody scrollbarShow" style={{ width: "100%" }}>
                <div className="relative" style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                  alignItems: "center",
                  borderBottom: "1px solid white",
                  paddingBottom: "10px",
                  width: "100%"
                }}>
                  <Block className="showTitleStory text-white text-lg xl:my-8 lg:my-6 md:my-4 my-2 inline-flex justify-start items-start">
                    <img className="mx-2" src={StoryLogo} />
                    <Grid className="text-[22px] font-extrabold">Shorts</Grid>
                  </Block>
                  {/* <h6 style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>Comments</h6> */}
                  <div onClick={() => setAdStoryModel(false)} style={{
                    cursor: "pointer",
                    zIndex: "11111",
                    width: "35px",
                    height: "35px",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    <img src={CloseIconShow} style={{ width: "20px" }} />
                  </div>
                </div>

                <div className={"showStoryImgBox"}>
                  {
                    storyShowImg && (
                      <img src={storyShowImg} />
                    )
                  }
                  <div className={"uploadStory"}>
                    <button onClick={() => uploadStory()}>Upload Story</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }

    </>
  );
};

export default Stories;
