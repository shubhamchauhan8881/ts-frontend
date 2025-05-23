import React from "react";
import useAxios from "../../hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePopup } from "../../context/PopupContext";
import RoomEditForm from "./RoomEditForm";
import { GetAbsoluteURL } from "../../assets/conf";


import { LockClosedIcon, GlobeIcon, UserGroupIcon, DeleteIcon, PenIcon } from "../../assets/icons";
import RoomMembers from "./RoomMembers";

export default function RoomDetail({data}){
    const axios = useAxios()
    const qc = useQueryClient()

    const {openPopup} = usePopup()

    const {isPending, mutate } = useMutation({
		mutationFn: async ()=>{
			await axios.delete(`/rooms/${data.room.id}/join/`);
        },
        onSuccess:()=>{
            qc.invalidateQueries(["Rooms", data.room.room_id])
        }
	});


    const {isPending: joinPending, mutate:JoinMutate } = useMutation({
		mutationFn: async ()=>{
			return await axios.post(`/rooms/${data.room.id}/join/`);
        },
        onSuccess:()=>{
            qc.invalidateQueries(["Rooms", data.room.room_id])
        }
	});

    const editRoom = ()=>{
        openPopup(
            <RoomEditForm room={data.room}/>
        )
    }

    return(
        <div className="flex flex-col gap-4 w-80 overflow-hidden rounded-xl bg-base-200 p-4">
			
            <div className='relative w-full h-48 overflow-hidden rounded-xl'>
				<img className='h-full w-full object-cover object-center' src={GetAbsoluteURL(data.room.logo)} alt=''/>
			</div>

            <div className="">
                <h1 className="text-2xl font-medium">{data.room.room_name}</h1>
                <p className='text-xs mt-1'>
                    {data.room.created_at[0]}
                </p>
            </div>

            <div className='space-x-2'>
                {
                    data.room.room_type == "pvt"?
                        <div className='badge'>
                           <LockClosedIcon className={"size-5"} />
                            Private
                        </div>
                    :
                        <div className='badge'>
                           <GlobeIcon className={"size-5"} />
                            Public
                        </div>
                }

                <div className='badge' onClick={()=> openPopup( <RoomMembers room_id={data.room.id}/> )}>
                    <UserGroupIcon className={"size-5"} />
                    <span className='font-medium'>{data.room.members_count}</span>
                </div>
            </div>

            { data.room.description && (
                <div className="">
                    <p className='text-xs opacity-50'>Room description:</p>
                    <p>{data.room.description}</p>
                </div>
            )}
            
            <div className="divider my-1"></div>
            <div className='flex gap-4 flex-wrap'>
                {
                    data.is_admin
                    ?
                    <>
                        <button className='btn btn-soft rounded-full btn-error'>
                            <DeleteIcon className="size-5"/>
                            Delete
                        </button>
                        <button onClick={editRoom} className='btn btn-primary btn-soft rounded-full' >
                            <PenIcon className="size-5" />
                            Edit
                        </button>
                    </>
                    :
                    <>
                        {
                            data.is_member ?
                            <button onClick={mutate} className='btn btn-soft rounded-full btn-error' >
                                {isPending ?
                                    <span className="loading loading-spinner text-secondary"></span>    
                                    :
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                        </svg>
                                        Exit Room
                                    </>
                                }
                            </button>
                            :
                            <button className='btn btn-primary btn-soft rounded-full' onClick={JoinMutate}>
                                {joinPending
                                ? <span className="loading loading-spinner text-primary"></span>
                                :<>
                                    + &nbsp; Join Room
                                </>
                                }    
                            </button>
                        }
                        <button className='btn btn-info btn-soft rounded-full ' >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                            Report
                        </button>
                    </>
                }
            </div>

		</div>
    )
}