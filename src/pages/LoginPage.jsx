import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Header from '../components/Header';
import { AuthContext }  from '../context/AuthContext';
import useAuth from '../hooks/useAuth';

export default function LoginPage() {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { auth } = useAuth();
    

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/login', { login, password });
            const { token } = response.data;
            auth(token);
            navigate('/', { replace: true });
        } catch (error) {
            setError(error.response.data.message);
        }
    };


    return (
        <>
            <Header />
            <body class=" flex items-center justify-center min-h-screen">
                <div class="shadow-lg rounded-lg max-w-sm w-full p-8">
                    <h1 class="text-3xl font-bold text-black mb-6 text-center">Вход</h1>
                    <form>
                        <div class="mb-4">
                            <label for="login" class="block text-gray-700 font-medium mb-2">Логин</label>
                            <input type="text" id="login" class="w-full  border-gray-300 bg-[#F5F5DC] border-b-2 focus:outline-none p-2"
                                placeholder="Введите логин" value={login} onChange={(e) => setLogin(e.target.value)} required />
                        </div>
                        <div class="mb-4">
                            <label for="password" class="block text-gray-700 font-medium mb-2">Пароль</label>
                            <input type="password" id="password" class="w-full  border-gray-300 bg-[#F5F5DC] border-b-2 focus:outline-none p-2"
                                placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        {error && <div class='text-red-600 mb-2'>{error}</div>}
                        <button onClick={handleClick} type="submit" class="w-full bg-black text-white py-3 rounded-2xl hover:bg-gray-600 transition duration-300 mt-8">Отправить</button>
                    </form>
                    {/*  <div class="mt-4 text-center">
                    <a href="#" class="text-blue-600 hover:underline">Forgot your password?</a>
                </div> */}
                </div>
            </body>
        </>
    )
}
