import { useContext, useEffect, useState } from 'react';
import {FaPlusCircle} from 'react-icons/fa'
import axios from 'axios'
import {AppContext} from './Context.js'

function Posts() {

    const {state, dispatch} = useContext(AppContext)
    const [modalOpen, setModalOpen] = useState(false)
    const [text, setText] = useState('')


    useEffect(() => {

        const getData = async () => {

            const response = await axios.get('/posts/list')
            console.log("🚀 ~ getData ~ response", response)

            if (response.data.success) dispatch({
                type: 'getPosts',
                payload: response.data.posts
            })
            
        }

        getData()
    }, [])

    const handleSave = async () => {
       
        const response = await axios.post('/posts/add', {
            text,
            // owner: state.user._id
        })
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

    return ( 
        <div className='flex items-center 
        w-full
        gap-[20px] min-h-[100vh] p-[40px] 
        flex-col'>
            <FaPlusCircle className='text-[2rem] cursor-pointer'  onClick={() => setModalOpen(true)}/>

            {
                modalOpen && <div id="staticModal"  tabIndex="-1" aria-hidden="true" className="fixed
                top-[29%] left-[29%] w-full p-4 overflow-x-hidden overflow-y-auto h-modal md:h-full ">
                   <div className="relative w-full h-full max-w-2xl md:h-auto ">
                       <div className="relative rounded-lg shadow dark:bg-gray-700 bg-slate-300">
                           {/* Modal header */}
                           <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                               <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                   New post
                               </h3>
                               <button 
                                   type="button" 
                                   onClick={() => setModalOpen(false)}
                                   className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                               </button>
                           </div>
                           {/* Modal body */}
                           <div className="p-6 space-y-6">
                               <textarea 
                                   value={text} 
                                   onChange={e => setText(e.target.value)}
                                   className='w-full min-h-[200px] resize-none p-[20px]'
                                   
                               />
                           </div>
                           {/* Modal footer */}
                           <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                               <button 
                                   data-modal-hide="staticModal" 
                                   type="button" 
                                   onClick={handleSave}
                                   className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                               <button 
                                   data-modal-hide="staticModal" 
                                   type="button" 
                                   onClick={() => setModalOpen(false)}
                                   className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                           </div>
                       </div>
                   </div>
               </div>  
            }
            {
                state.posts.map(item => (
                    <div key={item._id}>{item.text}</div>
                ))
            }
        </div>
     );
}

export default Posts;