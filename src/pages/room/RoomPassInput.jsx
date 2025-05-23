import React, { useEffect, useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import { KeyIcon, LockClosedIcon } from '../../assets/icons';

export default function RoomPassInput({Room}) {
	const axios = useAxios()
	const inpRef = useRef()
    const qc = useQueryClient()

	const join = async (pass) =>{
		await axios.post(`/rooms/${Room.id}/join/`, {"password":pass});
	}

	const {isPending, isError, mutate} = useMutation({
		mutationFn: (psw) => join(psw),
		onSuccess: ()=> qc.invalidateQueries(["Rooms", Room.id])
	});

	useEffect(()=>{
		const muteateOnEnter = (e) => {
			if(e.key==="Enter"){
				mutate(e.target.value);
			}
		}
		inpRef.current.addEventListener("keypress", muteateOnEnter);
		const a = inpRef.current;
		return ()=>{
			a.removeEventListener("keypress", muteateOnEnter);
		}
	},[mutate])

  	return (
        <div className="max-w-md mx-auto h-full flex flex-col gap-4 items-center justify-center text-center" >
            <LockClosedIcon className="size-36 text-error" /> 
            <div>
                <p className='text-xl'><span className='font-medium text-secondary'>{Room.room_name}</span> is an private room.</p>
                <p className='text-sm'>You need permission or join this room to access its contents.</p>
            </div>

			<div className=' text-left'>
				<div className="input pr-0 overflow-hidden input-primary flex items-center gap-2">
					<KeyIcon className="size-6" />

					<input
						ref={inpRef}
						type="password"
						className="grow"
						placeholder="Room password"
						required
					/>

					<button className='btn btn-sm h-full btn-primary' disabled={isPending ? true : false} onClick={ (_)=>mutate()}>
						{
							isPending ? <span className="loading loading-spinner text-primary"></span>: "Join"
						}
					</button>
				</div>
				{ isError && <span className='text-error text-sm'>Incorrect password.</span> }
			</div>
{/* 
			<div className="divider">OR</div>

			<RequestRoomAccess room = {Room}/> */}
        </div>
    )
}