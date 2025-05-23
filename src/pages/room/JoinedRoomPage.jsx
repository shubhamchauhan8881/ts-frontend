import React from "react";
import useAxios from "../../hooks/useAxios";
import {  useQuery } from "@tanstack/react-query";
import { GetAbsoluteURL, formatBytes } from "../../assets/conf";
import { GlobeIcon, UserGroupIcon,DeleteIcon, ShareIcon, LockClosedIcon, LogOutIcon, UserIcon } from "../../assets/icons";
import { Link } from "react-router";

function RoomCard({ data }) {
	const room = data.room;
	console.log(data)
	return (
		<div className="relative bg-base-200 rounded-xl p-8 hover:bg-base-300 hover:ring hover:ring-primary hover:shadow-md hover:shadow-primary transition-colors">
			<button className="absolute right-2 top-2 z-10 btn gap-0 hover:gap-2 group btn-ghost btn-accent btn-xs btn-soft">
				<ShareIcon className="size-4" />
				<span className="w-0 overflow-hidden group-hover:w-9 transition-all duration-300 ">
					Share
				</span>
			</button>

			<Link to={`/room/${room.id}`}>
				<div className="flex items-strech gap-4">
					<div className="avatar shrink-0 flex-col gap-4">
						<div className="h-full max-h-30 rounded-xl aspect-square">
							<img src={GetAbsoluteURL(room.logo)} />
						</div>
						<p className="text-xs opacity-50 text-center">
							Created at:
							<br />
							{room.created_at[0]}
						</p>
					</div>

					<div className="grow space-y-4 ">
						<h3 className="heading font-medium">
							{room.room_name}
						</h3>
				
						<div className="flex gap-2 flex-wrap">
							<div className="badge">
								{room.room_type == "pvt" ? (
									<>
										<LockClosedIcon className="size-4" />
										<p className="text-xs">Private</p>
									</>
								) : (
									<>
										<GlobeIcon className="size-4" />
										<p className="text-xs">Public</p>
									</>
								)}
							</div>

							<div className="badge">
								<UserGroupIcon className="size-4" />
								<p className="text-xs">{room?.members_count}</p>
							</div>
						</div>

						<div className="badge w-full justify-start h-auto p-2 gap-2">
							<UserIcon className="size-6" />
							<div className="text-xs font-[400] text-secondary-content">
								<p>{room.author.first_name} {room.author.last_name}</p>
								<p>@{room.author.username}</p>
								
							</div>
						</div>
						{
							!data.approved &&
							<div className="badge badge-error ms-auto">Approval Pending</div>
						}
					</div>
				</div>
			</Link>
		</div>
	);
}

export default function JoinedRoomPage() {
	const axios = useAxios();

	const { isPending, data } = useQuery({
		queryFn: async () => {
			const res = await axios.get("/user/rooms/joined/");
			return res.data;
		},
		queryKey: ["joinedRooms"],
		refetchOnWindowFocus: false,
	});

	return (
		<div className="pl-8">
			<div className="my-4">
				<h1 className="heading-large inline-block">Joined Rooms</h1>
				<div className="divider"></div>
			</div>
			<div className="">
				{isPending && <span className="loading loading-dots loading-xl text-primary"></span> }

				<ul className="grid gap-3 grid-cols-3">
					{data?.map((v, i) => (
						<li key={i}><RoomCard data={v}/></li>
					))}
					
				</ul>
			</div>
		</div>
	);
}
