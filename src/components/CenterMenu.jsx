import React from 'react'
function CenterMenu() {
    const liStyle = "mr-[3rem] hover:cursor-pointer"
  return (
    <div className="menu flex">
        <ul className='flex w-[100%] justify-between'>
           
            <li className={liStyle}><a href={'http://localhost:3001/home'}>Home</a></li>
            <li className={liStyle}><a href={'#about'}>About</a></li>
            <li className={liStyle}><a href={'#info'}>Info</a></li>
        </ul>
    </div>
    )
}

export default CenterMenu