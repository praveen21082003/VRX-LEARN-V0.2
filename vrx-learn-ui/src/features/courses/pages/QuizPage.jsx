import React from 'react'
import BackButton from "@/components/navigation/BackButton";


function QuizPage() {
  return (
    <>
      <BackButton to=".." />
      <div className='h-screen flex justify-center items-center'>

        No Quiz yet
      </div>
    </>
  )
}

export default QuizPage
