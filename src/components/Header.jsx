import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightEndOnRectangleIcon, UserPlusIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import useAuth from '../hooks/useAuth';

export default function Header() {
  const { logout, user } = useAuth();

  const handleClick = (e) => {
    e.preventDefault();
    logout();
  }

  return (
    <header class='p-4 flex justify-between items-center border-b-2 border-black'>
      <Link to='/'><h1 class="text-5xl font-bold">Blog</h1></Link>
      <nav className='flex items-center'>
        {user.isLogged ? (
          <>
              <ArrowRightStartOnRectangleIcon className='h-7 w-7' />
              <Link class=' text-black  font-bold text-xl px-4 hover:border-b-2 border-gray-800 pb-1' type='submit' onClick={handleClick}>Выйти</Link>
          </>
        ) : (
          <>
            <div className='flex items-center space-x-2'>
              <UserPlusIcon className='h-7 w-7' />
              <Link to='/register' className='font-bold text-xl  hover:text-gray-600 hover:border-b-2 border-gray-800 pb-1'>
                Регистрация
              </Link>
            </div>
            <div className='flex items-center space-x-2'>
              <ArrowRightEndOnRectangleIcon className='ml-14 h-7 w-7' />
              <Link to='/login' className='font-bold text-xl  hover:text-gray-600 hover:border-b-2 border-gray-800 pb-1'>
                Войти
              </Link>
            </div>
          </>
        )}
      </nav>
    </header>
  )
}
