import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { GetAbsoluteURL } from "../assets/conf";
import {LogOutIcon, PenIcon, TrophyIcon } from '../assets/icons';
import { useMutation } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";




export function UpgradeProCard() {
	return (
	  <div className=" rounded-xl shadow-md p-6 text-center space-y-4 bg-base-200">
		  <TrophyIcon className={"size-30 mx-auto text-[#FFD700]"} />

		<h2 className="heading">
		  Upgrade to <span className="text-primary">Pro</span>
		</h2>
  
  
		<ul className="text-sm text-center text-secondary-content space-y-2">
		  <li className="">
			Unlimited Room Creation.
		  </li>
		</ul>
  
		{/* Button */}
		<button className="btn btn-primary rounded-full btn-wide">
		  Upgrade Plan
		</button>
	  </div>
	);
  }



export default function UserProfilePage() {
	const { User, logout, setUser } = useAuth();
	const [editMode, setEditMode]  = useState(false);
	const navigate = useNavigate()

	const handleInputChange = (e) =>{
		setUser(c=>{return {...c, [e.target.name]:e.target.value }})
	}
	const axios =useAxios()

	const {isPending, mutateAsync} = useMutation({
		mutationFn: async(user_data)=>{
			await axios.patch("/user/update/", {...user_data, "first_name":user_data.fname, "last_name":user_data.lname,})
		},
		onError:()=> toast.error("Error While updating."),
		onSuccess:()=>{
			toast.success("Details updated!!");
			toast.info("Please login again to see changes.")
			logout();
			navigate("/login");
		}
	});

	return (
		<>
		
		<div className="pl-8">

			<div className="my-4">
				<h1 className="heading-large inline-block">Profile</h1>
				<div className="divider"></div>
			</div>

			<div className="relative">
				<img
					src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c"
					alt="background"
					className="w-full h-60 object-cover rounded-t-xl"
				/>

				<div className="absolute bottom-4 right-4">
					<button className="btn btn-secondary rounded-full "><PenIcon className={"size-4"} /> Edit</button>
				</div>
			
				<div className="absolute left-4 -bottom-16">
					<img
						src={GetAbsoluteURL(User?.image)}
						alt="avatar"
						className="size-36 rounded-full border-4"
					/>
				</div>
			</div>

			<div className="flex mt-20 ps-4 gap-4">
				<div className="w-4/6">
					<div className="text-xl font-semibold">{User?.first_name} {User?.last_name}</div>
					<div className="text-sm text-secondary-content">@{User?.username}</div>

					<div className="flex space-x-4 mt-4 text-primary-content text-sm">
						<div className="">3K <span className="text-secondary-content">following</span></div>
						<div className="">30.5M <span className="text-secondary-content">followers</span></div>
					</div>

					<div className="flex space-x-4 mt-4 text-secondary-content">
						{/* <button className="btn btn-secondary btn-wide btn-circle">+ Follow</button> */}
						
					</div>

					<div className="mt-6">
					<div className="text-lg font-semibold text-secondary-content">ABOUT</div>
					<p className="text-sm text-secondary-content mt-2">
						Adele (born 5 May 1988) is an English singer-songwriter. After graduating from the BRIT School for Performing Arts and Technology in 2006, Adele was given a recording contract by XL Recordings after a friend posted her demo on Myspace the same year. In 2007, she received the Brit Awards "Critics' Choice" award and won the BBC Sound of 2008 poll. Her debut album, 19, was released in 2008 to commercial and critical success. It is certified seven times platinum in the UK, and three times platinum in the US. The album contains her first song, "Hometown Glory", written when she was 16, which is based on her home suburb of West Norwood in London. An appearance she made on Saturday Night Live in late 2008 boosted her career in the US. At the 51st Grammy Awards in 2009, Adele received the awards for Best New Artist and Best Female Pop Vocal Performance.
					</p>
					</div>
				</div>

				<div className="w-2/6">
					<UpgradeProCard />
				</div>
			</div>
		
    	</div>
		</>
	);
}
