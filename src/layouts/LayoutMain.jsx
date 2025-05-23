import React from 'react'
import { Outlet } from 'react-router'
import Header from '../components/Header'
import SideNav from '../components/SideNav'

export default function LayoutMain() {
  return (
    <div className='h-screen flex'>
        <SideNav />
        <div className='h-full grow shrink-0'>
            <div className='bg-base-200 h-full overflow-y-scroll'>
                <Header />
                <>
                    <Outlet />
                </>
            </div>
        </div>
    </div>
  )
}
