import Block from "./Block";
import Grid from "./Grid";
import YoutubeLogo from "../../../assets/FrontpageIcons/headerLogo.png"
// import YoutubeText from "../assets/FrontpageIcons/YoutubeText.svg"

import Image from "./Image";
import { ReactComponent as ConnectDevice } from "../../../assets/FrontpageIcons/ConnectDevice.svg"
import { ReactComponent as SearchIcon } from "../../../assets/FrontpageIcons/SearchIcon.svg"
import { ReactComponent as Notification } from "../../../assets/FrontpageIcons/Notification.svg"
// import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
// import ConnectDevicesDialog from "./Icons/ConnectWithDevices";
import Drawer from "../../FrontPageComponents/Drawer";
// type HeaderProps = PropsWithChildren
// props: HeaderProps
export default function Header() {
  const [searchbar, setSearchBar] = useState(false)
  const [cast, setCast] = useState(false)
  const handleSearch = () => {
    setSearchBar(true)
  }

  return (
    <Grid className="max-w-full px-4 py-2 flex sticky bg-black" style={{ borderBottom: "1px solid #CECECE", paddingBottom: "2px" }}>
      <Block className="justify-between">
        <Block className={"gap-1 ml-1"}>
          <Image src={YoutubeLogo} style={{ width: "120px", height: "60px" }} />
        </Block>
        <Block className={"relative w-[70%] justify-end"}>
          <div className="mr-3" onClick={handleSearch}><SearchIcon /></div>
          <Drawer />
        </Block>
        {/* {!searchbar ? (
          <Block className={"space-x-6"}>
            <div onClick={() => setCast(true)}><ConnectDevice /></div>
            <Link to={"/notification"}>
              <Notification />
            </Link>
            <div onClick={handleSearch}><SearchIcon /></div>
          </Block>
        ) : (
          <Block className={"relative w-[70%]"}>
            <input
              type={"text"}
              onMouseOut={() => setSearchBar(false)}
              className={"h-[25px] w-[90%] bg-[#242424] rounded-full px-4 text-white text-[13px] pl-10"}
              placeholder={"Search video..."}
            />
            <button type="button" className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"
                />
              </svg>
            </button>
          </Block>
        )} */}
        {/* {cast && <ConnectDevicesDialog setCast={() => setCast(false)} />} */}
      </Block>
    </Grid>

  )
}


