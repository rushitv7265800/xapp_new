import Grid from "../../utils/customComponent/Grid";
import Block from "../../utils/customComponent/Block";
import Image from "../../utils/customComponent/Image";
// import CC from "../../assets/FrontpageIcons/CC.svg";
// import Unmute from "../../assets/FrontpageIcons/UnMute.svg";
// import AddApplogo from "../../assets/FrontpageIcons/addAppLogo.png";
// import Mute from "../../assets/FrontpageIcons/mute.svg";
// import Star from "../../assets/FrontpageIcons/Star.svg";
import { ReactComponent as VerticalDots } from "../../../assets/FrontpageIcons/VerticalDots.svg";
// import Ads1 from "../../../assets/adsVideo/1ads.mp4";
// import Ads2 from "../../../assets/adsVideo/ads2.mp4";
// import Ads3 from "../../../assets/adsVideo/ads3.mp4";
import Ads2Img from "../../../assets/adsVideo/ads2.jpg";
import Ads3Img from "../../../assets/adsVideo/ads3.jpg";
import Ads1Img from "../../../assets/adsVideo/ads1.jpg";
import { ReactComponent as Visit } from "../../../assets/FrontpageIcons/Visit.svg";
import { useEffect, useRef, useState } from "react";
// import LockuserProfile from "../LockuserProfile";
// import SubscriptionModal from "../SubscriptionModal";

export default function AddComponent() {
  const [matches, setMatches] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const videoLink = 'Ads1';
  const videoLink2 = 'Ads2';
  const videoLink3 = 'Ads3';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia("(min-width: 1200px)");
      setMatches(mediaQuery.matches);

      const handleResize = (e: any) => {
        setMatches(e.matches);
      };

      mediaQuery.addEventListener("change", handleResize);

      // Clean up the event listener when the component unmounts
      return () => {
        mediaQuery.removeEventListener("change", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    setIsMuted(true);
  }, []);

  // const videoLink4 = "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";

  // Toggle mute function
  // const toggleMute = () => {
  //   if (videoRef.current) {
  //     videoRef.current.muted = !isMuted;
  //     setIsMuted(!isMuted);
  //   }
  //   ``;
  // };

  window
    .matchMedia("(min-width: 1200px)")
    .addEventListener("change", (e) => setMatches(e.matches));

  const [currentSlide, setCurrentSlide] = useState(0); // Track active slide
  const sliderRef = useRef<any>(null);

  const slides = [
    <Grid className={"mt-2 showAdsBox"}>
      <Grid
        className={"mt-1.5 relative mt-3"}
        style={{ marginLeft: "10px", marginRight: "10px" }}
      >
        <Grid
          className={"absolute z-1 w-7.5 p-1 bottom-0 right-2.5 bg-[#000000]"}
          style={{
            bottom: "10px",
            borderRadius: "10px",
            padding: "6px",
            cursor: "pointer",
          }}
        >
          <Visit style={{ width: "50px" }} />

          {/* <Image src={Visit} style={{ width: "50px" }} /> */}
        </Grid>
        <video
          src={videoLink3}
          className="h-full relative"
          ref={videoRef}
          autoPlay
          muted={isMuted}
          style={{ borderRadius: "10px" }}
          loop
        />
      </Grid>
      <Grid className={"my-4 mx-3.5 description"}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Block
            className={"flex flex-start showAdsTitle"}
            style={{ alignItems: "flex-start" }}
          >
            <Grid
              className={"logo p-1 bg-white rounded-lg showAdsTitleBox"}
              style={{
                borderRadius: "50%",
                width: "50px",
                height: "50px",
              }}
            >
              <Image
                src={Ads3Img}
                style={{
                  borderRadius: "50%",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Grid>
            <Block
              className={" ml-3 flex items-start showTopicTitle"}
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Grid
                className={
                  "flex topicText flex-wrap text-start text-[15px] opacity-[85%] leading-tight w-[80%] text-white "
                }
              >
                SUGAR's New TV Commercial
              </Grid>
              <Block className={" mt-1 "}>
                <Grid className={"text-[14px] text-white font-semibold"}>
                  Sponsored
                </Grid>
                <Grid
                  className={
                    "w-[0.2rem] ml-2 h-[0.2rem] rounded-full bg-white ml-1"
                  }
                ></Grid>
                <Block
                  className={
                    "ml-3 text-[14.5px] showSponserTextDesc opacity-[65%] leading-tight text-white"
                  }
                >
                  Hey SUGAR Fam, the
                </Block>
              </Block>
            </Block>
          </Block>
          <Block className={"dots-three mt-4 mr-1 cursor-pointer"}>
            {/* <Image src={VerticalDots} /> */}
            <VerticalDots />
          </Block>
        </div>
        <Block className={"flex gap-2.5 mt-3.5"}>
          <Grid
            className={
              "w-[50%] cursor-pointer border-[0.01rem] text-[#2793e6] py-1 font-bold text-[17px] tracking-normal rounded-3xl flex items-center"
            }
          >
            Watch
          </Grid>
          <Grid
            className={
              "w-[50%] cursor-pointer border-[0.01rem] text-black bg-[#2793e6] py-1 font-bold text-[17px] tracking-normal rounded-3xl flex items-center"
            }
          >
            Install
          </Grid>
        </Block>
      </Grid>
    </Grid>,
    <Grid className={"mt-2 showAdsBox"}>
      <Grid
        className={"mt-1.5 relative mt-3"}
        style={{ marginLeft: "10px", marginRight: "10px" }}
      >
        <Grid
          className={"absolute z-1 w-7.5 p-1 bottom-0 right-2.5 bg-[#000000]"}
          style={{
            bottom: "10px",
            borderRadius: "10px",
            padding: "6px",
            cursor: "pointer",
          }}
        >
          <Visit style={{ width: "50px" }} />

          {/* <Image src={Visit} style={{ width: "50px" }} /> */}
        </Grid>
        <video
          src={videoLink2}
          className="h-full relative"
          ref={videoRef}
          autoPlay
          muted={isMuted}
          style={{ borderRadius: "10px" }}
          loop
        />
      </Grid>
      <Grid className={"my-4 mx-3.5 description"}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Block
            className={"flex flex-start showAdsTitle"}
            style={{ alignItems: "flex-start" }}
          >
            <Grid
              className={"logo p-1 bg-white rounded-lg showAdsTitleBox"}
              style={{
                borderRadius: "50%",
                width: "50px",
                height: "50px",
              }}
            >
              <Image
                src={Ads2Img}
                style={{
                  borderRadius: "50%",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Grid>
            <Block
              className={" ml-3 flex items-start showTopicTitle"}
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Grid
                className={
                  "flex topicText flex-wrap text-start text-[15px] opacity-[85%] leading-tight w-[80%] text-white "
                }
              >
                SUGAR's New TV Commercial
              </Grid>
              <Block className={" mt-1 "}>
                <Grid className={"text-[14px] text-white font-semibold"}>
                  Sponsored
                </Grid>
                <Grid
                  className={
                    "w-[0.2rem] ml-2 h-[0.2rem] rounded-full bg-white ml-1"
                  }
                ></Grid>
                <Block
                  className={
                    "ml-3 text-[14.5px] showSponserTextDesc opacity-[65%] leading-tight text-white"
                  }
                >
                  Hey SUGAR Fam, the
                </Block>
              </Block>
            </Block>
          </Block>
          <Block className={"dots-three mt-4 mr-1 cursor-pointer"}>
            {/* <Image src={verticalDots} /> */}
            <VerticalDots />
          </Block>
        </div>
        <Block className={"flex gap-2.5 mt-3.5"}>
          <Grid
            className={
              "w-[50%] cursor-pointer border-[0.01rem] text-[#2793e6] py-1 font-bold text-[17px] tracking-normal rounded-3xl flex items-center"
            }
          >
            Watch
          </Grid>
          <Grid
            className={
              "w-[50%] cursor-pointer border-[0.01rem] text-black bg-[#2793e6] py-1 font-bold text-[17px] tracking-normal rounded-3xl flex items-center"
            }
          >
            Install
          </Grid>
        </Block>
      </Grid>
    </Grid>,
    <Grid className={"mt-2 showAdsBox"}>
      <Grid
        className={"mt-1.5 relative mt-3"}
        style={{ marginLeft: "10px", marginRight: "10px" }}
      >
        <Grid
          className={"absolute z-1 w-7.5 p-1 bottom-0 right-2.5 bg-[#000000]"}
          style={{
            bottom: "10px",
            borderRadius: "10px",
            padding: "6px",
            cursor: "pointer",
          }}
        >
          <Visit style={{ width: "50px" }} />

          {/* <Image src={Visit} style={{ width: "50px" }} /> */}
        </Grid>
        <video
          src={videoLink}
          className="h-full relative"
          ref={videoRef}
          autoPlay
          muted={isMuted}
          style={{ borderRadius: "10px" }}
          loop
        />
      </Grid>
      <Grid className={"my-4 mx-3.5 description"}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Block
            className={"flex flex-start showAdsTitle"}
            style={{ alignItems: "flex-start" }}
          >
            <Grid
              className={"logo p-1 bg-white rounded-lg showAdsTitleBox"}
              style={{
                borderRadius: "50%",
                width: "50px",
                height: "50px",
              }}
            >
              <Image
                src={Ads1Img}
                style={{
                  borderRadius: "50%",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Grid>
            <Block
              className={" ml-3 flex items-start showTopicTitle"}
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Grid
                className={
                  "flex topicText flex-wrap text-start text-[15px] opacity-[85%] leading-tight w-[80%] text-white "
                }
              >
                Choose Your Investment Plan | Motilal Oswal Stock Market App
              </Grid>
              <Block className={" mt-1 "}>
                <Grid className={"text-[14px] text-white font-semibold"}>
                  Sponsored
                </Grid>
                <Grid
                  className={
                    "w-[0.2rem] ml-2 h-[0.2rem] rounded-full bg-white ml-1"
                  }
                ></Grid>
                <Block
                  className={
                    "ml-3 text-[14.5px] showSponserTextDesc opacity-[65%] leading-tight text-white"
                  }
                >
                  Long-term Compounding
                </Block>
              </Block>
            </Block>
          </Block>
          <Block className={"dots-three mt-4 mr-1 cursor-pointer"}>
            {/* <Image src={verticalDots} /> */}
            <VerticalDots />

          </Block>
        </div>
        <Block className={"flex gap-2.5 mt-3.5"}>
          <Grid
            className={
              "w-[50%] cursor-pointer border-[0.01rem] text-[#2793e6] py-1 font-bold text-[17px] tracking-normal rounded-3xl flex items-center"
            }
          >
            Watch
          </Grid>
          <Grid
            className={
              "w-[50%] cursor-pointer border-[0.01rem] text-black bg-[#2793e6] py-1 font-bold text-[17px] tracking-normal rounded-3xl flex items-center"
            }
          >
            Install
          </Grid>
        </Block>
      </Grid>
    </Grid>,
  ];

  // Handle dot click to navigate to a slide
  const handleDotClick = (index: any) => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth;
      sliderRef.current.scrollTo({
        left: index * slideWidth,
        behavior: "smooth",
      });
      setCurrentSlide(index); // Update the active dot
    }
  };

  // Handle scroll to update the active dot
  const handleScroll = () => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth;
      const scrollPosition = sliderRef.current.scrollLeft;
      const index = Math.round(scrollPosition / slideWidth);
      setCurrentSlide(index);
    }
  };

  return (
    <div className="mx-3">
      <div
        className={""}
        style={{
          background: "rgb(42, 42, 42)",
          marginTop: "6px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            width: "60px",
            fontSize: "16px",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          Ads
        </div>
        {matches === false ? (
          <div className="scroll-snap-slider">
            {/* Horizontal scrollable container */}
            <div
              className="slider no-scrollbar"
              ref={sliderRef}
              onScroll={handleScroll}
            >
              {slides.map((slide, index) => (
                <div key={index} className="slide">
                  {slide}
                </div>
              ))}
            </div>

            {/* Dots for navigation */}
            <div className="dots">
              {slides.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentSlide ? "active" : ""}`}
                  onClick={() => handleDotClick(index)}
                ></span>
              ))}
            </div>
          </div>
        ) : (
          <div className={"showAdsGrid"}>
            <Grid className={"mt-2 showAdsBox"}>
              <Grid
                className={"mt-1.5 relative mt-3"}
                style={{ marginLeft: "10px", marginRight: "10px" }}
              >
                <Grid
                  className={
                    "absolute z-1 w-7.5 p-1 bottom-0 right-2.5 bg-[#000000]"
                  }
                  style={{
                    bottom: "10px",
                    borderRadius: "10px",
                    padding: "6px",
                    cursor: "pointer",
                  }}
                >
                  <Visit style={{ width: "50px" }} />

                  {/* <Image src={Visit} style={{ width: "50px" }} /> */}
                </Grid>
                <video
                  src={videoLink3}
                  className="h-full relative"
                  ref={videoRef}
                  autoPlay
                  muted={isMuted}
                  style={{ borderRadius: "10px" }}
                  loop
                />
              </Grid>
              <Grid className={"my-4 mx-3.5 description"}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Block
                    className={"flex flex-start showAdsTitle"}
                    style={{ alignItems: "flex-start" }}
                  >
                    <Grid
                      className={"logo p-1 bg-white rounded-lg showAdsTitleBox"}
                      style={{
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                      }}
                    >
                      <Image
                        src={Ads3Img}
                        style={{
                          borderRadius: "50%",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </Grid>
                    <Block
                      className={" ml-3 flex items-start showTopicTitle"}
                      style={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <Grid
                        className={
                          "flex topicText flex-wrap text-start text-[15px] opacity-[85%] leading-tight w-[80%] text-white "
                        }
                      >
                        SUGAR's New TV Commercial
                      </Grid>
                      <Block className={" mt-1 "}>
                        <Grid
                          className={"text-[14px] text-white font-semibold"}
                        >
                          Sponsored
                        </Grid>
                        <Grid
                          className={
                            "w-[0.2rem] ml-2 h-[0.2rem] rounded-full bg-white ml-1"
                          }
                        ></Grid>
                        <Block
                          className={
                            "ml-3 text-[14.5px] showSponserTextDesc opacity-[65%] leading-tight text-white"
                          }
                        >
                          Hey SUGAR Fam, the
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                  <Block className={"dots-three mt-4 mr-1 cursor-pointer"}>
                    {/* <Image src={verticalDots} /> */}
                    <VerticalDots />

                  </Block>
                </div>
                <Block className={"flex gap-2.5 mt-3.5"}>
                  <Grid
                    className={
                      "w-[50%] cursor-pointer border-[0.01rem] text-[#2793e6] py-1 font-bold text-[17px] tracking-normal rounded-3xl flex items-center"
                    }
                  >
                    Watch
                  </Grid>
                  <Grid
                    className={
                      "w-[50%] cursor-pointer border-[0.01rem] text-black bg-[#2793e6] py-1 font-bold text-[17px] tracking-normal rounded-3xl flex items-center"
                    }
                  >
                    Install
                  </Grid>
                </Block>
              </Grid>
            </Grid>
            <Grid className={"mt-2 showAdsBox"}>
              <Grid
                className={"mt-1.5 relative mt-3"}
                style={{ marginLeft: "10px", marginRight: "10px" }}
              >
                <Grid
                  className={
                    "absolute z-1 w-7.5 p-1 bottom-0 right-2.5 bg-[#000000]"
                  }
                  style={{
                    bottom: "10px",
                    borderRadius: "10px",
                    padding: "6px",
                    cursor: "pointer",
                  }}
                >
                  {/* <Image src={Visit} style={{ width: "50px" }} /> */}
                  <Visit style={{ width: "50px" }} />

                </Grid>
                <video
                  src={videoLink2}
                  className="h-full relative"
                  ref={videoRef}
                  autoPlay
                  muted={isMuted}
                  style={{ borderRadius: "10px" }}
                  loop
                />
              </Grid>
              <Grid className={"my-4 mx-3.5 description"}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Block
                    className={"flex flex-start showAdsTitle"}
                    style={{ alignItems: "flex-start" }}
                  >
                    <Grid
                      className={"logo p-1 bg-white rounded-lg showAdsTitleBox"}
                      style={{
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                      }}
                    >
                      <Image
                        src={Ads2Img}
                        style={{
                          borderRadius: "50%",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </Grid>
                    <Block
                      className={" ml-3 flex items-start showTopicTitle"}
                      style={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <Grid
                        className={
                          "flex topicText flex-wrap text-start text-[15px] opacity-[85%] leading-tight w-[80%] text-white "
                        }
                      >
                        SUGAR's New TV Commercial
                      </Grid>
                      <Block className={" mt-1 "}>
                        <Grid
                          className={"text-[14px] text-white font-semibold"}
                        >
                          Sponsored
                        </Grid>
                        <Grid
                          className={
                            "w-[0.2rem] ml-2 h-[0.2rem] rounded-full bg-white ml-1"
                          }
                        ></Grid>
                        <Block
                          className={
                            "ml-3 text-[14.5px] showSponserTextDesc opacity-[65%] leading-tight text-white"
                          }
                        >
                          Hey SUGAR Fam, the
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                  <Block className={"dots-three mt-4 mr-1 cursor-pointer"}>
                    {/* <Image src={verticalDots} /> */}
                    <VerticalDots />

                  </Block>
                </div>
                <Block className={"flex gap-2.5 mt-3.5"}>
                  <Grid
                    className={
                      "w-[50%] cursor-pointer border-[0.01rem] text-[#2793e6] py-1 font-bold text-[17px] tracking-normal rounded-3xl flex items-center"
                    }
                  >
                    Watch
                  </Grid>
                  <Grid
                    className={
                      "w-[50%] cursor-pointer border-[0.01rem] text-black bg-[#2793e6] py-1 font-bold text-[17px] tracking-normal rounded-3xl flex items-center"
                    }
                  >
                    Install
                  </Grid>
                </Block>
              </Grid>
            </Grid>
            <Grid className={"mt-2 showAdsBox"}>
              <Grid
                className={"mt-1.5 relative mt-3"}
                style={{ marginLeft: "10px", marginRight: "10px" }}
              >
                <Grid
                  className={
                    "absolute z-1 w-7.5 p-1 bottom-0 right-2.5 bg-[#000000]"
                  }
                  style={{
                    bottom: "10px",
                    borderRadius: "10px",
                    padding: "6px",
                    cursor: "pointer",
                  }}
                >
                  <Visit style={{ width: "50px" }} />
                </Grid>
                <video
                  src={videoLink}
                  className="h-full relative"
                  ref={videoRef}
                  autoPlay
                  muted={isMuted}
                  style={{ borderRadius: "10px" }}
                  loop
                />
              </Grid>
              <Grid className={"my-4 mx-3.5 description"}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Block
                    className={"flex flex-start showAdsTitle"}
                    style={{ alignItems: "flex-start" }}
                  >
                    <Grid
                      className={"logo p-1 bg-white rounded-lg showAdsTitleBox"}
                      style={{
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                      }}
                    >
                      <Image
                        src={Ads1Img}
                        style={{
                          borderRadius: "50%",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </Grid>
                    <Block
                      className={" ml-3 flex items-start showTopicTitle"}
                      style={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <Grid
                        className={
                          "flex topicText flex-wrap text-start text-[15px] opacity-[85%] leading-tight w-[80%] text-white "
                        }
                      >
                        Choose Your Investment Plan | Motilal Oswal Stock Market
                        App
                      </Grid>
                      <Block className={" mt-1 "}>
                        <Grid
                          className={"text-[14px] text-white font-semibold"}
                        >
                          Sponsored
                        </Grid>
                        <Grid
                          className={
                            "w-[0.2rem] ml-2 h-[0.2rem] rounded-full bg-white ml-1"
                          }
                        ></Grid>
                        <Block
                          className={
                            "ml-3 text-[14.5px] showSponserTextDesc opacity-[65%] leading-tight text-white"
                          }
                        >
                          Long-term Compounding
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                  <Block className={"dots-three mt-4 mr-1 cursor-pointer"}>
                    {/* <Image src={verticalDots} /> */}
                    <VerticalDots />
                  </Block>
                </div>
                <Block className={"flex gap-2.5 mt-3.5"}>
                  <Grid
                    className={
                      "w-[50%] cursor-pointer border-[0.01rem] text-[#2793e6] py-1 font-bold text-[17px] tracking-normal rounded-3xl flex items-center"
                    }
                  >
                    Watch
                  </Grid>
                  <Grid
                    className={
                      "w-[50%] cursor-pointer border-[0.01rem] text-black bg-[#2793e6] py-1 font-bold text-[17px] tracking-normal rounded-3xl flex items-center"
                    }
                  >
                    Install
                  </Grid>
                </Block>
              </Grid>
            </Grid>
          </div>
        )}
      </div>
      {/* <UserProfilePage/> */}
      {/* {false && (
        <>
          <div className={"mt-29"}>
            <LockuserProfile />
          </div>
          <div className={"mt-29"}>
            <SubscriptionModal />
          </div>
        </>
      )} */}
    </div>
  );
}
