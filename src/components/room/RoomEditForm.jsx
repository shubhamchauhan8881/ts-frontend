import React, {useState} from "react";
import { usePopup } from "../../context/PopupContext";
import useAxios from "../../hooks/useAxios";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function RoomEditForm({room}){

    const [changes,setChanges] = useState({
        "make_visible_on_search":room.make_visible_on_search,
        "allow_others_to_upload": room.allow_others_to_upload,
        "description":room.description
    });
    const {closePopup} = usePopup()
    const qc = useQueryClient()

    const axios = useAxios();

    const {isPending, isError, mutateAsync} = useMutation({
        mutationFn:async ()=>{
                    await axios.patch(`/rooms/${room.id}/`, changes, {headers: {'content-type': 'multipart/form-data'}})
        },
        onSuccess: ()=>{
            toast.success("Updated!!");
            qc.invalidateQueries(["Room", room.id])
        }
    }) 

    const cancel = ()=> {
        setChanges(null);
        closePopup();
    }

    return<>

        <h1 className='font-medium text-xl min-w-96'>Room Settings</h1>
        <div className='mt-4 space-y-2'>
            
            <div>
                <span className='block'>Room Name</span>
                <input className='input w-full mt-0.5' disabled name='room_name' value={room.room_name}/>
            </div>

            <div>
                <span className='block'>Description</span>
                <textarea name='description' className="textarea w-full mt-0.5" placeholder="description..." value={changes.description} onChange={e=> setChanges( prev=> {return {...prev, "description": e.target.value}}) }></textarea>
            </div>

            <div className='flex justify-between items-center py-2'>
                <p>Allow others to upload file</p>
                <input type="checkbox" name='allow_others_to_upload' checked={changes.allow_others_to_upload} onChange={e=> setChanges( prev=> {return {...prev, "allow_others_to_upload":!prev.allow_others_to_upload}}) } className="toggle toggle-primary" />
            </div>

            <div className='flex justify-between items-center py-2'>
                <p>Search Visibility</p>
                <input type="checkbox" name='make_visible_on_search' checked={changes.make_visible_on_search} onChange={e=> setChanges( prev=> {return {...prev, "make_visible_on_search":!prev.make_visible_on_search}}) } className="toggle toggle-primary" />
            </div>


            {isError && <div className='text-center p-2 outline outline-error rounded-md my-4 text-error'>Error while updating changes</div> }
            
            <div className='text-right mt-4 space-x-4'>
                <button className='btn btn-error btn-outline' onClick={cancel}>Cancel</button>
                <button className='btn btn-primary ' onClick={mutateAsync} disabled={isPending}>Save</button>
            </div>
        </div>
    </>
}
