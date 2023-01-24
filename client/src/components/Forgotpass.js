import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPass() {

    const [data, setData] = useState({
        emailOrUsername: ''
    })

    const handleSubmit = async () => {

        const response = await axios.post('/users/forgotpass', data)
        console.log("🚀 ~ handleSubmit ~ response", response)

        if (response.data.success) alert('We have sent you an email with instructions about how to change your password')
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
                        value={data.emailOrUsername} 
                        onChange={e => setData({...data, emailOrUsername: e.target.value })}
                        placeholder="Email or username"
                        className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300" />
                </div>

                <div className="w-3/4 mb-12">
                    <button 
                        type="submit" 
                        onClick={handleSubmit}
                        className="py-4 bg-blue-500 w-full rounded text-blue-50 font-bold hover:bg-blue-700">SUBMIT</button>
                </div>
            </div>
            <div className="flex justify-center container mx-auto mt-6 mb-10 text-slate-100 text-sm">
                <div className="flex flex-col sm:flex-row  justify-between md:w-1/2 items-center">
                    <Link className='hover:text-red-500' to='/'><div className="flex " >Login</div></Link>
                </div>
            </div>
        </div>
    </div>
     );
}

export default ForgotPass;