import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

function Register() {

    const [data, setData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const handleRegister = async () => {

        const response = await axios.post('/users/register', data)
        console.log("🚀 ~ handleRegister ~ response", response)

        if (response.data.success) navigate('/')

    }

    return ( 
        <div className="bg-blue-500 w-screen  ">
        <div className="flex justify-center container mx-auto my-auto w-screen h-screen items-center flex-col">
            <div className="text-slate-100 items-center">
                <svg className="w-10 h-10 mx-auto pb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <div className="text-center pb-3">Welcome at social app!</div>
            </div>

            <div className="w-full md:w-3/4  lg:w-1/2 flex flex-col items-center bg-slate-50 rounded-md pt-12">

                <div className="w-3/4 mb-6">
                    <input 
                        type="email" 
                        name="email" 
                        value={data.email} 
                        onChange={e => setData({...data, email: e.target.value })}
                        placeholder="Email"
                        className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300" />
                </div>

                <div className="w-3/4 mb-6">
                    <input 
                        type="text" 
                        name="user" 
                        value={data.username} 
                        onChange={e => setData({...data, username: e.target.value })}
                        placeholder="Username"
                        className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300" />
                </div>

                <div className="w-3/4 mb-6">
                    <input 
                        type="password" 
                        name="password" 
                        value={data.password} 
                        onChange={e => setData({...data, password: e.target.value})}
                        placeholder="Password"
                        className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500  border-solid border-2 border-slate-300"  />
                </div>

                <div className="w-3/4 mb-12">
                    <button 
                        type="submit" 
                        onClick={handleRegister}
                        className="py-4 bg-blue-500 w-full rounded text-blue-50 font-bold hover:bg-blue-700">REGISTER</button>
                </div>
            </div>
            <div className="flex justify-center container mx-auto mt-6 mb-10 text-slate-100 text-sm">
                <div className="flex flex-col sm:flex-row  justify-between md:w-1/2 items-center">
                <Link className='hover:text-red-500' to='/'>Do you have an account already?</Link>
                </div>
            </div>
        </div>
    </div>
     );
}

export default Register;