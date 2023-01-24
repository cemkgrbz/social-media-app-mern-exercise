import {GoKebabHorizontal} from 'react-icons/go'
import { useContext, useState } from 'react';
import Popover from '@mui/material/Popover';
import { AppContext } from './Context';
import axios from 'axios';
import Modal from './Modal'

function Comment({item, postId}) {
    console.log("🚀 ~ Comment ~ item", item)
    
    const [editCommentModalOpen, setEditCommentModalOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const {state, dispatch} = useContext(AppContext)

    const [commentToEdit, setCommentToEdit] = useState({...item})

    const handleDeleteComment = async () => {

        if (item.owner._id !== state.user._id) return alert('You don\'t have permission to perform this action')

        const response = await axios.delete(`/posts/comments/delete/${postId}/${item._id}`)
        console.log("🚀 ~ handleDeleteComment ~ response", response)

        if (response.data.success) dispatch({
            type: 'addComment',
            payload: {
                postId,
                comments: response.data.comments
            }
        })
    }

    const handleEditComment = () => {
        
        setAnchorEl(null) // closes the popover
        setEditCommentModalOpen(true) // opens the modal
    }

    const handleSaveComment = async () => {
    
        const response = await axios.patch('/posts/comments/edit', {
            postId,
            comment: commentToEdit.comment,
            commentId: item._id
        })
        console.log("🚀 ~ handleSaveComment ~ response", response)
    
        if (response.data.success) dispatch({
            type: 'addComment',
            payload: {
                postId,
                comments: response.data.comments
            }
        })

        setEditCommentModalOpen(false) // close the modal
    }

    return ( 
        <div>
        <label htmlFor="chat" className="sr-only">Your message</label>
        <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
            <div className='flex flex-col items-center justify-center h-full'>
                <img className='object-cover w-[3rem] h-[2rem] rounded-full' src={item.owner.image} alt=''/>
            </div>
            <textarea 
                value={item.comment}
                id="chat" rows="1" disabled className="block resize-none mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
            <div className='grow flex justify-end'>  
            <button className='cursor-pointer'>
                <GoKebabHorizontal 
                    onClick={e => setAnchorEl(e.currentTarget)}
                    className='text-slate-500'/>
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
                        onClick={handleEditComment}
                        className='p-4 cursor-pointer hover:bg-slate-400'>Edit comment</p>
                       <p 
                        onClick={handleDeleteComment}
                        className='p-4 cursor-pointer hover:bg-slate-400'>Delete comment</p>
                    </Popover>
            </button>
        </div> 
        </div>
        {
            editCommentModalOpen && 
            <Modal 
                title='Edit Comment'
                closeModal={() => setEditCommentModalOpen(false)}
                
                textAreaValue={commentToEdit.comment}
                textAreaOnChange={e => setCommentToEdit({...commentToEdit, comment: e.target.value})}
                
                savePost={handleSaveComment}
            />
        }
    </div>
     );
}

export default Comment;