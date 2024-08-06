import React from 'react'
import Navbar from '../components/Navbar'
import SocialServices from '../components/AddOns/SocialServices'
import SocialOrgs from '../components/AddOns/SocialOrgs'

function AddOns() {
  const [loading, setLoading] = React.useState(false)
  const [page, setPage] = React.useState(1)
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
      <div className='flex w-full justify-center'>
        <Button title={"सामाजिक सेवाएं"} OnClick={() => setPage(1)} />
        <Button title={"सामाजिक संस्थाएँ"} OnClick={() => setPage(2)} />
      </div>
      {page === 1 && <SocialServices />}
      {page === 2 && <SocialOrgs />}
    </div>
  )
}

function Button({ title, OnClick }) {
  return (
    <button onClick={OnClick} className='font-bold bg-pink-400 rounded-md p-4 py-2 m-2'>
      {title}
    </button>
  )
}

export default AddOns