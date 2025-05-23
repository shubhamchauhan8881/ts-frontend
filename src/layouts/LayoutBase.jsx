import React from 'react'
import { Outlet } from 'react-router'
import { AuthProvider } from '../context/AuthContext'
import { PopupProvider } from '../context/PopupContext'
import SideNav from '../components/SideNav';
import Header from '../components/Header';

export default function LayoutBase() {
  return (
      <>
        <AuthProvider>
            <PopupProvider>
              <div className='h-full flex'>
                  <SideNav />
                  <div className='h-full grow overflow-y-scroll ms-18 pb-4'>
                    <Outlet />
                  </div>
              </div>
            </PopupProvider>
        </AuthProvider>
      </>

  )
}
