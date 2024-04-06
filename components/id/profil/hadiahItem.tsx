import React from 'react'
import ImageIcon from '@mui/icons-material/Image';

export default function HadiahItem() {
  return (
    <div className='flex flex-row items-center rounded-lg shadow-2xl my-4 p-4 gap-5'>
      <ImageIcon sx={{ fontSize: 100}}/>
      <div className='flex flex-col gap-2 w-2/3 mr-6'>
        <h1 className='font-bold text-2xl'>Lorem ipsum dolor sit amet consectetur.</h1>
        <p className='text-2xl'>Point penukaran: 90</p>
      </div>
      <button
        className="
            btn btn-primary
            rounded-lg 
            focus:outline-none
            text-white font-bold text-xs lg:text-md xl:text-xl"
      >
        Tukar
      </button>
    </div>
  )
}
