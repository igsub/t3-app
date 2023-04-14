import Link from 'next/link'
import React from 'react'

const NavigationButton = () => {
  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow-md bg-base-300 rounded-box w-52">
        <li><Link href={"/"}>Homepage</Link></li>
        <li><Link href={"/marketing"}>Marketing</Link></li>
      </ul>
    </div>
  )
}

export default NavigationButton