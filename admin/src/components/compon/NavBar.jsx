import React from 'react'
import { logo, profile } from "../../assets";
import {Link} from "react-router-dom"


const NavBar = () => {
  return (
    <div className='max-padd-container flexBetween justify-between items-center py-4 '>
        <h1 className='font-bold text-2xl font-monserat'>Yab store</h1>
        <img src={profile} alt="profile image" height={46} width={46 } className='rounded-full'/>
    </div>
  )
}

export default NavBar
