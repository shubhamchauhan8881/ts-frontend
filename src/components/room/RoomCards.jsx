import React from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxios from "../../hooks/useAxios";
import { GetAbsoluteURL, formatBytes } from "../../assets/conf";
import { GlobeIcon, LockClosedIcon, UserGroupIcon , LogOutIcon, ShareIcon} from "../../assets/icons";


export default function RoomCard({data}){
	const {room, joined_at:joining_details } = data;
		return(
			<Link to={`/room/${room.id}`}>
				<div className="flex items-start gap-4 bg-base-200 rounded-xl p-4 hover:bg-base-300 transition-colors">
				
					<div className="flex flex-col">
						<div className="avatar">
							<div className="w-24 rounded-full">
								<img src={GetAbsoluteURL(room.logo)} />
							</div>
						</div>
						{
							joining_details &&
							<p className="text-xs text-center mt-4"><span className="opacity-50">Member since<br/></span>{joining_details[0]}</p>
						}
					</div>
				
					<div className="grow">
						
							<h3 className="text-lg font-medium">
								{room.room_name}
							</h3>

						<p className="mt-1 text-sm badge">
						<span className="opacity-50">Author: </span>
							{room.author.first_name} {room.author.last_name}
						</p>

						<div className="mt-4 flex gap-2 flex-wrap">
							<div className="badge">
								{
									room.room_type == "pvt" ?
									<>
									<LockClosedIcon className="size-4"/>
									<p className="text-xs">Private</p>
									</>
									:
									<>
									<GlobeIcon className="size-4" />
									<p className="text-xs">Public</p>
									</>	
								}
								
							</div>
							<div className="badge">
								<UserGroupIcon className="size-4" />
								<p className="text-xs">{room?.members_count}</p>
							</div>
							
							
						</div>

						<div className="mt-4">
							<p className="text-xs">Storage</p>
							<progress className="progress progress-accent w-full" value={room.used_space} max={room.room_size}></progress>
							<p className='text-xs text-right'>{formatBytes(room.used_space)} used of {formatBytes(room.room_size)}</p>
						</div>
						
					</div>

				</div>
			</Link>

	)
}



// const RoomCard = ({ v, joining_details }) => {
	
// 	const axios = useAxios();
// 	const qc = useQueryClient();

// 	const deleteRoom = async (room_id) => {
// 		const res = await axios.delete(`/user/rooms/${room_id}/`);
// 		return res;
// 	}

// 	const { mutateAsync: Delete, isPending } = useMutation({
// 		mutationFn: deleteRoom,
// 		onSuccess: () => {
// 			qc.invalidateQueries(["userRooms"]);
// 		}
// 	});
// 	return (
// 		<Link to={`/room/${room.id}`} className="block relative p-4 rounded-lg bg-base-200 overflow-hidden">
// 			<div className="size-40 rounded-full overflow-hidden">
// 				<img
// 					src={GetAbsoluteURL(room.logo)}
// 					className="size-full object-cover"
// 				/>
// 			</div>

// 			<div className="mt-8 space-y-4">
// 				<div className="flex justify-between">
// 					<div>
// 						<div className="text-lg font-bold dark:text-white">
// 							{room.room_name}
// 						</div>
// 						<div className="text-sm text-gray-500 dark:text-gray-200">
// 							@{room.author?.username}
// 						</div>
// 					</div>
// 					<div className="opacity-80 text-sm">
// 						{room.created_at[0]}
// 					</div>
// 				</div>

// 				<div className="flex justify-start items-center space-x-4 border-y border-base-300 py-2">
// 					<div className="badge">
// 						{room.room_type == "pub" ? (
// 							<>
// 								<GlobeIcon className="size-6" />
// 								Public
// 							</>
// 						) : (
// 							<>
// 								<LockClosedIcon className="size-6" />
// 								Private
// 							</>
// 						)}
// 					</div>

// 					<div className="badge">
// 						<UserGroupIcon className="size-5" />
// 						{room.members_count}
// 					</div>
					
// 					{ joining_details &&
// 						<div className="badge"><span className="text-sm opacity-50">Member Since</span>{joining_details[0]}</div>}
					

// 				</div>
			
// 			</div>

// 			<div className="absolute top-0 right-0">
// 				<button onClick={() => Delete(room.id)} className="btn btn-error btn-sm group gap-0">
// 					{
// 						isPending ? <span className="loading loading-spinner loading-xs"></span>
// 							:
// 							<>
// 								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
// 								<path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201room.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
// 								</svg>
// 								<span className="w-0 overflow-hidden group-hover:w-10 transition-all duration-300">Delete</span>
// 							</>
// 					}
// 				</button>
// 			</div>
// 		</Link>
// 	);
// };


// export default RoomCard;