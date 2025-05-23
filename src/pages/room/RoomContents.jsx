import React, { act, memo, useMemo, useReducer, useRef, useState } from 'react'
import useAxios from '../../hooks/useAxios';
import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { BASE_URL, formatBytes } from '../../assets/conf';
import { AddFileIcon, DeleteIcon, DownloadIcon, EyeIcon, EyeSlash, RupeeIcon, SearchIcon, XmarkIcon } from '../../assets/icons';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';


function RoomFile({data, download, is_admin}){
	const qc = useQueryClient()
	const axios = useAxios()
	const params = useParams()
	const [changes, setChanges] = useState({
		visibility:data.visibility
	})

	const mutation = useMutation({
		mutationFn: async ()=>{
			await axios.patch(`rooms/${params.id}/files/${data.id}/`, changes)
		},
		onSuccess:()=>toast.success("Updated!")
	})

	const handleVisibility =()=>{
		setChanges( prev=> {return {...prev, visibility: !prev.visibility }})
		mutation.mutateAsync()
	}
	return <>
		<tr className="hover:bg-base-100">
			<td>
				{
					changes.visibility
						?	<button disabled={!is_admin} className='btn btn-sm btn-ghost btn-secondary' onClick={ handleVisibility }><EyeIcon className={"size-5"}/></button>
						:	<button disabled={!is_admin} onClick={handleVisibility} className='btn btn-sm btn-ghost btn-secondary'><EyeSlash className={"size-5"}/></button>
				}
				
			</td>
			<td>{data.file_name}</td>
			<td> {formatBytes(data.file_size, 2)}</td>
			<td>{data.uploaded_at[0]} {data.uploaded_at[1]}</td>
			<td>Shubham </td>
			<td className=''>
				<button className='btn btn-ghost btn-sm hover:btn-primary' onClick={ ()=>download(data.id)}>
					<DownloadIcon className={"size-5"}/>
				</button>
			</td>
		</tr>
	</>
}


export default function RoomContents({data:roomData}) {
	
    const axios = useAxios();
	const qc = useQueryClient();

	const [filtered, setFiltered] = useState(null);
	const [search, setSearch] = useState("");
	const [selectedFiles, setSelectedFiles] = useState([]);
	
	const download = async (file_id)=>{
		const token = await axios.get(`files/${file_id}/get-download-token/`);
		return window.open(`${BASE_URL}/download/${token.data.downloadToken}`);
		}

	const {isPending, data, isError} = useQuery({
		queryFn: async () =>{
			const res = await axios.get(`/rooms/${roomData.room.id}/files/`);
			return res.data;
		},
		
		queryKey: ['roomFiles', roomData.room.id],
		refetchOnWindowFocus:false,
	});


	const handleSearchFilter = (e) => {
		setSearch(e.target.value);
		// const filtered = data?.filter(d => d.file_name.match(e.target.value.toLowerCase()));
		// console.log(data, filtered)
		// setFiltered(() => {

		// 	return data?.filter((d) => d.file_name == e.target.valuea);
		// });
	}
	
	const {mutateAsync:UploadAsync, isPending:UploadPending} = useMutation({
		mutationFn: async (file) =>{
			const Form = new FormData()
			Form.append("file", file);
			const data = await axios.post(`/rooms/${roomData.room.id}/files/`, Form, {headers: {'Content-Type': 'multipart/form-data'}})
			return data.data;
		},
		onSuccess: (data) =>  qc.setQueryData( ['roomFiles', roomData.room.id], (currentFiles)=>{ return [...currentFiles, data]})
	});

	const uploadFile = (e) => {
		const input = document.createElement("input")
		input.type = "file"
		input.click()

		function handlechange(e) {
			UploadAsync(e.target.files[0])
		}
		input.addEventListener("change", handlechange)
	}

	const deleteHandler = useMutation({
		mutationFn: async selectedFiles => {
			const url = selectedFiles.length > 0 ?
				`/rooms/${room.id}/files/0/?many=true&list=${JSON.stringify(selectedFiles)}`
				:
				`/rooms/${room.id}/files/${selectedFiles[0]}/`
			await axios.delete(url);
		},
		onSuccess: () => {
			setSelectedFiles([]);
			qc.invalidateQueries(['roomFiles', room.id])
		}
	})


  	return (
		<div className='grow shrink-0'>
            <div className='p-4 pt-0'>
				<div className='flex justify-between items-center'>
						<h1 className='heading-large'>Room Contents</h1>

						<div>
							<label className="input input-sm">
								<SearchIcon className={"size-4"} />
								<input type="search" value={search} onChange={handleSearchFilter} className="grow" placeholder="Search files" />
							</label>
						</div>	
				</div>

				<div className='mt-4'>
					{
						(roomData.is_admin || roomData.room.allow_others_to_upload) && 
						<div className=''>
							<button onClick={uploadFile} className='btn rounded-full btn-soft btn-primary'>
								<AddFileIcon className={"size-4"} />
								{
									UploadPending ? "Uploading...": "Upload"
								}
							</button>
						</div>
					}

				</div>
            </div>
            
            <div className="overflow-x-auto">

				{/* {selectedFiles.length > 0 &&
				<div className='border mb-4 border-primary overflow-hidden flex gap-x-4 items-center rounded-full pe-1.5' id='action-center'>
					<div className='bg-primary px-4 h-12 place-content-center font-medium'>
						Action Center
					</div>
					<span>{selectedFiles.length} Files</span>
					<div className='grow space-x-2'>
						<button className='btn btn-ghost btn-sm hover:btn-error' onClick={()=>deleteHandler.mutateAsync(selectedFiles)}>
							<DeleteIcon size={6}/>
							Delete
						</button>

						<button className='btn btn-ghost btn-sm hover:btn-secondary'>
							<EyeIcon size={6}/>
							Visible
						</button>
					</div>
					
				</div>
				}	 */}

                <table className="table">
                    <thead >
                        <tr className='border-0 border-b'>
                            <th>Visibility</th>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Uploaded at</th>
							<th>Uploaded By</th>
                            <th>Download</th>
                        </tr>
                    </thead>
						<tbody>
							{ (isPending  && !isError)?
								<>
									 <tr className='border-b-0'>
                                    	<td colSpan={6} className='text-center py-10 opacity-80'>Loading files</td>
                                	</tr>
								</>
							:		
							data.map((files, i) => <RoomFile is_admin = {roomData.is_admin} key={i} data={files} download={download} />)
							}
                    </tbody>
                </table>
            </div>
		</div>
  )
}