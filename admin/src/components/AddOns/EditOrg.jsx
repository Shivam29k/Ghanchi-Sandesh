import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import OrgForm from './OrgForm';

function EditOrg() {
  const { id } = useParams();

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
      <h1 className='text-center text-xl font-semibold py-4'>Edit Organization</h1>
      <div className='flex w-[100vw] justify-center pb-8'>
      <OrgForm updateId={id} />
      </div>
    </div>
  );
}

export default EditOrg;