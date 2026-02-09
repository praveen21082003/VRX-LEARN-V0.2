import React from 'react'
import BackButton from "@/components/navigation/BackButton";



function FeedbackPage() {
  return (
    <>
    <BackButton to=".." />
    <iframe className='h-screen w-full' src='https://docs.google.com/forms/d/e/1FAIpQLScHlqoi41zxltXwZsP61lkaDsK0qAd_vnuU0QI4OXV7ReWgPA/viewform?usp=publish-editor' />
    </>


  )
}

export default FeedbackPage
