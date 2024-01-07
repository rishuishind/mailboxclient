import React, { useRef } from 'react'
import { Editor } from "react-draft-wysiwyg";
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const MailHome = () => {
    const recieverEmailRef = useRef();
    const subjectRef = useRef();
    return (
        <div className=' ml-10'>
            <div className='grid grid-cols-8 gap-4 p-2'>
                <label className=' col-span-1 text-right' htmlFor="reciever">To</label>
                <input className=' w-full col-span-7 p-1 border' ref={recieverEmailRef} type="email" placeholder='reciever email' />
            </div>
            <div className='grid grid-cols-8 gap-4 p-2'>
                <label className=' col-span-1 text-right' htmlFor="subject">Subject</label>
                <input ref={subjectRef} className='w-full col-span-7 p-1 border' type="text" />
            </div>
            <div className='grid grid-cols-8'>
                <div className='col-span-1'>
                </div>
                <div className='col-span-7 border h-96 border-black'>
                    <Editor
                    />;
                </div>
            </div>
            <div>
                <button className=' absolute bg-blue-700 text-white p-1 rounded-md px-4 left-64 bottom-10'>Send</button>
            </div>
        </div>
    )
}

export default MailHome