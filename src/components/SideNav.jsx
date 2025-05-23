import React, { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { usePopup } from '../context/PopupContext'
import CreateRoom from '../pages/room/CreateRoom';
import { AngleLeftIcon, AngleRightIcon, BellIcon, CreateRoomIcon, HomeIcon, JoinedRoomsIcon, LoginIcon, LogOutIcon, RoomsIcon, SearchIcon, UserIcon } from '../assets/icons';
import SearchModal from './SearchModal';
import { useAuth } from '../context/AuthContext';
import Login from '../components/Login';

export default function SideNav() {
    const {User, logout} = useAuth();
    const {openPopup} = usePopup();
    const [hovered, setHovered] = useState(false);

  return (
    <div  className={`absolute top-0 bottom-0 left-0 z-40 shadow-lg ${hovered && 'shadow-slate-600'} bg-base-300 flex flex-col px-2 gap-4 w-${hovered ? 80 : 18} transition-all duration-200`} >

        <button onClick={()=>setHovered(c=>!c)} className='absolute top-8 -right-3 btn btn-square btn-xs btn-secondary'>
            {
                hovered ?
                    <AngleLeftIcon className="size-4" />
                    :
                    <AngleRightIcon className="size-4"/>
            }
        </button>

        <div className='flex items-center w-full gap-4 my-4'>
            <Link className='shrink-0'  to={"/"}>
                <img src='/logo_32.png' className='size-12'/>
            </Link>
            {
                hovered && <span className='font-bold text-xl'>TempSpace</span>
            } 
        </div>

        <div className='grow'>

            <button className='btn btn-ghost btn-primary w-full justify-start gap-4' onClick={()=>openPopup(<SearchModal />)}>
                <SearchIcon className={"size-6 shrink-0"}/>
                {hovered && <span className='font-medium'>Search</span>}
            </button>

            <div className='divider'></div>

            <div className='space-y-4'>
                <button className='btn btn-ghost btn-secondary w-full justify-start gap-4' onClick={()=>openPopup(<CreateRoom />)}>
                    <CreateRoomIcon className={"size-6 shrink-0"} />
                    {hovered && <span className='font-medium'>Create Room</span>}
                </button>

                <NavLink to="/rooms"  className={ ({ isActive }) => "btn flex btn-ghost w-full hover:btn-secondary justify-start gap-4"} >
                    <RoomsIcon className="size-6 shrink-0" />
                    {hovered && <span className='font-medium'>Your Rooms</span>}
                </NavLink>

                <NavLink to="/rooms/joined"  className={({ isActive }) => "flex btn btn-ghost w-full hover:btn-secondary justify-start gap-4"} >
                    <JoinedRoomsIcon className="size-6 shrink-0" />
                    {hovered && <span className='font-medium'>Joined Rooms</span>}
                </NavLink>
                <div className='divider mt-1'></div>

                <NavLink to="/profile"  className={({ isActive }) => "flex btn btn-ghost w-full hover:btn-secondary justify-start gap-4"} >
                    <UserIcon className="size-6 shrink-0" />
                    {hovered && <span className='font-medium'>Profile</span>}
                </NavLink>

                <button className='flex btn btn-ghost btn-secondary w-full justify-start gap-4' onClick={()=>openPopup(<SearchModal />)}>
                    <BellIcon className={"size-6 shrink-0"}/>
                    {hovered && <span className='font-medium'>Notifications</span>}
                </button>

                {
                    User ?
                    <button className='btn flex btn-ghost text-error hover:text-primary-content btn-error w-full justify-start gap-4' onClick={logout}>
                        <LogOutIcon className={"size-6 shrink-0"}/>
                        {hovered && <span className='font-medium'>Logout</span>}
                    </button>
                    :
                    <button className='btn flex btn-primary w-full justify-start gap-4' onClick={()=>openPopup(<Login />)}>
                        <LoginIcon className={"size-6 shrink-0"}/>
                        {hovered && <span className='font-medium'>Login</span>}
                    </button>
                }
            </div>
        </div>


        <div className='text-center opacity-50'>
            v 3.1
        </div>

    </div>
  )
}
