import Block from "../../utils/customComponent/Block";
import Grid from "../../utils/customComponent/Grid";
import BackArrow from "../../../assets/home/backArrow.svg"
import CameraIcon from "../../../assets/FrontpageIcons/cameraIcon.png"
import VideoCreator from "../../../assets/FrontpageIcons/VideoCreator.avif";
import { useEffect, useState } from "react";
import { baseURL, userData_ } from "../../utils/config";
import InputComponent from "../../utils/customComponent/Input";
import Button from "../../utils/customComponent/Button";
import { AppDispatch } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { getUserProfile, updateProfileUser } from "../../../redux/slice/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function EditPageProfile() {

    const [image, setImage] = useState<any>([]);
    const [imagePath, setImagePath] = useState(baseURL + userData_?.userImg);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    const { userProfile } = useSelector((state: any) => state.auth);
    const [name, setName] = useState("")
    const [userName, setUserName] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const [email, setEmail] = useState("")
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        userName: "",
        birthDate: "",
    });

    useEffect(() => {
        dispatch(getUserProfile(userData_?._id))
        setErrors({
            name: "",
            email: "",
            userName: "",
            birthDate: "",
        })
    }, [])

    useEffect(() => {
        setName(userProfile?.fullName)
        setUserName(userProfile?.userName)
        setBirthDate(userProfile?.birthDate)
        setEmail(userProfile?.email)
        // setImagePath(baseURL + userProfile?.userImg)
    }, [userProfile])


    const handleUploadImage = (e: any) => {
        setImage(e.target.files[0]);
        setImagePath(URL.createObjectURL(e.target.files[0]));
    }

    const handlePrevious = (path: string) => {
        window.open(path, "_blank");
    }

    const hadnleUpdateProfile = () => {
        const formData = new FormData();
        formData.append("fullName", name);
        formData.append("userName", userName);
        formData.append("email", email);
        if (image) {
            formData.append("userImg", image);
        }
        formData.append("birthDate", birthDate);
        const payload = {
            userId: userData_?._id,
            data: formData
        }
        dispatch(updateProfileUser(payload))
        navigate("/user/home")
    }

    useEffect(() => {
        console.log("imagePath", imagePath)
    }, [imagePath])

    return (
        <div style={{ padding: "0px 10px" }} className={"no-scrollbar"}>
            <Block className={"fixed space-x-4 w-full z-1 px-4 py-3"} style={{ backgroundColor: "#000f16" }}>
                <img onClick={() => navigate("/user/home")} src={BackArrow} />
                <Grid className="text-white text-xl font-bold">View Channle Profile</Grid>
            </Block>
            <div className={" mt-16"} style={{ height: "100%", display: "flex", justifyContent: "start", alignItems: "center" }}>
                <Block className={"px-3"} style={{ flexDirection: "column", justifyContent: "center", border: "1px solid white", borderRadius: "8px", height: "100%", width: "30%", padding: "10px" }}>
                    <div style={{ position: "relative" }}>
                        <input
                            id="file-input"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e: any) => handleUploadImage(e)}
                        />
                        <img
                            src={imagePath ? imagePath : VideoCreator}
                            alt="admin"
                            className="mx-auto p-1 border "
                            onError={(e: any) => {
                                e.target.src = VideoCreator;
                            }}
                            style={{
                                width: 180,
                                height: 180,
                                objectFit: "cover",
                                display: "block",
                                borderRadius: "50%",
                            }}
                            onClick={() => handlePrevious(imagePath)}
                        />
                        <div
                            style={{ position: "absolute", bottom: "-5%", right: "40%" }}
                        >
                            <div
                                style={{
                                    borderRadius: 50,
                                    height: 29,
                                }}
                            >
                                <label htmlFor="file-input" style={{ backgroundColor: "white", width: "38px", display: "flex", borderRadius: "6px", alignItems: "center", justifyContent: "center" }}>
                                    <img src={CameraIcon} width="22px" height="22px" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={"mt-3"}>
                        <h6 className={"text-white"} style={{ fontSize: "20px", textTransform: "capitalize" }}>{userData_?.userName}</h6>
                    </div>
                </Block>
                <Block style={{ flexDirection: "column", marginLeft: "10px", width: "70%", alignItems: "flex-start", border: "1px solid white", borderRadius: "8px", height: "100%", padding: "10px" }}>
                    <Grid className={"leading-tight"}>
                        <Grid
                            className={"text-[24px] opacity-[90%] font-extrabold text-white"}
                        >
                            {/* {signedUser?.name}
                        {signedUser?.email} */}
                        </Grid>
                    </Grid>
                    <Grid className={"w-[100%]"}>
                        <Block className={"w-[100%]"}>
                            <Grid
                                className={"w-[100%] text-[12px] opacity-[90%] font-normal text-white"}
                            >
                                <div className="mb-3 inputShow">
                                    <label
                                        className="mb-2 text-gray ml-3 w-[100%]"
                                        style={{ fontSize: 15 }}
                                    >
                                        Name
                                    </label>
                                    <InputComponent value={name} onChange={(e) => setName(e.currentTarget.value)} placeholder="Name" classname='bg-blur text-white rounded-xl' type="text" />
                                    {/* <input
                                        type="text"
                                        placeholder="name"
                                        value={name}
                                        onChange={(e: any) => {
                                            setName(e.target.value);
                                            if (!e.target.value) {
                                                return setError({
                                                    ...error,
                                                    name: "Name is required !",
                                                });
                                            } else {
                                                return setError({
                                                    ...error,
                                                    name: "",
                                                });
                                            }
                                        }}
                                    /> */}
                                    {errors.name && <span className="text-red-500 text-[12px]">{errors.name}</span>}
                                </div>
                                <div className="mb-3 inputShow">
                                    <label
                                        className="mb-2 text-gray ml-3 w-[100%]"
                                        style={{ fontSize: 15 }}
                                    >
                                        User Name
                                    </label>
                                    <InputComponent value={userName} onChange={(e) => setUserName(e.currentTarget.value)} placeholder="UserName" classname='bg-blur text-white rounded-xl' type="text" />
                                    {errors.userName && <span className="text-red-500 text-[12px]">{errors.userName}</span>}
                                </div>
                                <div className="mb-3 inputShow">
                                    <label
                                        className="mb-2 text-gray ml-3 w-[100%]"
                                        style={{ fontSize: 15 }}
                                    >
                                        Email
                                    </label>
                                    <InputComponent value={email} onChange={(e) => setEmail(e.currentTarget.value)} placeholder="Email" classname='bg-blur text-white rounded-xl' type="email" />
                                    {errors.email && <span className="text-red-500 text-[12px]">{errors.email}</span>}
                                </div>
                                <div className="birthDateInput mb-3">
                                    <label
                                        className="mb-2 text-gray ml-3 w-[100%]"
                                        style={{ fontSize: 15 }}
                                    >
                                        Birth Date
                                    </label>
                                    <InputComponent value={birthDate} onChange={(e) => setBirthDate(e.currentTarget.value)} type="date" />
                                    {errors.birthDate && <span className="text-red-500 text-[12px]">{errors.birthDate}</span>}
                                </div>
                                <Button onClick={hadnleUpdateProfile}>Update Profile</Button>
                            </Grid>
                        </Block>
                    </Grid>
                </Block>
            </div>
        </div>
    )
}