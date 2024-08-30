import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AuthProvider from './context/AuthContext.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage';
import PostDetail from './pages/PostDetailPage';
import CreatePostPage from './pages/CreatePostPage';
import UpdatePostPage from './pages/UpdatePostPage';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/post/:id' element={<PostDetail />} />
          <Route path='/post/new' element={<CreatePostPage />} />
          <Route path='/post/update/:id' element={<UpdatePostPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
