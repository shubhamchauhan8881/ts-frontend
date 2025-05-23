import React from "react"
import { formatBytes, trimToFixedDecimal } from "../../assets/conf"


export default function RoomStorage({used_space, room_size}){
    return (
      <div className='bg-base-200 p-4 rounded-xl'>
          <h2 className='font-medium'>Storage</h2>
          <progress className="progress progress-primary w-full h-4 mt-4" value={used_space} max={room_size}></progress>
          <div className="flex items-center justify-between text-xs">
            <p className="">
              { trimToFixedDecimal(used_space/room_size * 100, 2)}%
            </p>
            <p className='text-right '>{formatBytes(used_space)} / {formatBytes(room_size)}</p>
          </div>
          <div className="mt-8">
            <button className="btn w-full btn-secondary btn-soft rounded-full btn-sm">Boost Storage</button>
          </div>
      </div>
    )
}