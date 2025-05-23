import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router';
import { CirclePlusIcon, SearchIcon } from '../assets/icons';
import { usePopup } from '../context/PopupContext';
import CreateRoom from './room/CreateRoom';
import SearchModal from '../components/SearchModal';

function QuickActions({values}){
    const {url,command, title, details, icon} = values;
    const navigate = useNavigate();
    const handleClick = ()=>{
        if(command)
            command();
        else
            navigate(url);
    }
    return <>
        <button onClick={handleClick} className="flex justify-start gap-8 items-center border-2 border-base-300/50 rounded-md w-full hover:bg-primary cursor-pointer">
            <div className='bg-base-200/50 p-8'>
            {icon}
            </div>
            <div className='text-left'>
                <p className='text-xl font-semibold'>{title}</p>
                <p className='opacity-50'>{details}</p>
            </div>
        </button>
    </>
}

export default function HomePage() {

    const {openPopup} = usePopup()

    const QuickAction = [
        {url:"", command: ()=> openPopup(<CreateRoom />), title:"Create Room", details:"Create Public/Private Rooms", icon: <CirclePlusIcon className="size-16" />},
        {url:"/rooms/", title:"My Rooms", details:"View Room Created by you.", icon: <CirclePlusIcon className="size-16" />},
        {url:"/rooms/joined/", title:"Joined Rooms", details:"View all rooms joined by you.", icon: <CirclePlusIcon className="size-16" />},
    ]

    return (
    <div className='flex flex-col gap-8 justify-center pl-8'>

        <div className='flex'>
            <div className='w-4/6 place-content-end'>
                <h1 className='heading-large text-8xl inline-block'>TempSpace</h1>
                <p className='font-medium text-3xl mt-2 opacity-50'>Share. Search. Store</p>
            </div>
            <div className='w-2/6 max-h-80'>
                <img src='/cloud.png' className='size-full object-contain object-center'/>
            </div>
        </div>

        <div className='flex gap-2'>
            <label className="input input-lg w-full max-w-xl" onClick={()=> openPopup(<SearchModal />)}>
                <SearchIcon className="size-5"/>
                <span className='opacity-60'>Search room...</span>
            </label>
        </div>

{/*     
        <div className='grid grid-cols-3 gap-4'>
            {
                QuickAction.map((v, index)=> <QuickActions values={v} key={index} />)
            }
        </div> */}

        <div>
            <h1 className='heading'>Recents</h1>
            <div className='grid grid-cols-3 gap-4 mt-4'>
                
                {
                    QuickAction.map((v, index)=> <QuickActions values={v} key={index} />)
                }
                
            </div>
        </div>
    </div>
  )
}
