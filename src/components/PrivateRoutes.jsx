import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'
import { usePopup } from '../context/PopupContext'
import Login from './Login'

export default function PrivateRoutes({children}) {
  const {User} = useAuth()
  const navigate = useNavigate()
  const {openPopup} = usePopup();

  useEffect(()=>{
    if(!User){
      toast.error("Please login first.")
      navigate("/")
      openPopup(<Login />)
    }
  }, [User]);
  
  return <>
    {children}
  </>
}
