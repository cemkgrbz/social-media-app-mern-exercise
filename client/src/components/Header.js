import {FaHome} from 'react-icons/fa'
import {CgProfile} from 'react-icons/cg'
import {FiLogOut} from 'react-icons/fi'
import {Link, useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from './Context'
import axios from 'axios'

function Header() {

    const navigate = useNavigate()

    const {state, dispatch} = useContext(AppContext)

    const handleLogout = async () => {

        const response = await axios.get('http://localhost:4000/users/logout')
        console.log("🚀 ~ handleLogout ~ response", response)

        dispatch({
            type: 'logout'
        })

        navigate('/')
    }

    return ( 
        <div className='bg-teal-500 text-white 
            w-full h-[100px] flex justify-center 
            items-center gap-[20px] text-[2rem]  cursor-pointer'>
            <Link to='/dashboard'><FaHome className='hover:text-slate-600'/> </Link>
            <Link to='/profile'><CgProfile className='hover:text-slate-600'/> </Link>
            <FiLogOut className='hover:text-slate-600 cursor-pointer' onClick={handleLogout}/>
            <img className='w-[50px] h-[50px] object-cover rounded-full' src={state.user.image}/>
        

        </div>
     );
}

export default Header;