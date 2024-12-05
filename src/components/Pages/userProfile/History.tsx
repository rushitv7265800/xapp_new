import React from 'react'
// import { Bell, ChevronLeft, Home, Library, MessageCircle, MoreVertical, Search, User, Video } from 'lucide-react'
import { Input } from '@headlessui/react';
import { Link } from 'react-router-dom';
import Image from '@components/utils/customComponent/Image';

export default function History() {
    const mockHistory = [
        {
          title: "Recently Watched",
          videos: [
            {
              id: 1,
              title: "Understanding React Hooks",
              thumbnail: "/placeholder.svg?height=90&width=160",
              views: "10K views",
              duration: "12:45",
              channelName: "CodeAcademy",
              isShort: false,
            },
            {
              id: 2,
              title: "Next.js for Beginners",
              thumbnail: "/placeholder.svg?height=90&width=160",
              views: "5K views",
              duration: "08:30",
              channelName: "DevSimplified",
              isShort: false,
            },
          ],
        },
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
          ],
        },
      ];
  return (
    <div className="min-h-screen bg-black text-white">
      {/* <header className="sticky top-0 z-50 flex items-center justify-between gap-4 bg-black p-4">
        <div className="flex items-center gap-4">
          <Link to="#" className="text-white">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-semibold">History</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-white">
            <MessageCircle className="h-6 w-6" />
          </button>
          <button className="text-white">
            <Bell className="h-6 w-6" />
          </button>
          <button className="text-white">
            <Search className="h-6 w-6" />
          </button>
          <button className="h-8 w-8 overflow-hidden rounded-full">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </button>
        </div>
      </header> */}

      <div className="px-4 py-2">
        <div className="relative">
          {/* <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" /> */}
          <Input
            className="w-full rounded-full bg-zinc-900 pl-10 text-white placeholder-gray-400"
            placeholder="Search watch history"
          />
        </div>
      </div>

      {/* Content */}
      <main className="pb-16">
        {mockHistory.map((section, index) => (
          <section key={index} className="mt-6">
            <h2 className="px-4 text-xl font-semibold">{section.title}</h2>
            
            {/* Shorts Section */}
            {section.videos[0]?.isShort ? (
              <div className="mt-4 flex gap-2 overflow-x-auto px-4 pb-4">
                {section.videos.map((video) => (
                  <div key={video.id} className="relative flex-shrink-0 w-40">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      className="rounded-xl object-cover aspect-[9/16]"
                    />
                    <button className="absolute top-2 right-2 p-1">
                      {/* <MoreVertical className="h-5 w-5" /> */}
                    </button>
                    <div className="absolute bottom-2 left-2 right-2">
                      <h3 className="text-sm font-medium line-clamp-2">{video.title}</h3>
                      <p className="text-xs text-gray-400">{video.views}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                {section.videos.map((video) => (
                  <div key={video.id} className="flex gap-4 px-4">
                    <div className="relative flex-shrink-0">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        className="rounded-xl object-cover aspect-video"
                      />
                      <div className="absolute bottom-1 right-1 rounded bg-black/80 px-1 text-xs">
                        {video.duration}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium line-clamp-2">{video.title}</h3>
                      <p className="mt-1 text-sm text-gray-400">{video.channelName}</p>
                      <p className="text-sm text-gray-400">{video.views}</p>
                    </div>
                    <button className="p-1">
                      {/* <MoreVertical className="h-5 w-5" /> */}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t border-zinc-800 bg-black py-2">
        <Link to="#" className="flex flex-col items-center p-2 text-white">
          {/* <Home className="h-6 w-6" /> */}
          <span className="mt-1 text-xs">Home</span>
        </Link>
        <Link to="#" className="flex flex-col items-center p-2 text-white">
          {/* <Video className="h-6 w-6" /> */}
          <span className="mt-1 text-xs">Shorts</span>
        </Link>
        <Link to="#" className="flex flex-col items-center p-2 text-white">
          {/* <Library className="h-6 w-6" /> */}
          <span className="mt-1 text-xs">Library</span>
        </Link>
        <Link to="#" className="flex flex-col items-center p-2 text-white">
          {/* <User className="h-6 w-6" /> */}
          <span className="mt-1 text-xs">You</span>
        </Link>
      </nav>
    </div>
  )
}

