import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../layout/navbar/Navbar'
import Footer from '../layout/footer/Footer'

const MainLayout = () => {
  return (
    <>
    <div className='main-layout-container'>
      <Navbar />
        <div className='content-grow'>
            <Outlet />
        </div>
      <Footer />
    </div>
    </>
  )
}

export default MainLayout