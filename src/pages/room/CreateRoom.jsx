import React, { useRef, useState } from 'react'
import useAxios from '../../hooks/useAxios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "react-toastify";
import { usePopup } from '../../context/PopupContext';

export default function CreateRoom() {
    const [RoomType, setRoomType] = useState("pvt");
    const [roomLogo, setRoomLogo] = useState(null);
    const logoRef = useRef();
    const logoCaption = useRef();
    const {closePopup} = usePopup();

    const qc = useQueryClient();

    const [entries, setEntries] = useState({
        room_name: "",
        room_pass: "",
    })

    const axios = useAxios();

    const { mutateAsync, isPending, isError, error, data } = useMutation({
        mutationFn: async (formData) => {
          return await axios.post('/user/rooms/', formData, {headers: {'content-type': 'multipart/form-data'}})
        },
        onSuccess: (data) => {
            toast.success("Room Created Successfully!!");
            qc.invalidateQueries(["userRooms"]);
            // qc.setQueriesData(["userRooms"], (current)=> {return {...current, data}})
            closePopup();
        }
    });

    const handleLogoChange = (e) => {
        if (e.target.files) {
            const url = URL.createObjectURL(e.target.files[0]);
            logoRef.current.src = url;
            logoCaption.current.textContent = e.target.files[0].name;
            setRoomLogo(e.target.files[0]);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!roomLogo) {
            toast.error("Please choose room logo.");
            return;
        }
        if (!entries.room_name) {
            toast.error("Please enter room name.");
    
        }else {
            const data = new FormData()
            data.append('logo', roomLogo);
            data.append('room_name', entries.room_name);
            data.append('room_type', RoomType);
           
            if (RoomType == 'pvt') {
                data.append('room_pass', entries.room_pass);
            }
            mutateAsync(data);
        }
    }
    

  return (
    <div className='space-y-8 w-96 p-4 pt-0'>
        <div className=''>
            <h1 className='heading inline-block'>Create Room</h1>
            <p className='text-sm'>
                You can create Public / Private rooms.
            </p>
        </div>
        <form className='grid grid-cols-2 gap-4' onSubmit={handleSubmit}>
            <div className='col-span-2 mb-4' >
                <label className='inline-block cursor-pointer'>
                    <input type='file' hidden onChange={handleLogoChange}/>
                    <div className='size-20 rounded-full overflow-hidden border '>
                        <img ref={logoRef} src='/vite.svg' className='size-full object-cover'/>
                    </div>
                    <p className='text-center text-sm' ref={logoCaption}>No file selected.</p>
                </label>
            </div>

            <label className="flex-row gap-4 w-full cursor-pointer">
                <input
                    value="pvt"
                    name='room_type_radio'
                    type="radio"
                    className='peer'
                    hidden
                    checked={RoomType == "pvt"}
                    onChange={()=> setRoomType("pvt")}
                    />
                <div className='flex select-none items-center gap-2 border p-2 bg-base-100 rounded border-transparent peer-checked:bg-primary'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    Private Room
                </div>
            </label>

            <label className=" flex-row gap-4 w-full cursor-pointer">
                <input 
                    value="pub"
                    name='room_type_radio'
                    type="radio"
                    className='peer'
                    hidden
                    checked={RoomType == "pub"}
                    onChange={()=> setRoomType("pub")}
                    />
                <div className='flex select-none items-center gap-2 border p-2 bg-base-100 rounded border-transparent peer-checked:bg-primary'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    Public Room
                </div>
            </label>

            <fieldset className="fieldset col-span-2">
                <legend className="fieldset-legend">Room Name</legend>
                  <input type="text" value={entries.room_name} onChange={e => setEntries((curr) => { return {...curr, room_name:e.target.value}
                 } )} className="input w-full input-primary" placeholder="Type here" required/>
            </fieldset>

            {
                RoomType == "pvt" &&
                <fieldset className="fieldset col-span-2">
                    <legend className="fieldset-legend">Room Password</legend>
                    <input type="password" value={entries.room_pass} onChange={e => setEntries((curr) => { return {...curr, room_pass:e.target.value}
                 } )} className="input w-full input-primary" placeholder="Type here" required/>
                </fieldset>
            }

            {isError &&
                      <div>{Object.keys(error.response.data).map((key, index) => {
                          return <div key={index}>
                              <span className='capitalize font-medium text-error'>{ key.split("_",).join(" ") }: </span>
                              {error.response.data[key]}
                          </div>
                      } ) }</div>
                      
            }
            <div className="col-span-2 mt-4">
                  <button className="btn btn-secondary" type={isPending ? "button" : "submit"}>
                      {
                          isPending
                          ?
                          <span className="loading loading-spinner"></span>
                          :
                          "Create Room"
                }
              </button>
            </div>
        </form>
    </div>
  )
}
