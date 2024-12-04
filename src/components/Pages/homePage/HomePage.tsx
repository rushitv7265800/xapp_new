import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { getAllShort } from '../../../redux/slice/shortsSlice';
import { baseURL, userData_ } from '../../utils/config';
import StoryLogo from "../../../assets/FrontpageIcons/YoutubeShort.png";
import Grid from '../../utils/customComponent/Grid';
import Block from '../../utils/customComponent/Block';
import { ReactComponent as VerticalDots } from "../../../assets/FrontpageIcons/VerticalDots.svg";
import Image from '../../utils/customComponent/Image';
import { ReactComponent as Compass } from "../../../assets/FrontpageIcons/Compass.svg";
import { getAllCategory } from '../../../redux/slice/categorySlice';
import Drawer from '../../FrontPageComponents/Drawer';
import Stories from './Stories';
import VideoComponent from './VideoComponent';
import Header from '../../utils/customComponent/Header';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate=useNavigate()

  const CategoryBar = () => {
    const { category } = useSelector((state: RootState) => state.category);
    const [categoryData, setCategoryData] = useState<any>([]);
    const [CatSelect, setcatSelect] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    // const categories = ["All", "Music", "Gaming", "News", "Sports", "Learning", "Live", "Kapil Sharma", "Tarak Maheta", "Comdedy", "Hollywood"];

    useEffect(() => {
      dispatch(getAllCategory());
    }, []);

    useEffect(() => {
      setCategoryData(category);
    }, [category]);
    // const { toggle } = Drawer.useDrawer();

    return (
      <Block className={"xl:mt-20 lg:mt-18 mt-16  ml-3.5"}>
        {/* <Grid onClick={toggle} style={{ display: "flex", alignItems: "center", flexDirection: "row" }} className={"px-3 w-[30%] min-width-[20%] py-[7px] rounded-lg bg-[#2c2c2c] flex items-center justify-center flex-row category"}> */}
        <Grid style={{ display: "flex", alignItems: "center", flexDirection: "row" }} className={"px-3 w-[30%] min-width-[20%] py-[7px] rounded-lg bg-[#2c2c2c] flex items-center justify-center flex-row category"}>
          {/* <Image src={} style={{ width: "30px" }} /> */}
          <Compass />
          <h6 style={{ marginLeft: "10px", color: "rgba(255, 255, 255, 1)" }}>Category's</h6>
        </Grid>
        <Block className="flex overflow-x-auto items-center space-x-2 mx-3 mt-3 mb-3 scrollbar-none">
          {categoryData?.map((category: any, index: number) => (
            <Block
              onClick={() => setcatSelect(category)}
              key={index}
              className={`cursor-pointer flex-none ${CatSelect == category || (CatSelect == "" && index === 0) ? "text-black font-bold bg-white" : "text-white bg-[#2c2c2c]"} rounded-lg px-4 py-1.5 whitespace-nowrap text-[16px]  font-bold border ${index === 1 ? 'border-b-yellow-400 border-t-red-500 border-l-lime-400 border-r-blue-500' : 'border-none'}`}
            >
              {category?.name}
            </Block>
          ))}
        </Block>
      </Block>
    )
  };

  const Shorts = () => {
    const [post, setPost] = useState(false);
    const [start, setStart] = useState(1);
    const [limit, setLimit] = useState(20);
    const { shorts } = useSelector((state: RootState) => state.short);
    const [shortsData, setShortsData] = useState<any[] | undefined>(undefined);

    useEffect(() => {
      setStart(1)
      setLimit(10)
      const payload = {
        start: start,
        limit: limit,
        userId: userData_?._id
      }
      dispatch(getAllShort(payload))
    }, [start, limit])

    useEffect(() => {
      if (shorts) {
        setShortsData(shorts || [])
      }
    }, [shorts])

    const handleShorts = (short: any) => {
      console.log('Short clicked:', short);
      localStorage.setItem("selectShort", JSON.stringify(short))
      navigate("/user/shorts")
    }

    return (
      <Grid className="p-3 pb-0">
        <Block className="text-white text-lg xl:my-8 lg:my-6 md:my-4 my-2 inline-flex justify-start items-start">
          <img className="mx-2" src={StoryLogo} />
          <Grid className="text-[22px] font-extrabold">Shorts</Grid>
        </Block>
        <div className="flex items-center lg:w-full w-[166%] lg:w-auto transition-all">
          {shortsData?.slice(0, 5)?.map((short, index) => (
            <Block
              key={index}
              className="cursor-pointer relative bg-gray-800 rounded-lg ml-3 mr-3"
            >
              <Grid
                onClick={() => setPost(true)}
                className="absolute z-10 top-2 right-1 w-[24px] h-[24px]"
              >
                {/* <Image src={verticalDots} className="w-[24px] h-[24px]" /> */}
                <VerticalDots />
              </Grid>

              <img
                onClick={() => handleShorts(short)}
                src={short.shortThumbnail ? baseURL + short?.shortThumbnail : ""}
                className="object-cover rounded-lg w-[100%] h-[100%]"
              />

              <Grid className="absolute bottom-2 left-2 text-white leading-snug font-medium text-[9px] sm:text-[16px] md:text-[12px]">
                {short.shortTitle}
                <span>
                  {short?.hashTag?.map((item: any) => {
                    return <>{item + " "}</>;
                  })}
                </span>
              </Grid>
            </Block>
          ))}
        </div>
      </Grid>
    )
  }


  return (
    <div>
      <div className="h-full w-full font-roboto items-start justify-center overflow-hidden bg-black">
        <Grid className={"mr-2 z-50 fixed w-[100%]"}>
          {/* <Header /> */}
          <Header />
        </Grid>
        <h6>HomePage</h6>
        <CategoryBar />
        <div style={{ backgroundColor: "#2a2a2a" }}>
          <Stories />
          {/* <AddComponent /> */}
        </div>
        <Shorts />
        <Grid className="flex overflow-x-[250px]">
          <VideoComponent pb={4} />
        </Grid>
      </div>
    </div>
  )
}
