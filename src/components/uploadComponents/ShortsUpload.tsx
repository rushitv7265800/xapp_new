import Grid from "../utils/customComponent/Grid";
import StoryLogo from "../../assets/FrontpageIcons/YoutubeShort.png"
import Block from "../utils/customComponent/Block";
import { useEffect, useState } from "react";
import { ReactComponent as BackArrow } from "../../assets/home/backArrow.svg";
import { useRef } from "react";
import Image from "../utils/customComponent/Image";
import { ReactComponent as Camera } from "../../assets/home/Camera.svg";
import { AppDispatch, RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllCategory } from "../../redux/slice/categorySlice";
import { userData_ } from "../utils/config";
import { createShort } from "../../redux/slice/shortsSlice";
import { useNavigate } from "react-router-dom";
import { DangerRight } from "../../components/utils/toastServices";


interface videoMetaData {
  video: File | null;
  cameraActive: boolean;
  videoURL: string;
  description: string;
  filters: string;
  rotateAngle: number;
  isRecording: boolean;
  title: string;
  videoType: boolean;
  hashTag: any,
  image: File | null;
  imageURL: string;
  categories: object;
}
const videoData = {
  VideoPauseSound: "../../assets/home/VideoPauseSound.wav",
  VideoPlayAudio: "../../assets/home/VideoPlayAudio.wav"
}
const ShortsUpload = () => {
  const [alertMsg, setAlertMsg] = useState("");
  const [alertError, setAlertError] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunks = useRef<Blob[]>([]);
  const [loading, setLoading] = useState(false);
  const audioRefPlay = useRef<any>(new Audio(videoData?.VideoPlayAudio));
  const audioRefpause = useRef<any>(new Audio(videoData?.VideoPauseSound));

  const [videoMetaData, setVideoMetaData] = useState<any>({
    videoURL: "",
    cameraActive: false,
    video: null,
    hashTag: [],
    title: "",
    description: "",
    filters: "",
    rotateAngle: 0,
    isRecording: false,
    videoType: true,
    image: null,
    imageURL: "",
    categories: {}
  });
  const { category } = useSelector((state: RootState) => state.category);
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [categoryData, setCategoryData] = useState<any>([])
  const SetterVideo = (data: Partial<videoMetaData>) => {
    setVideoMetaData((prev) => {
      return { ...prev, ...data };
    });
  };
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    thumbnail: "",
    video: "",
    categories: "",
    hashTag: ""
  });


  useEffect(() => {
    dispatch(getAllCategory())
  }, [])

  useEffect(() => {
    setCategoryData(category)
  }, [category])

  const validateFields = () => {
    let isValid = true;
    const newErrors = { title: "", description: "", thumbnail: "", video: "", hashTag: "", categories: "" };

    if (!videoMetaData.title) {
      newErrors.title = "Title is required";
      isValid = false;
    }
    if (!videoMetaData.description) {
      newErrors.description = "Description is required";
      isValid = false;
    }
    if (!videoMetaData.categories || Object.keys(videoMetaData.categories).length === 0) {
      newErrors.categories = "Category is required";
      isValid = false;
    }
    if (!videoMetaData.hashTag || videoMetaData.hashTag.length === 0) {
      newErrors.hashTag = "At least one hashtag is required.";
      isValid = false;
    } else if (videoMetaData.hashTag.some((tag: any) => !/^#[a-zA-Z0-9_]+$/.test(tag))) {
      newErrors.hashTag = "Invalid hashtags detected. Ensure they start with # and contain only alphanumeric characters or underscores.";
      isValid = false;
    }
    if (!videoMetaData.imageURL) {
      newErrors.thumbnail = "Thumbnail is required";
      isValid = false;
    }
    if (!videoMetaData.videoURL) {
      newErrors.video = "Video is required";
    }

    setErrors(newErrors);
    return isValid;
  };

  const ErrorDialog = () => {
    return (
      <Grid className="p-4 top-[40%] z-20 w-[90%] mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800">
        <div className="flex items-center">
          <svg
            className="flex-shrink-0 w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <h3 className="text-lg font-medium">{alertMsg}</h3>
        </div>
        {/* {(errors.email.length > 0 || errors.password.length > 0) && */}
        <div className="mt-2 mb-4 text-sm">
          {/* {JSON.stringify(Object.values(errors))} */}
        </div>
        {/* } */}
        <div className="flex">
          <button
            onClick={() => setAlertError(false)}
            type="button"
            className="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800"
            data-dismiss-target="#alert-additional-content-2"
            aria-label="Close"
          >
            Ok
          </button>
        </div>
      </Grid>
    );
  };

  const SuccessDialog = () => {
    return (
      <Grid className="p-4 top-[40%] z-20 w-[90%] mb-4 text-green-400 border border-green-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800">
        <div className="flex items-center">
          <svg
            className="flex-shrink-0 w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <h3 className="text-lg font-medium">{alertMsg}</h3>
        </div>
        <div className="flex">
          <button
            onClick={() => setAlertSuccess(false)}
            type="button"
            className="text-green-400 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-500 dark:hover:text-white dark:focus:ring-green-800"
            data-dismiss-target="#alert-additional-content-2"
            aria-label="Close"
          >
            Ok
          </button>
        </div>
      </Grid>
    );
  };
  const Header = () => {
    return (
      <Block className={"fixed space-x-4 w-full z-1 bg-[black] px-4 py-3"}>
        <div onClick={() => navigate("/user/home")}><BackArrow /></div>
        <Block className="text-white text-lg xl:my-8 lg:my-6 md:my-4 my-2  inline-flex justify-start items-start">
          <img className="mx-2" src={StoryLogo} />
          <Grid className="text-[22px] font-extrabold">Upload Short</Grid>
        </Block>      </Block>
    );
  };

  const Loader = () => {
    return (
      <div className="fixed inset-0 flex font-roboto items-center justify-center z-20">
        {/* Overlay */}
        <div className="fixed inset-0 flex bg-black bg-opacity-50"></div>
        <Block className="fixed flex items-start w-[75%] p-4 justify-center z-10  px-5 gap-5 left-13 right-0 h-auto bg-[#242424] overflow-y-auto">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
          <div>Uploading...</div>
        </Block>
      </div>
    );
  };

  // useMutation hook for video

  // const videoUploadMutation = useMutation({
  //   mutationFn: ({
  //     file_url,
  //     thumbnail,
  //     is_private,
  //     caption,
  //   }: {
  //     file_url: File;
  //     thumbnail: File;
  //     is_private: boolean;
  //     caption: string;
  //   }) => {
  //     // Call the API to upload the video
  //     return ApiController.shortUpload(
  //       file_url,
  //       thumbnail,
  //       is_private,
  //       caption
  //     );
  //   },
  //   onSuccess: (data) => {
  //     setLoading(false);
  //     setAlertMsg(JSON.stringify(data));
  //     setAlertSuccess(true);
  //     SetterVideo({ video: null });
  //   },
  //   onError: (error: ClientError) => {
  //     setLoading(false);
  //     setAlertMsg(JSON.stringify(error));
  //     setAlertError(true);
  //   },
  // });
  // Function to trigger the video upload mutation
  const videoUpload = () => {
    console.log("videoMetaData", videoMetaData)
    if (validateFields()) {
      // setLoading(true);
      if (!videoMetaData.video) {
        console.log("No video file selected");
        return;
      }

      if (!videoMetaData.title || !videoMetaData.description) {
        console.log("Title or description is missing");
        return;
      }
      if (!videoMetaData.image) {
        console.log("Image file not selected");
        return;
      }

      // Trigger the mutation to upload the video
      // videoUploadMutation.mutate({
      //   file_url: videoMetaData.video,
      //   thumbnail: videoMetaData.image,
      //   is_private: videoMetaData.videoType,
      //   caption: videoMetaData.title,
      // });
      const formData = new FormData();

      // Add file-like data (if any)
      if (videoMetaData?.video && videoMetaData?.video instanceof File) {
        formData.append('shortFile', videoMetaData?.video);
      } else {
        // Append null if video is invalid, or omit it entirely
        formData.append('shortFile', "");
      }

      if (videoMetaData?.image && videoMetaData?.image instanceof File) {
        formData.append('shortThumbnail', videoMetaData?.image);
      } else {
        // Append "" if image is invalid, or omit it entirely
        formData.append('shortThumbnail', "");
      }

      // Add string fields
      formData.append('shortTitle', videoMetaData?.title || '');
      formData.append('shortDescription', videoMetaData?.description || '');
      formData.append('hashTag', videoMetaData?.hashTag || '');
      formData.append('shortType', String(videoMetaData?.videoType || ''));
      formData.append('uniqueId', userData_?.uniqueId || '');
      formData.append('userId', userData_?._id || '');

      // Add category (ensure it's correctly parsed as a string or object)
      formData.append('category', videoMetaData?.categories ? JSON.stringify(videoMetaData?.categories) : '');

      // Debugging FormData
      console.log("formData", formData);
      dispatch(createShort(formData));
      navigate("/user/home")
    } else {
      // If fields are invalid
      setAlertMsg("Error in fields...!");
      setAlertError(true);
      setLoading(false);
    }
  };

  // Function to play the sound effect
  const playSound = () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      audioRefPlay.current.play();
    }
  };
  const pauseSound = () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      audioRefpause.current.play();
    }
  };

  // Open the camera and start video stream
  const openCamera = async () => {
    try {
      // Check if the browser supports media devices and getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        DangerRight("Camera not supported on this device or browser.");
        throw new Error("Camera not supported on this device or browser.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        SetterVideo({ cameraActive: true }); // Set camera active state
      }
    } catch (error) {
      console.error("Error accessing camera:", error.message);
      DangerRight(error.message); // Display error message
      SetterVideo({ cameraActive: false }); // Set camera inactive state
    }
  };

  const startRecording = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      mediaRecorderRef.current = new MediaRecorder(stream);

      // Collect data chunks as the recording is happening
      mediaRecorderRef.current.ondataavailable = (e) => {
        recordedChunks.current.push(e.data);
      };

      // When recording stops, process the video
      mediaRecorderRef.current.onstop = () => {
        // Create a Blob from the recorded chunks
        const videoBlob = new Blob(recordedChunks.current, {
          type: "video/mp4",
        });

        if (videoBlob.size > 0) {
          // Convert the Blob to a File to ensure type compatibility
          const videoFile = new File([videoBlob], "recording.mp4", {
            type: "video/mp4",
          });
          console.log("Recording success", videoFile);
          // Set the video file in the state (this assumes shorts is expecting a File)
          SetterVideo({
            video: videoFile,
            videoURL: URL.createObjectURL(videoBlob),
          });
        } else {
          console.error("Recording resulted in an empty video");
        }

        // Clear recorded chunks
        recordedChunks.current = [];

        // Turn off camera and reset recording state
        SetterVideo({ isRecording: false, cameraActive: false });
      };

      mediaRecorderRef.current.start();
      //setIsRecording(true); // Set recording to true
      SetterVideo({ isRecording: true });
    }
  };

  // Stop recording the camera feed
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  // Handle video upload from gallery
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files ? e.currentTarget.files[0] : null;

    if (file) {
      // Create a preview URL for the uploaded video
      const videoURL = URL.createObjectURL(file);

      // Create a video element to get the duration
      const video = document.createElement("video");
      video.preload = "metadata"; // Only load the metadata

      video.onloadedmetadata = () => {
        SetterVideo({ video: file, videoURL: videoURL, cameraActive: false });
        window.URL.revokeObjectURL(videoURL);
      };

      video.src = videoURL; // Set the video source to the object URL
    }
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      const file = e.currentTarget.files[0]; // Get the first file only

      // Create a preview URL for the uploaded image
      const imageURL = URL.createObjectURL(file);

      // Assuming SetterVideo is used for state management, you may want to rename it to something like `SetterImage`
      SetterVideo({ image: file, imageURL: imageURL, cameraActive: false });
    }
  };

  const handleRemoveShort = () => {
    //setVideo(null)
    SetterVideo({ video: null, videoURL: "" });
    setErrors({ title: "", description: "", thumbnail: "", video: "", hashTag: "", categories: "" });
  };
  const handleRemoveImage = () => {
    SetterVideo({ image: null, imageURL: "" });
    setErrors({ title: "", description: "", thumbnail: "", video: "", hashTag: "", categories: "" });
  };

  // const handlePostShorts = () => {
  //     console.log('Posted shorts: ', video);
  //     alert('Shorts have been posted successfully!');
  //     videoUpload()
  //     // setVideo(null); // Reset shorts after posting
  // };

  // Apply a filter to the video
  const applyFilter = (filter: string) => {
    SetterVideo({ filters: filter });
  };

  // Rotate the camera feed
  const rotateVideo = () => {
    SetterVideo({ rotateAngle: (videoMetaData.rotateAngle + 90) % 360 });
  };

  return (
    <Grid className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-black px-6 md:px-8 lg:px-12 flex items-center h-full min-h-[830px] mb-20 overflow-y-auto justify-start">
      <Header />
      {/* Camera Section */}
      <div className="mt-20 w-full md:w-[50%] bg-black bg-opacity-60 rounded-lg shadow-xl p-10">
        <Grid className="w-full flex justify-start mt-6 space-y-4">
          {/* Open Camera Button with Icon */}
          <button
            onClick={() => {
              openCamera();
              SetterVideo({ cameraActive: true });
            }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 text-white rounded-lg px-5 py-3 flex items-center gap-3 transition-all ease-in-out duration-300 shadow-md w-full sm:w-auto"
          >
            <Camera className="w-6 h-6" />
            Open Camera
          </button>

          {/* Rotate Button (Visible when camera is active) */}
          {videoMetaData.cameraActive && (
            <button
              onClick={rotateVideo}
              className="bg-gray-600 hover:bg-gray-700 text-white rounded-lg px-4 py-2 w-full transition-all ease-in-out duration-300 shadow-md"
            >
              Rotate
            </button>
          )}
        </Grid>

        {videoMetaData.cameraActive && (
          <>
            {videoMetaData.isRecording ? playSound() : pauseSound()}
            <Grid className="w-full flex justify-center relative mt-4">
              <video
                ref={videoRef}
                className={`w-full rounded-lg object-cover transform rotate-${videoMetaData.rotateAngle}`}
                style={{ filter: videoMetaData.filters }}
              />

              <Grid className="absolute text-white text-xs font-medium items-start space-y-2 top-12 right-2">
                <button onClick={() => applyFilter("brightness(0.8)")}>
                  Brightness
                </button>
                <button onClick={() => applyFilter("contrast(1.2)")}>
                  Contrast
                </button>
                <button onClick={() => applyFilter("sepia(1)")}>Sepia</button>
              </Grid>

              <Grid
                onClick={
                  videoMetaData.isRecording ? stopRecording : startRecording
                }
                className="rounded-full bottom-6 right-[43%] border-2 absolute bg-opacity-60 hover:bg-opacity-100 transition-all duration-300"
              >
                {!videoMetaData.isRecording ? (
                  <Grid className="w-[28px] h-[28px] rounded-full p-2 m-0.5 bg-red-600 hover:bg-red-700" />
                ) : (
                  <Grid className="w-[24px] h-[24px] p-2 rounded-sm m-1 bg-red-600 hover:bg-red-700" />
                )}
              </Grid>


              <Grid className="absolute bottom-1 right-5 text-xs text-red-500 font-medium">
                {videoMetaData.isRecording
                  ? "Recording start"
                  : "Recording paused"}
              </Grid>
            </Grid>
          </>
        )}

        {/* Gallery Upload Section */}
        <Grid className="w-full flex space-y-4 my-6">
          <label className="text-white text-lg">
            Or upload video from gallery
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out p-4 shadow-md"
          />
          {errors.video && (
            <span className="text-red-500 text-xs">{errors.video}</span>
          )}
        </Grid>

        {/* Display Selected Shorts */}
        <Block className="w-full overflow-x-auto">
          <Block className="w-full space-y-6 overflow-auto">
            <Grid className="relative flex-shrink-0 overflow-y-auto w-full space-y-4">
              <div className="relative flex justify-center">
                {videoMetaData.videoURL && (
                  <video
                    controls
                    src={videoMetaData.videoURL} // Use videoURL for preview
                    className="w-[60%] h-[350px] rounded-lg object-cover shadow-lg"
                  />
                )}
                {videoMetaData.video && (
                  <button
                    onClick={handleRemoveShort}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full px-3 py-2 text-xs z-5 shadow-lg"
                  >
                    ✕
                  </button>
                )}
              </div>

              <label className="block text-white text-lg">
                Upload video thumbnail (Poster)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out p-4 shadow-md"
              />
              {errors.thumbnail && (
                <span className="text-red-500 text-xs">{errors.thumbnail}</span>
              )}

              <div className="relative flex justify-center">
                {videoMetaData.imageURL && (
                  <img
                    src={videoMetaData.imageURL} // Use videoURL for preview
                    className="w-[60%] h-[350px] rounded-lg object-cover shadow-lg"
                  />
                )}
                {videoMetaData.image && (
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full px-3 py-2 text-xs z-10 shadow-lg"
                  >
                    ✕
                  </button>
                )}
              </div>

              <Block className="space-x-4 mt-6">
                <label
                  htmlFor="title"
                  className="block text-lg font-medium text-white mb-1"
                >
                  Video Type
                </label>
                <div
                  onClick={() => SetterVideo({ videoType: false })}
                  className="flex items-center w-[45%] ps-2 border border-gray-200 rounded dark:border-gray-700 cursor-pointer"
                >
                  <input
                    id="bordered-radio-1"
                    type="radio"
                    name="bordered-radio"
                    checked={videoMetaData.videoType == false}
                    onChange={() => SetterVideo({ videoType: false })}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="bordered-radio-1"
                    className="w-full py-3 ms-2 text-sm font-medium text-white dark:text-gray-500"
                  >
                    Private
                  </label>
                </div>
                <div
                  onClick={() => SetterVideo({ videoType: true })}
                  className="flex items-center w-[45%] ps-2 border border-gray-200 rounded dark:border-gray-700 cursor-pointer"
                >
                  <input
                    id="bordered-radio-2"
                    type="radio"
                    name="bordered-radio"
                    checked={videoMetaData.videoType}
                    onChange={() => SetterVideo({ videoType: true })}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="bordered-radio-2"
                    className="w-full py-3 ms-2 text-sm font-medium text-white dark:text-gray-500"
                  >
                    Public
                  </label>
                </div>
              </Block>

              {/* Title Input */}
              <div className="mt-6">
                <label
                  htmlFor="title"
                  className="block text-lg font-medium text-white mb-1"
                >
                  Title
                </label>
                <input
                  onChange={(e) =>
                    SetterVideo({ title: e.currentTarget.value })
                  }
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter title"
                  className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-md"
                />
                {errors.title && (
                  <span className="text-red-500 text-xs">{errors.title}</span>
                )}
              </div>

              {/* Description Textarea */}
              <div className="mt-6">
                <label
                  htmlFor="description"
                  className="block text-lg font-medium text-white mb-1"
                >
                  Description
                </label>
                <textarea
                  onChange={(e) =>
                    SetterVideo({ description: e.currentTarget.value })
                  }
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Enter description"
                  className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-md"
                />
                {errors.description && (
                  <span className="text-red-500 text-xs">
                    {errors.description}
                  </span>
                )}
              </div>
              {/* hashtag */}
              <div className="mt-6">
                <label
                  htmlFor="hashtag"
                  className="block text-lg font-medium text-white mb-1"
                >
                  Hashtag
                </label>
                <textarea
                  onChange={(e) => {
                    const description = e.currentTarget.value;

                    // Extract hashtags
                    const hashtags = description
                      .split(/[\s,]+/) // Split by spaces or commas
                      .filter((tag) => /^#[a-zA-Z0-9_]+$/.test(tag)); // Keep valid hashtags

                    // Update state with hashtags
                    SetterVideo({ hashTag: hashtags });

                    // Check for invalid hashtags
                    const invalidHashtag = description
                      .split(/[\s,]+/) // Split by spaces or commas
                      .some((tag) => tag.startsWith("#") && !/^#[a-zA-Z0-9_]+$/.test(tag));

                    if (invalidHashtag) {
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        hashTag: "Invalid hashtags detected. Ensure hashtags start with # and contain only alphanumeric characters or underscores.",
                      }));
                    } else {
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        hashTag: "",
                      }));
                    }
                  }}
                  id="hashtag"
                  name="hashtag"
                  rows={2}
                  placeholder="Enter Hashtag..."
                  className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-md"
                />

                {errors.hashTag && (
                  <span className="text-red-500 text-xs">{errors.hashTag}</span>
                )}

              </div>
              <div className="mt-6">
                <label
                  htmlFor="hashtag"
                  className="block text-lg font-medium text-white mb-1"
                >
                  Category
                </label>
                <select
                  name="categories"
                  id="categories"
                  style={{
                    height: "43px",
                    borderRadius: "8px",
                    padding: "10px",
                    border: "1px solid rgb(213 216 221)",
                    width: "100%",
                  }}
                  onChange={(e: any) => {
                    const selectedCategory = categoryData.find(
                      (item: any) => item._id === e.target.value || item.name === e.target.value
                    );
                    if (selectedCategory) {
                      SetterVideo({ categories: selectedCategory });

                      // Reset error if a valid category is selected
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        categories: "",
                      }));
                    } else {
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        categories: "Category is required",
                      }));
                    }
                  }}
                >
                  <option value="">Select a category</option>
                  {categoryData?.map((item: any, index: number) => (
                    <option key={index} value={item?._id || item?.name}>
                      {item?.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.categories && (
                <span className="text-red-500 text-xs">
                  {errors.categories}
                </span>
              )}
            </Grid>
          </Block>
        </Block>

        {/* Post Button */}
        <Grid className="w-full flex justify-end mt-8">
          <button
            onClick={videoUpload}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700 text-white rounded-lg px-6 py-3 transition-all duration-300 ease-in-out shadow-lg"
          >
            Upload Short
          </button>
        </Grid>

        {alertSuccess && (
          <div className="fixed inset-0 flex items-center justify-center z-40">
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setAlertSuccess(false)}
            ></div>
            <SuccessDialog />
          </div>
        )}
        {alertError && (
          <div className="fixed inset-0 flex items-center justify-center z-40">
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setAlertError(false)}
            ></div>
            <ErrorDialog />
          </div>
        )}
        {loading && <Loader />}
      </div>
    </Grid>
  );
};
export default ShortsUpload;
