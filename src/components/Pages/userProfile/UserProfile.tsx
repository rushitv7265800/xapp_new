import { useNavigate } from 'react-router-dom';
import UserProfileBg from '../../../assets/AccountIcons/userProfileBg.png'
import { baseURL, userData_ } from '../../utils/config'
const UserProfile = () => {
    const navigate=useNavigate()
    const userData = {
        name: "Lori Bauer",
        username: "@loribauer",
        profilePic: "/placeholder.svg?height=128&width=128",
        stats: {
            views: "2.1m",
            followers: "21k",
            posts: 297,
        },
        posts: [...Array(12)].map((_, i) => ({
            id: i,
            image: "/placeholder.svg?height=300&width=300",
            views: `${213.4 + i}k`,
            duration: `5:${10 + i}`,
        })),
    };

    return (
        <div className="min-h-screen bg-black text-white profilePage">
            <div className='profilePageBG'></div>
            <header className="flex items-center justify-between p-4 md:p-6">
                <button className="text-white" onClick={()=>navigate("/user/userPage")}>
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        />
                    </svg>
                </button>
                <button className="text-white">
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                </button>
            </header>

            <div className="relative px-4 md:px-6" style={{ marginTop: "8%" }}>
                <div className="relative mx-auto w-fit">
                    <div className="relative h-24 w-24 md:h-32 md:w-32 bg-white rounded-full">
                        <img
                            src={baseURL + userData_?.userImg}
                            alt="Profile picture"
                            style={{ width: "100%", height: "100%",objectPosition:"top" }}
                            className="rounded-full object-cover"
                        />
                    </div>
                </div>

                <div className="mt-4 text-center">
                    <h1 className="text-xl font-semibold md:text-2xl" style={{textTransform:"capitalize"}}>{userData_?.name}</h1>
                    <p className="text-gray-400">{userData_?.userName}</p>
                </div>

                <div className="mt-6 flex items-center justify-center text-sm md:gap-2">
                    {Object.entries(userData.stats).map(([key, value], index, arr) => (
                        <div key={key} className="flex items-center gap-1">
                            <p className="font-semibold">{value}</p>
                            <p className="text-gray-400 capitalize">{key}</p>
                            {index < arr.length - 1 && (
                                <span className="text-gray-400 mx-2">|</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 flex justify-center">
                <button className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-md font-semibold md:max-w-xs">
                    + Follow
                </button>
            </div>

            {/* Responsive Grid */}
            <div className="mt-8 grid grid-cols-2 gap-2 p-4 sm:grid-cols-3 lg:grid-cols-4 md:gap-4 md:p-6">
                {userData.posts.map((post) => (
                    <div
                        key={post.id}
                        className="relative aspect-square overflow-hidden rounded-lg"
                    >
                        <img
                            height={50}
                            width={100}
                            src={post.image}
                            alt={`Post ${post.id + 1}`}
                            className="h-full w-full object-cover bg-white"
                        />
                        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-black/50 px-2 py-1 backdrop-blur">
                            <span className="text-xs">{post.views}</span>
                            <span className="text-xs">{post.duration}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserProfile;
