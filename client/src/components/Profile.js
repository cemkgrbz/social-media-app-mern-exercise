import {FiUser} from 'react-icons/fi'
import {HiOutlineMail} from 'react-icons/hi'
import {GoLocation} from 'react-icons/go'
import {BsFillCalendarMonthFill} from 'react-icons/bs'
import axios from 'axios'

import noImg from '../images/no-img.jpg'
import { useContext, useState } from 'react'
import {AppContext} from './Context'

function Profile() {

    const {state, dispatch} = useContext(AppContext)

    const [fileData, setFiledata] = useState({
        url: '',
        file: null
    })

    const [data, setData] = useState({
        username: state.user.username,
        email: state.user.email,
        address: state.user.address,
        age: state.user.age
    })

    const handleSave = async () => {

        const formdata = new FormData()

        formdata.set('username', data.username)
        formdata.set('email', data.email)
        formdata.set('address', data.address)
        formdata.set('age', data.age)
        formdata.set('image', fileData.file, 'profileImage')

        const config = {
            Headers: {'content-type': 'multipart/form-data'}
        }

        const response = await axios.post('/users/profile', formdata, config)
        console.log("🚀 ~ handleSave ~ response", response)

        if (response.data.success) dispatch({
            type: 'userSaved',
            payload: response.data.user
        })
    }

    const handleImageChange = e => {
        console.log("🚀 ~ handleImageChange ~ e", e.currentTarget.files[0])
        
        setFiledata({
            url: URL.createObjectURL(e.currentTarget.files[0]),
            file: e.currentTarget.files[0] 
        })
    }

    return ( 
<div className='flex w-full justify-center items-center gap-[20px] flex-col mt-[30px]'>
        <div className='flex items-center gap-[10px]'>
        <FiUser className='text-slate-400 w-[40px] h-[40px] border-2 border-slate-400 rounded-md p-[3px]'/>

        <input 
            value={data.username}
            className='border-2 border-slate-500 p-[5px] w-[200px] h-[40px]' disabled/>
        </div>
        
        <div className='flex items-center gap-[10px]'>
        <HiOutlineMail className='text-slate-400 w-[40px] h-[40px] border-2 border-slate-400 rounded-md p-[3px]'/>

        <input 
            value={data.email}
            className='border-2 border-slate-500 p-[5px] w-[200px] h-[40px]'placeholder='' disabled/>
        </div>

        <div className='flex items-center gap-[10px]'>
        <GoLocation className='text-slate-400 w-[40px] h-[40px] border-2 border-slate-400 rounded-md p-[3px]'/>

        <input 
            value={data.address}
            onChange={e => setData({...data, address: e.target.value})}
            className='border-2 border-slate-500 p-[5px] w-[200px] h-[40px]'placeholder=''/>
        </div>

        <div className='flex items-center gap-[10px]'>
        <BsFillCalendarMonthFill className='text-slate-400 w-[40px] h-[40px] border-2 border-slate-400 rounded-md p-[3px]'/>

        <input 
            value={data.age}
            onChange={e => setData({...data, age: e.target.value})}
            className='border-2 border-slate-500 p-[5px] w-[200px] h-[40px]'placeholder='' />
        </div>

        <label className='cursor-pointer'>
            Select your profile image
            <input type='file' className='hidden' onChange={handleImageChange}/>
        </label>
        <img className='w-[300px] h-[300px] rounded-md object-cover' 
            src={fileData.url || noImg} alt=''/>

        <button onClick={handleSave}>Save Profile</button>
        </div>
     );
}

export default Profile;