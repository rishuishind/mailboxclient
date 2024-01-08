import React, { useRef, useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import toast from 'react-hot-toast';

const MailHome = () => {

    const recieverEmailRef = useRef();
    const subjectRef = useRef();

    const [text, setText] = useState('');

    const handleChange = (e) => {
        setText(e);
    }

    const handleSend = () => {
        const handleFetch = async () => {
            const recieverEmail = recieverEmailRef.current.value.split('@')[0];
            const response = await fetch(`https://react-http-96a9c-default-rtdb.firebaseio.com/mailbox-sent${recieverEmail}.json`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        senderEmail: localStorage.getItem('senderEmail'),
                        recieverEmail: recieverEmailRef.current.value,
                        subject: subjectRef.current.value,
                        message: text.blocks[0].text
                    })
                }
            );
            if (!response.ok) {
                toast.error('Message Not sent');
                throw new Error('Authentication Failed');
            }
            toast.success('Email sent successfully');
            recieverEmailRef.current.value = '';
            subjectRef.current.value = '';
        }
        handleFetch();

        const checking = async () => {
            const ch = await fetch('https://react-http-96a9c-default-rtdb.firebaseio.com/mailbox-sent.json');
            const data = await ch.json();
            console.log(data);
        }
        checking();
    }

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
                        value={text}
                        onChange={handleChange}
                    />;
                </div>
            </div>
            <div>
                <button onClick={handleSend} className=' absolute bg-blue-700 text-white p-1 rounded-md px-4 left-64 bottom-10'>Send</button>
            </div>
        </div>
    )
}

export default MailHome