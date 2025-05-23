import React from "react";
import { useNavigate } from "react-router";
import { GlobeIcon, LockClosedIcon } from "../../assets/icons";
import { usePopup } from "../../context/PopupContext";



export default function RoomSearchResult({roomInfo}){
    const navigate = useNavigate();
    const {closePopup, openPopup} = usePopup()
    const {User} = usePopup();

    const navigate_n_closepopup =()=>{
        // if(!User){

        // }
        closePopup();
        navigate(`/room/${roomInfo.id}`);
    }


    return(
            <div className="py-2 flex gap-4 items-center hover:bg-primary/30 p-2 rounded-lg cursor-pointer" onClick={navigate_n_closepopup}>
                <div className="bg-primary p-2 rounded-lg">
                {
                    roomInfo.room_type == "pvt"?
                    <LockClosedIcon className={"size-6"} />
                    :
                    <GlobeIcon className={"size-6"} />
                }
        
                </div>
                <div className="inline-flex flex-col grow">
                <h3 className="text-sm">{roomInfo.room_name}</h3>
                <p className="text-xs">Author: {roomInfo.author}</p>
                </div>
            </div>

    )
}
