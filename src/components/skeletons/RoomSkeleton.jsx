import React from "react"

export default function RoomSkeleton() {
    return (
      <div className="flex w-full gap-4 p-5">
          <div className='flex flex-col w-64 gap-5'>
              <div className="skeleton bg-base-300 h-80 w-full"></div>
              <div className="skeleton bg-base-300 h-20 w-full"></div>
              <div className="skeleton bg-base-300 h-20 w-full"></div>
          </div>
          <div className='flex flex-col w-64 gap-5 grow'>
              <div className="skeleton bg-base-300 h-10 w-full"></div>
              <div className="skeleton bg-base-300 h-20 w-full"></div>
              <div className="skeleton bg-base-300 h-10 w-full"></div>
  
              <div className="skeleton bg-base-300 grow w-full"></div>
          </div>
      </div>
    )
  }
  