import React from "react";
import { GetAbsoluteURL } from "../../assets/conf";
import { UserIcon } from "../../assets/icons";
import { useMutation } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";

export default function RequestRoomAccess({room}) {
    const axios = useAxios();

    const {isPending, mutateAsync} = useMutation({
        mutationFn:async(e)=>{
            e.target.textContent = "Request Sent!";
            e.target.disabled = true;
            return await axios.get(`/rooms/${room.id}/approval/`);
        },
        onSuccess:(data)=>{
            toast.info(data.data.details)
        }
    })
	return (
		<article className="rounded-xl bg-base-200 w-full">
			<div className="flex items-center gap-4 p-4 sm:p-6">
                {
                    room.author.image?
                    <img
                        alt=""
                        src={GetAbsoluteURL(room.author.image)}
                        className="size-14 rounded-lg object-cover"
                    />
                    :
                    <UserIcon className={"size-14"} />
                }
				<div className="grow text-left">
					<h3 className="font-medium sm:text-lg">
						{room.author.first_name} {room.author.st_name}
					</h3>
                    <p className="text-sm">@{room.author.username}</p>
				</div>

                <div>
					<button className="btn btn-primary" disabled={isPending} onClick={mutateAsync}>Request to join</button>
				</div>
			</div>
		</article>
	);
}
