import React from 'react'
import {useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import useAxios from '../../hooks/useAxios'
import RoomSkeleton from "../../components/skeletons/RoomSkeleton";
import RoomPassInput from './RoomPassInput';
import RoomContents from './RoomContents';
import RoomStorage from '../../components/room/RoomStorage';
import AuthorBox from '../../components/room/AuthorBox';
import RoomDetail from '../../components/room/RoomDetail';


export default function Room() {
    const params = useParams()
    const axios = useAxios()


    const {isPending, data:Room, isError, error} = useQuery({
        queryKey: ["Rooms", params.id],
        queryFn:async () =>{
            const res = await axios.get(`/rooms/${params.id}/`);
            return res.data;
        }, 
        refetchOnWindowFocus:false,
    });

    if(isPending) return <RoomSkeleton />
    
    if(isError) return <div className='h-full flex items-center justify-center text-error'>{error.status=== 404 ? error.response.data.details : error.message}</div>
    

    if(Room.is_admin || Room.room.room_type=="pub" || (Room.is_member && Room?.membership_info?.approved) ){
        return (
            <div className='pl-6'>
                <div className="my-4">
                    <h1 className="heading-large inline-block"><span className='text-secondary-content opacity-50'>Room: </span>{Room.room.room_name}</h1>
                    <div className="divider"></div>
                </div>
            
    
                <div className='flex gap-x-4'>
    
                    <div className='flex flex-col gap-4 shrink-0'>
                        <RoomDetail  data={Room}  />

                        <RoomStorage used_space={Room.room.used_space} room_size={Room.room.room_size} />
                        {!Room.is_admin && <AuthorBox author={Room.room.author} /> }
                    </div>
            
                    <RoomContents data={Room} />
    
                </div>
            </div>
    
        )
    }else{

        return <RoomPassInput Room={Room.room} />
    }



}

