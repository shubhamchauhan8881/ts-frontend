import React, {useRef, useState, useEffect} from "react";
import { useMutation } from "@tanstack/react-query";
import RoomSearchResult from "./room/RoomSearchResults";
import { SearchIcon } from "../assets/icons";
import axios from "axios";
import { BASE_URL } from "../assets/conf";

export default function SearchModal(){
    const input_ref = useRef()
    const [qury, setQury] = useState("")

    const {isPending, data:RoomsInfo, isError, error, mutateAsync} = useMutation({

        mutationFn: async (data)=>{
            
            const search_res = await axios.get(BASE_URL + `/rooms/search/?query=${data}`);
            return search_res.data;
        },
        mutationKey: ["RoomSearch", qury],
    });

    useEffect(()=>{
        input_ref?.current.focus();

        const handler = setTimeout(() => {
            if(qury?.length < 3) return;
            mutateAsync(qury)
          }, 300);
      
          return () => {
            clearTimeout(handler);
        };

    },[qury])


    return(
        <div className='w-3xl'>
            <h1 className='heading'>Search Rooms</h1>
            <label className="input w-full mt-6 input-primary input-lg">
                {
                    isPending ?
                    <span className='loading loading-spinner loading-lg text-primary'></span>
                    :
                    <SearchIcon className="size-6"/>
                }
                <input type="search" value={qury} onChange={e=> setQury(e.target.value)} placeholder="Search"  ref={input_ref}/>
            </label>

            <div className='mt-4 max-h-96 overflow-y-scroll space-y-4'>
               { isError && <div className="badge badge-error badge-md">{error.message}</div>}

                {
                    RoomsInfo && <p className="opacity-50 mb-2">{RoomsInfo?.length} Results</p>
                }
                {
                    RoomsInfo?.map( (value, index)=>  <RoomSearchResult roomInfo={value} key={index} /> )
                }

            </div>
        </div>
    )
}
