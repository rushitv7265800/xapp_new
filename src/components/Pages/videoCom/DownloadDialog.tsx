import Grid from "../../utils/customComponent/Grid"
import Block from "../../utils/customComponent/Block"
import Image from "../../utils/customComponent/Image"
import { ReactComponent as YoutubeLogo } from "../../../assets/FrontpageIcons/YoutubeLogo.svg"
import { ReactComponent as Cross } from "../../../assets/CommentIcons/Cross.svg"
interface ChildComponentProps {
    setDownload: React.Dispatch<React.SetStateAction<boolean>>;
}
const DownloadDialog: React.FC<ChildComponentProps> = ({ setDownload }) => {

    const standardDownload = [["Medium", 360, 27], ["Low", 144, 21]]
    const permiumDownload = [["Full HD", 1080, 99], ["High", 720, 47]]

    return (
        <div className="fixed inset-0 flex items-end justify-center z-20">
            {/* Overlay */}
            <div className="fixed inset-0 flex bg-black bg-opacity-50" onClick={() => setDownload(false)}></div>

            <Grid className="fixed flex items-center z-10 top-[30%] px-4 gap-5 left-5 right-0 w-[90%] rounded-lg h-auto bg-[#242424] overflow-y-auto">
                <Block className={"w-[50px] h-[3px] bg-white rounded-3xl mt-3"}></Block>
                <Block className={"w-full text-[18px] font-bold justify-between text-white flex items-start"}>
                    Download quality
                    <div onClick={() => setDownload(false)}>
                        <Cross />
                    </div>
                </Block>
                {standardDownload.map((item) => (
                    <Block className={"w-full flex justify-between items-start"}>

                        <Block className={"gap-2"}>
                            <Grid className={"w-6"}>
                                <input id={`${item[0]}`} type="radio" name="vidQuility" value={`${item[0]}`} className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                            </Grid>
                            <Grid className={"text-[16px] font-normal text-white"}>
                                <label htmlFor={`${item[0]}`}>
                                    {item[0]} ({item[1]}p)</label>
                            </Grid>
                        </Block>
                        <Block>
                            <Grid>{item[2]} MB</Grid>
                        </Block>
                    </Block>
                ))}
                <Block className={"w-full border-[1px] border-gray-400"}></Block>
                <Grid className={"flex items-start space-y-2"}>
                    <Block className={"gap-x-1"}>
                        <YoutubeLogo className="w-5" />
                        <Grid className={"text-[16px] font-bold text-white tracking-tight"}>Premium</Grid>
                    </Block>
                    <Block>
                        For high-quality unlimited download, ad-free and background play, get YouTube Premium.
                    </Block>
                </Grid>
                {permiumDownload.map((item) => (
                    <Block className={"w-full flex justify-between items-start"}>

                        <Block className={"gap-2"}>
                            <Grid className={"w-6"}>
                                <input id={`${item[0]}`} type="radio" name="vidQuilityPremium" value={`${item[0]}`} className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                            </Grid>
                            <Grid className={"text-[16px] font-normal text-white"}>
                                <label htmlFor={`${item[0]}`}>
                                    {item[0]} ({item[1]}p)</label>
                            </Grid>
                        </Block>
                        <Block>
                            <Grid>{item[2]} MB</Grid>
                        </Block>
                    </Block>
                ))}
                <Block className={"w-full border-[1px] border-gray-400"}></Block>
                <Block className={"w-full"}>
                    <div className="flex items-center mb-4">
                        <input id="checkbox-2" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="checkbox-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember my settings for 30 days</label>
                    </div>
                </Block>
                <Block className={"w-full border-[1px] border-gray-400"}></Block>
                <Block className={"w-full space-x-2"}>
                    <button onClick={() => setDownload(false)} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-[14.5%] py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancel</button>
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-[14.5%] py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Download</button>
                </Block>
            </Grid>
        </div>
    )
}
export default DownloadDialog;