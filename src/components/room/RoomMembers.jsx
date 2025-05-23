import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAxios from '../../hooks/useAxios'
import { UserIcon } from '../../assets/icons'

export default function RoomMembers({room_id}) {
    const axios = useAxios()
    const {data, isPending} = useQuery({
        queryKey: ["roomMembersList", room_id],
        queryFn: async ()=>{
            return (await axios.get(`/rooms/${room_id}/members/`)).data;
        }
    })
    console.log(data);
  return (
    <div className='w-full'>
        <h3 className='heading'>Room Members</h3>

            <div className='mt-6 max-h-96 overflow-y-scroll'>
            {
                isPending
                    ? 
                    <div className="skeleton h-12 w-full"></div>
                    :
                    data.map((v)=>{return <>
                        <div className='flex border border-base-100 py-2 px-4 rounded-lg gap-4 hover:bg-base-100'>
                            <div className='place-content-center'>
                                <UserIcon className="size-8" />
                            </div>
                            <div>
                                <p>{v.user.first_name} {v.user.last_name}</p>
                                <p className='text-sm opacity-50'>@{v.user.username}</p>
                            </div>
                        </div>
                    </>} )
            }
            </div>
    </div>
  )
}
