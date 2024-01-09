import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

const Inbox = () => {
    const param = useParams();
    const allMails = useSelector(state => state.mail.myMails);
    const myMail = allMails.find((mail) => (mail.id === param.id))
    console.log(param.id);

    return (
        <div className='flex justify-center items-center h-screen border border-red-700 -translate-x-0 -translate-y-0 text-ellipsis text-wrap'>
            <div className='border grid grid-cols-6'>
                <div className='col-span-1 flex flex-col'>
                    <span className=' font-bold text-lg'>Sender:</span>
                    <span>
                        {myMail.senderEmail}
                    </span>
                </div>
                <div className='col-span-1 flex flex-col'>
                    <span className=' font-bold text-lg'>Subject:</span>
                    <span>
                        {myMail.subject}
                    </span>
                </div>
                <div className='col-span-4 flex flex-col'>
                    <span className=' font-bold text-lg'>Message:</span>
                    <span dangerouslySetInnerHTML={{ __html: myMail.message }} />
                </div>
            </div>
        </div>
    )
}

export default Inbox