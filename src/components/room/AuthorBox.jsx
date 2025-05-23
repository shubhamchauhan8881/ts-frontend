import React from "react";
import { GetAbsoluteURL } from "../../assets/conf";


export default function AuthorBox({author}){
	return(
		<div className='bg-base-200 p-4 rounded-md'>
			<h2 className='mb-4 font-medium'>
				Author
			</h2>
			<div className='my-2 flex gap-4 items-center justify-start rounded-md'>
				<div className="avatar placeholder shrink-0">
					<div className="size-16 rounded-lg">
						<img alt="" src={GetAbsoluteURL(author.profile)} className="" />
					</div>
				</div>
				<div>
	
					<p className='text-lg font-medium'>{author.first_name} {author.last_name}</p>
					<p className='text-xs'>@{author.username}</p>
				</div>
			</div>
		</div>
		)
}

