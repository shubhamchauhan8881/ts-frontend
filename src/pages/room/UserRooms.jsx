import React from "react";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { FilterIcon, PenIcon } from "../../assets/icons";
import { Link } from "react-router";
import { GetAbsoluteURL, formatBytes } from "../../assets/conf";
import {
	GlobeIcon,
	LockClosedIcon,
	UserGroupIcon,
	ShareIcon,
} from "../../assets/icons";

function RoomCard({ room }) {
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

					<div className="grow space-y-4">
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

						<div className="">
							<p className="text-xs">Storage</p>
							<progress
								className="progress progress-accent w-full"
								value={room.used_space}
								max={room.room_size}
							></progress>
							<p className="text-xs text-right">
								{formatBytes(room.used_space)} used of{" "}
								{formatBytes(room.room_size)}
							</p>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
}

export default function UserRooms() {
	const axios = useAxios();

	const { isPending, data } = useQuery({
		queryKey: ["userRooms"],
		queryFn: async () => {
			const res = await axios.get("/user/rooms/");
			return res.data;
		},
	});

	return (
		<div className="pl-8">
			<div className="my-4 flex items-center justify-between">
				<h1 className="heading-large inline-block"> Your Rooms</h1>
				<button className="btn btn-soft btn-secondary">
					<FilterIcon className={"size-6"} /> Filter
				</button>
			</div>
			<div className="divider"></div>

			<div className="">
				{isPending && (
					<span className="loading loading-dots loading-xl text-primary"></span>
				)}
				<ul className="grid gap-3 grid-cols-3">
					{data?.map((v, i) => (
						<li key={i}>
							<RoomCard room={v}/>{" "}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
