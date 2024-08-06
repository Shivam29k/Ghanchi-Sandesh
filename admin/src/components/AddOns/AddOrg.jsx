import React from 'react'
import OrgForm from './OrgForm'
import Navbar from '../Navbar'

function AddOrg() {
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
            <h2 className='text-lg text-center font-semibold py-4'>Add New Social Organization</h2>
            <div className='w-[100vw] flex justify-center'>
                <OrgForm />
            </div>
        </div>
    )
}

export default AddOrg