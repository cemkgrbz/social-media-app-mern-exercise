import {FiUser} from 'react-icons/fi'
import {HiOutlineMail} from 'react-icons/hi'
import {GoLocation} from 'react-icons/go'
import {BsFillCalendarMonthFill} from 'react-icons/bs'
import axios from 'axios'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import noImg from '../images/no-img.jpg'
import { useContext, useState } from 'react'
import {AppContext} from './Context'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const hobbies = [
    'Tennis',
    'Movies',
    'Traveling',
    'Golf'
]



function Profile() {

    const {state, dispatch} = useContext(AppContext)

    const [fileData, setFiledata] = useState({
        url: state.user.image,
        file: null
    })

    const [data, setData] = useState({
        username: state.user.username,
        email: state.user.email,
        address: state.user.address,
        age: state.user.age,
        gender: state.user.gender || "",
        hobbies: state.user.hobbies || []
    })

    const handleSave = async () => {

        const formdata = new FormData()

        formdata.set('username', data.username)
        formdata.set('email', data.email)
        formdata.set('address', data.address)
        formdata.set('age', data.age)
        formdata.set('gender', data.gender)
        formdata.set('hobbies', JSON.stringify(data.hobbies))

        if (fileData.file) formdata.set('image', fileData.file, 'profileImage')

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
    


    const handleChange = (e) => {
      
        // const {target: { value }, } = e;

      setData({
        ...data,
        hobbies:   e.target.value
    });
};



    console.log("🚀  ~ handleChange ~ data", data)
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

        <Box sx={{ minWidth: 400 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data.gender}
                label="Age"
                onChange={e => setData({...data, gender: e.target.value})}
                >
                <MenuItem value={'Male'}>Male</MenuItem>
                <MenuItem value={'Female'}>Female</MenuItem>
                <MenuItem value={'Other'}>Other</MenuItem>
                </Select>
            </FormControl>
        </Box>

        <FormControl sx={{ m: 1, width: 400 }}>
            <InputLabel id="demo-multiple-checkbox-label">Hobbies</InputLabel>
            <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={data.hobbies}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
            >
            {hobbies.map((item) => (
                <MenuItem key={item} value={item}>
                    <Checkbox checked={data.hobbies.indexOf(item) > -1} />
                    <ListItemText primary={item} />
                </MenuItem>
            ))}
            </Select>
        </FormControl>

        <button onClick={handleSave}>Save Profile</button>
        </div>
     );
}

export default Profile;