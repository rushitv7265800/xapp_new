import {
  Bell,
  ChevronLeft,
  MessageCircle,
  MoreVertical,
  Search,
} from "lucide-react";
export default function History() {
  const mockHistory = [
    {
      title: "Short Videos",
      videos: [
        {
          id: 3,
          title: "Quick React Tips",
          thumbnail: "/placeholder.svg?height=284&width=160",
          views: "1.2M views",
          isShort: true,
        },
        {
          id: 4,
          title: "CSS Tricks You Should Know",
          thumbnail: "/placeholder.svg?height=284&width=160",
          views: "980K views",
          isShort: true,
        },
        {
          id: 3,
          title: "Quick React Tips",
          thumbnail: "/placeholder.svg?height=284&width=160",
          views: "1.2M views",
          isShort: true,
        },
        {
          id: 4,
          title: "CSS Tricks You Should Know",
          thumbnail: "/placeholder.svg?height=284&width=160",
          views: "980K views",
          isShort: true,
        },
        {
          id: 3,
          title: "Quick React Tips",
          thumbnail: "/placeholder.svg?height=284&width=160",
          views: "1.2M views",
          isShort: true,
        },
        {
          id: 4,
          title: "CSS Tricks You Should Know",
          thumbnail: "/placeholder.svg?height=284&width=160",
          views: "980K views",
          isShort: true,
        },
        {
          id: 3,
          title: "Quick React Tips",
          thumbnail: "/placeholder.svg?height=284&width=160",
          views: "1.2M views",
          isShort: true,
        },
        {
          id: 4,
          title: "CSS Tricks You Should Know",
          thumbnail: "/placeholder.svg?height=284&width=160",
          views: "980K views",
          isShort: true,
        },
     
      ],
    },
    {
      title: "Recently Watched",
      videos: [
        {
          id: 1,
          title: "Understanding React Hooks",
          views: "10K views",
          duration: "12:45",
          channelName: "CodeAcademy",
          isShort: false,
        },
        {
          id: 2,
          title: "Next.js for Beginners",
          views: "5K views",
          duration: "08:30",
          channelName: "DevSimplified",
          isShort: false,
        },
        {
          id: 1,
          title: "Understanding React Hooks",
          views: "10K views",
          duration: "12:45",
          channelName: "CodeAcademy",
          isShort: false,
        },
        {
          id: 2,
          title: "Next.js for Beginners",
          views: "5K views",
          duration: "08:30",
          channelName: "DevSimplified",
          isShort: false,
        },        {
          id: 1,
          title: "Understanding React Hooks",
          views: "10K views",
          duration: "12:45",
          channelName: "CodeAcademy",
          isShort: false,
        },
        {
          id: 2,
          title: "Next.js for Beginners",
          views: "5K views",
          duration: "08:30",
          channelName: "DevSimplified",
          isShort: false,
        },        {
          id: 1,
          title: "Understanding React Hooks",
          views: "10K views",
          duration: "12:45",
          channelName: "CodeAcademy",
          isShort: false,
        },
        {
          id: 2,
          title: "Next.js for Beginners",
          views: "5K views",
          duration: "08:30",
          channelName: "DevSimplified",
          isShort: false,
        },
      ],
    },
  ];
  
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 flex items-center justify-between gap-4 bg-black p-4">
        <div className="flex items-center gap-4">
          <a href="#" className="text-white">
            <ChevronLeft className="h-6 w-6" />
          </a>
          <h1 className="text-xl font-semibold">History</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-white">
            <MessageCircle className="h-6 w-6" />
          </button>
          <button className="text-white">
            <Bell className="h-6 w-6" />
          </button>
          <button className="text-white" >
            <Search className="h-6 w-6" />
          </button>
          <button className="h-8 w-8 overflow-hidden rounded-full">
            <img
              src="/placeholder.svg?height=32&width=32"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </button>
        </div>
      </header>

      <div className="px-4 py-2">
        <div className="relative">
          <input
            className="w-full h-10 rounded-full bg-zinc-900 pl-10 text-white placeholder-gray-400"
            placeholder="Search watch history"
          />
        </div>
      </div>

      <main className="pb-16">
        {mockHistory.map((section, index) => (
          <section key={index} className="mt-6">
            <h2 className="px-4 text-xl font-semibold">{section.title}</h2>

            {section.videos[0]?.isShort ? (
              <div className="ml-2 flex overflow-x-auto space-x-3 no-scrollbar ">
                {section.videos.map((video) => (
                  <div key={video.id} className="relative flex-shrink-0 w-40">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="rounded-xl object-cover aspect-[9/16] bg-white"
                    />
                    <button className="absolute top-2 right-2 p-1 bg-black/40 rounded-full">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-2 left-2 right-2">
                      <h3 className="text-sm font-medium line-clamp-2">
                        {video.title} 
                      </h3>
                      <p className="text-xs text-gray-400">{video.views}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                {section.videos.map((video) => (
                  <div key={video.id} className="flex gap-3 px-4">
                    <div className="relative flex-shrink-0">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="h-20 w-36 rounded-xl object-cover bg-white"
                      />
                      <div className="absolute bottom-1 right-1 rounded bg-black/80 px-1 text-xs">
                        {video.duration}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-400">
                        {video.channelName}
                      </p>
                      <p className="text-sm text-gray-400">{video.views}</p>
                    </div>
                    <button className="p-1">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </main>
    </div>
  );
}
