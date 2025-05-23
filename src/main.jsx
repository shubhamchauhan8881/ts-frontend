import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClientProvider , QueryClient} from '@tanstack/react-query';
import {createBrowserRouter, RouterProvider} from 'react-router';
import HomePage from './pages/HomePage';
import { ToastContainer } from 'react-toastify';
import LayoutBase from './layouts/LayoutBase';
import UserRooms from './pages/room/UserRooms';
import JoinedRoomPage from './pages/room/JoinedRoomPage'
import Room from './pages/room/Room';
import UserProfilePage from './pages/UserProfilePage'
import PrivateRoutes from './components/PrivateRoutes';


const ReactQueryClient = new QueryClient()



const router = createBrowserRouter([
  {

    Component: LayoutBase,
    children: [
      {
        path:"/",
        Component: HomePage
      },
      {
        path:"/rooms",
        element: <PrivateRoutes> <UserRooms /></PrivateRoutes>
      },
      {
        path: "/rooms/joined",
        element: <PrivateRoutes> <JoinedRoomPage /> </PrivateRoutes> 
      },
      {
        path:"/room/:id",
        element: <PrivateRoutes> <Room /></PrivateRoutes>
      },
      {
        path:"/profile",
        element: <PrivateRoutes> <UserProfilePage /> </PrivateRoutes>
      }
    ]
  }

]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={ReactQueryClient}>
      <RouterProvider router={router} />
      <ToastContainer />
    </QueryClientProvider>
  </StrictMode>,
)
