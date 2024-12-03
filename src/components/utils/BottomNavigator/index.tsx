//@ts-nocheck
import React, {
  FunctionComponent,
  SVGProps,
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import Grid from "../../utils/customComponent/Grid";
import Block from "../../utils/customComponent/Block";
import { ReactComponent as AccountSvg } from "../../assets/BottomNavigatorIcons/Account.svg";
import { BrowserRouter as Router } from "react-router-dom";
import { h } from "preact";
import { baseURL, userData_ } from "../../components/nUtil/config";

export type BottomNavigatorTypes = {
  initialScreen: string;
  screens: {
    name: string;
    icon: FunctionComponent<SVGProps<SVGSVGElement>> | React.ReactNode;
    router: React.ReactNode;
    show: boolean;
  }[];
  setCurrentScreen?: React.Dispatch<React.SetStateAction<string>>;
};

export const BottomNavigatorContext =
  createContext<BottomNavigatorTypes | null>(null);
const userData = localStorage.getItem("user");

let getDataLocal = {};
if (userData) {
  try {
    getDataLocal = JSON.parse(userData);
  } catch (error) {
    console.error("Error parsing JSON data:", error);
  }
}
function CreateBottomNavigator(props: BottomNavigatorTypes) {
  const { initialScreen, screens } = props;
  const [currentScreen, setCurrentScreen] = useState(initialScreen);
  const [showBottomBar, setShowBottomBar] = useState(true);
  const scrollTimeout = useRef(null);
  const CheckScreen = screens?.filter((item) => item.name === currentScreen);
  const contextValue = {
    ...props,
    setCurrentScreen,
  };

  const ShowScreen = () => {
    return CheckScreen[0].router;
  };

  if (!ShowScreen) {
    throw new Error(`Screen with name "${currentScreen}" not found`);
  }

  return (
    <BottomNavigatorContext.Provider value={contextValue}>
      <Grid className="md:items-center w-full h-[100vh]">
        <Grid className="w-full">
          {/* <ShowScreen /> */}
          {showBottomBar && CheckScreen[0].show && (
            <Block className="bottom-navigator fixed bottom-0 left-0 z-50 w-full bg-white transition-transform transform duration-300 ease-in-out">
              <div className="grid h-auto justify-between items-start pt-1.5 w-full grid-cols-5 font-medium bg-black">
                {screens.map((item, index) => {
                  const IconComponent = item.icon;
                  const color =
                    currentScreen === item.name ? "#ff86ac" : "#0000";
                  return (
                    <button
                      type="button"
                      key={index}
                      onClick={() => {
                        setCurrentScreen(() => item.name);
                      }}
                      className="inline-flex flex-col items-center justify-center button-nospan"
                    >
                      <Grid className="items-center justify-center font-roboto">
                        {/* {
                          item?.type === "userImg"
                            ?
                            // <img src={getDataLocal?.userImg ? baseURL + getDataLocal?.userImg : AccountSvg} style={{ borderRadius: "40px", width: "28px", height: "28px", objectFit: "cover", objectPosition: "top" }} />
                            <img src={userData_?.userImg ? userData_?.userImg : AccountSvg} onError={(e: any) => e.target.src = AccountSvg} style={{ borderRadius: "40px", width: "28px", height: "28px", objectFit: "cover", objectPosition: "top" }} />
                            :
                            <IconComponent fill={color} />
                        } */}
                        <IconComponent fill={color} />
                        {item.name === currentScreen && (
                          <span className="h-[3px]"></span>
                        )}
                      </Grid>
                      <Grid
                        className={
                          "text-[11px] mt-1 tracking-normal text-white font-thin font-roboto"
                        }
                      >
                        {index == 2 ? "" : item.name}
                      </Grid>
                    </button>
                  );
                })}
              </div>
            </Block>
          )}
        </Grid>
      </Grid>
    </BottomNavigatorContext.Provider>
  );
}

export function useBottomNavigation() {
  const context = useContext(BottomNavigatorContext);

  if (!context)
    throw new Error("useAuth must be used within an AuthContextProvider");

  return context;
}
export default CreateBottomNavigator;
