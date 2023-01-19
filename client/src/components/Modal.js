function Modal({title, closeModal, textAreaValue, textAreaOnChange, savePost, handleImageChange, img}) {

    // const handleImageChange = e => {
    //     console.log(e.currentTarget.files[0])
    // }

    return (  
        <div id="staticModal"  tabIndex="-1" aria-hidden="true" className="fixed
        top-0 left-[29%] w-full p-4 overflow-x-hidden overflow-y-auto h-modal md:h-full ">
           <div className="relative w-full h-full max-w-2xl md:h-auto ">
               <div className="relative rounded-lg shadow dark:bg-gray-700 bg-slate-300">
                   {/* Modal header */}
                   <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                       <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                           {title}
                       </h3>
                       <button 
                           type="button" 
                           onClick={closeModal}
                           className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                       </button>
                   </div>
                   {/* Modal body */}
                   <div className="p-6 space-y-6">
                       <textarea 
                           value={textAreaValue} 
                           onChange={textAreaOnChange}
                           className='w-full min-h-[200px] resize-none p-[20px]'
                           
                       />
                        {
                            img && <img className='w-full h-[200px] object-cover' src={img} alt=''/>
                        }
                        <div className="w-full">
                            <label
                                className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                                <span className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <span className="font-medium text-blue-600 underline ">
                                    select an image to the post    
                                    </span>
                                </span>
                                <input type="file" name="file_upload" className="hidden" onChange={handleImageChange}/>
                            </label>
                        </div>

                   </div>
                   {/* Modal footer */}
                   <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                       <button 
                           data-modal-hide="staticModal" 
                           type="button" 
                           onClick={savePost}
                           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                       <button 
                           data-modal-hide="staticModal" 
                           type="button" 
                           onClick={closeModal}
                           className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                   </div>
               </div>
           </div>
       </div>  
    );
}

export default Modal;