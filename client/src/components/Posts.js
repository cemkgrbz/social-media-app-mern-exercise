import { useContext, useEffect, useState } from 'react';
import {FaPlusCircle} from 'react-icons/fa'
import axios from 'axios'
import {AppContext} from './Context.js'
import Card from './Card'
import Modal from './Modal'

function Posts() {

    const {state, dispatch} = useContext(AppContext)
    const [modalOpen, setModalOpen] = useState(false)
    const [text, setText] = useState('')
    const [fileData, setFiledata] = useState({
        url: '',
        file: null
    })

    useEffect(() => {

        const getData = async () => {

            const response = await axios.get('http://localhost:4000/posts/list', {withCredentials: true})
            console.log("🚀 ~ getData ~ response", response)

            if (response.data.success) dispatch({
                type: 'getPosts',
                payload: response.data.posts
            })
            
        }

        getData()
    }, [])

    const handleSave = async () => {

        const formdata = new FormData()

        formdata.set('text', text)
        formdata.set('image', fileData.file, 'postImage')
       
        const config = {Headers: {
            'content-type': 'multipart/formdata'
        }}

        const response = await axios.post('/posts/add', formdata, config)
        console.log("🚀 ~ handleSave ~ response", response)

        if (response.data.success) {

            setText('')
            setModalOpen(false)

            dispatch({
                type: 'addPost',
                payload: response.data.post
            })
        }
    }

    const handleImageChange = e => {
        console.log('handle image here')
        setFiledata({
        url: URL.createObjectURL(e.currentTarget.files[0]),
        file: e.currentTarget.files[0]
    })
}

    return ( 
        <div className='flex items-center 
        w-full
        gap-[20px] min-h-[100vh] p-[40px] 
        flex-col'>
            <FaPlusCircle className='text-[2rem] cursor-pointer'  onClick={() => setModalOpen(true)}/>

            {
                modalOpen && <Modal 
                title='Add Post'
                closeModal={() => setModalOpen(false)}
                textAreaValue={text}
                textAreaOnChange={e => setText(e.target.value)}
                savePost={handleSave}
                handleImageChange={handleImageChange}
                img={fileData.url}
            />
                
                
            }
            {
                state.posts.map(item => (
                    <Card key={item._id} post={item} />
                ))
            }
        </div>
     );
}

export default Posts;