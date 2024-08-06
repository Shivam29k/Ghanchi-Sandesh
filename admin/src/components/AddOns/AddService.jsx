import React from 'react'
import Navbar from '../Navbar'
import ServiceForm from './ServiceForm'

function AddService() {
    return (
        <div>
            <Navbar
                blogTo="/"
                blogTitle="All Posts"
                articleTo="/articles"
                articleTitle="All Articles"
                videoTo="/all-video"
                videoTitle="All Videos"
                pdfTo='/pdfs'
                pdfTitle='All Pdfs'
            />
            <h2 className='text-lg text-center font-semibold py-4'>Add New Social Service</h2>
            <div className='w-[100vw] flex justify-center'>
                <ServiceForm />
            </div>
        </div>
    )
}

export default AddService