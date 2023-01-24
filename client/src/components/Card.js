import {GoKebabHorizontal} from 'react-icons/go'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import {FaRegComments} from 'react-icons/fa'
import Popover from '@mui/material/Popover';
import { useContext, useState } from 'react';
import axios from 'axios';
import { AppContext } from './Context';
import Modal from './Modal'
import Spinner from './Spinner';

import NewComment from './CommentAdd'
import Comment from './Comment'

function Card({post}) {

    const {state, dispatch} = useContext(AppContext)
    const [loading, setLoading] = useState(false)

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

    const handleLikeClick = async () => {

        setLoading(true)

        const response = await axios.patch('/posts/likes', {postId: post._id})
        console.log("🚀 ~ handleLikeClick ~ reponse", response)

        if (response.data.success) dispatch({
            type: 'like',
            payload: {
                postId: post._id,
                likes: response.data.likes
            }
        })

        setLoading(false)
    }

    const handleSendComment = async (e, comment, updateValue) => {

        e.preventDefault()
        const response = await axios.post('/posts/comments/add', {
            postId: post._id,
            comment
        })
        console.log("🚀 ~ handleSendComment ~ response", response)

        if (response.data.success) dispatch({
            type: 'addComment',
            payload: {
                postId: post._id,
                comments: response.data.comments
            }
        })
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
                post.image &&
                    <img className='w-full object-cover h-[250px] rounded-md' src={post.image} alt='' />
                
            }
            <hr />
            <div className='flex justify-around items-center'>
                <div className='flex gap-[20px]' onClick={handleLikeClick}>
                    {
                        loading ? <Spinner /> :
                        
                        post.likes.includes(state.user._id) ?
                        <>
                        <AiFillHeart className='text-red-500 text-[2rem] cursor-pointer'/> <span>{post.likes.length}</span>
                        </>
                        :
                            <>
                            <AiOutlineHeart className='text-red-500 text-[2rem] cursor-pointer'/> 
                            <span>{post.likes.length}</span>
                            </>
                    }
                </div>
                
                <FaRegComments className='text-slate-500 hover:text-red-500 text-[2rem] cursor-pointer' />
            </div>
            
            <hr />
                {
                    post.comments.map(item => <Comment 
                        key={item._id} 
                        item={item}
                        postId={post._id}
                        />)
                }
                
               <NewComment handleSend={handleSendComment}/>     

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