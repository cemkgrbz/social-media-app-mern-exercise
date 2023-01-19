import {GoKebabHorizontal} from 'react-icons/go'
import Popover from '@mui/material/Popover';
import { useContext, useState } from 'react';
import axios from 'axios';
import { AppContext } from './Context';
import Modal from './Modal'

function Card({post}) {

    const {dispatch} = useContext(AppContext)

    const [anchorEl, setAnchorEl] = useState(null);

    const [editPostModalOpen, setEditPostModalOpen] = useState(false)

    const [postToEdit, setPostToEdit] = useState({
        postId: post._id,
        owner: post.owner._id,
        text: ''
    })

    const open = Boolean(anchorEl);

    const handleDeletePost = async (id) => {

        const response = await axios.delete('/posts/delete', {data: {id}})
        console.log("🚀 ~ handleDeletePost ~ response", response)

        if (response.data.success) dispatch({
            type: 'deletePost',
            payload: id
        })
    }

    const handleEditPostOpen = () => {
        setEditPostModalOpen(true); 
        setAnchorEl(null)
        setPostToEdit({...postToEdit, text: post.text})
    }

    const handleSavePost = async () => {

        const response = await axios.put('/posts/edit', postToEdit)
        console.log("🚀 ~ handleSavePost ~ response", response)

        if (response.data.success) {
            setEditPostModalOpen(false)

            dispatch({
                type: 'editPost',
                payload: postToEdit
            })
        }
    }

    return ( 
        <div className='flex flex-col gap-[20px] border-2 border-slate-500 rounded-md w-[400px]  p-[20px]'>
            <div className='flex items-center gap-[10px] w-full justify-end'>
                {post.owner.username}
               
                <div className='grow flex justify-end'>
                    <button 
                        onClick={e => setAnchorEl(e.currentTarget)}
                        className='cursor-pointer'>
                        <GoKebabHorizontal />
                    </button>
                    <Popover
                        // id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                        }}
                    >
                       <p 
                        onClick={handleEditPostOpen}
                        className='p-4 cursor-pointer hover:bg-slate-400'>Edit post</p>
                       <p 
                        onClick={() => handleDeletePost(post._id)}
                        className='p-4 cursor-pointer hover:bg-slate-400'>Delete post</p>
                    </Popover>
                   
                </div>
            </div>
            {post.text}
            <hr />

            {
                editPostModalOpen && 
                <Modal 
                    title='Edit Post'
                    closeModal={() => setEditPostModalOpen(false)}
                    textAreaValue={postToEdit.text}
                    textAreaOnChange={e => setPostToEdit({...postToEdit, text: e.target.value})}
                    savePost={handleSavePost}
                />
            }
           

            </div>
     );
}

export default Card;