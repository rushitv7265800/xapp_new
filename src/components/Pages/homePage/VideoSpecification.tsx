import {ReactComponent as ArrowList} from "../../../assets/VideoPlayIcons/ArrowList.svg"
import {ReactComponent as Share} from "../../../assets/FrontpageIcons/Share.svg"
import {ReactComponent as Watch} from "../../../assets/VideoPlayIcons/Watch.svg"
import {ReactComponent as Playlist} from "../../../assets/VideoPlayIcons/Playlist.svg"
import {ReactComponent as NotInterested} from "../../../assets/VideoPlayIcons/NotInterested.svg"
import {ReactComponent as DoNotRecommanded} from "../../../assets/VideoPlayIcons/DoNotRecommanded.svg"
import {ReactComponent as ListenMusic} from "../../../assets/VideoPlayIcons/ListenMusic.svg"
import {ReactComponent as Download} from "../../../assets/VideoPlayIcons/download.svg"
import Grid from "../../../components/utils/customComponent/Grid"
import Block from "../../../components/utils/customComponent/Block"
import Image from "../../../components/utils/customComponent/Image"

interface VideoSpeciProp {
    setVideoSpecification: React.Dispatch<React.SetStateAction<boolean>>;
}
const Video_Specification:React.FC<VideoSpeciProp>=({setVideoSpecification})=>{

const VideoSpecificationList = [
    [<ArrowList/>, "Play next in queue"], 
    [<Watch/>, "Save to watch later"], 
    [<Playlist/>, "Save to playlist"], 
    [<Download/>, "Download video"], 
    [<Share/>, "Share"], 
    [<NotInterested/>, "Not interested"], 
    [<DoNotRecommanded/>, "Don't recommend channel"], 
    [<ListenMusic/>, "Listen to youtube music"]
];

    return (
        <div className="fixed inset-0 flex items-end justify-center z-20">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setVideoSpecification(false)}></div>

            <Grid className="fixed flex items-center z-10 bottom-18 px-4 gap-5 left-0 right-0 h-[47%] bg-[#242424] overflow-y-auto">
                <Block className={"w-[50px] h-[3px] bg-white rounded-3xl mt-3"}></Block>
                {VideoSpecificationList.map((item, index) => (
                    <Block key={index} className={"w-full flex gap-x-8 items-start"}>
                        <Grid className={"w-6"}>
                            <Image src={item[0] as string} />
                        </Grid>
                        <Grid className={"text-[16px] font-normal text-white"}>
                            {item[1]}
                        </Grid>
                    </Block>
                ))}
            </Grid>
        </div>
    );
};
export default Video_Specification;
