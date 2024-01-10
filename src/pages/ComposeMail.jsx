import React, { useEffect, useRef, useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import toast from 'react-hot-toast';
import { convertToHTML } from 'draft-convert';

const ComposeMail = () => {

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const [convertedContent, setConvertedContent] = useState(null);

    useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(html);
    }, [editorState]);

    const recieverEmailRef = useRef();
    const subjectRef = useRef();

    const handleSend = async () => {

        try {
            const handleFetch = async () => {
                if (!recieverEmailRef.current.value || !subjectRef.current.value) {
                    toast.error('Enter valid credentials first');
                    return;
                }
                if (recieverEmailRef.current.value === localStorage.getItem('senderEmail')) {
                    toast.error("Can't send email to your own ID");
                    return;
                }
                const response = await fetch(`https://react-http-96a9c-default-rtdb.firebaseio.com/mailbox-sent.json`,
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            senderEmail: localStorage.getItem('senderEmail'),
                            recieverEmail: recieverEmailRef.current.value,
                            subject: subjectRef.current.value,
                            message: convertedContent,
                            isRead: false
                        })
                    }
                );
                if (!response.ok) {
                    toast.error('Message Not sent');
                    throw new Error('Authentication Failed');
                }
                const data = await response.json();
                const editedResponse = await fetch(`https://react-http-96a9c-default-rtdb.firebaseio.com/mailbox-sent/${data.name}.json`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        senderEmail: localStorage.getItem('senderEmail'),
                        recieverEmail: recieverEmailRef.current.value,
                        subject: subjectRef.current.value,
                        message: convertedContent,
                        isRead: false,
                        id: data.name
                    })
                });
                if (!editedResponse.ok) {
                    console.log(false);
                    throw new Error('failed to edit the response')
                }
                toast.success('Email sent successfully');
                recieverEmailRef.current.value = '';
                subjectRef.current.value = '';
                setEditorState(EditorState.createEmpty());
            }
            await handleFetch();
        }
        catch (error) {
            console.log(error);
            toast.error('Error occured while sending')
        }
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
                <div className='col-span-7 border border-black z-0'>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                    />
                </div>
            </div>
            <div>
                <button onClick={handleSend} className=' z-10 absolute bg-blue-700 text-white p-1 rounded-md px-4 left-40 top-52'>Send</button>
            </div>
        </div>
    )
}

export default ComposeMail