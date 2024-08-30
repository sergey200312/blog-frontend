import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';


export default function RegisterPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [error, setError] = useState('');

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/register', { username, email, password, repassword })
            console.log(response);
            navigate('/login', { replace: true });
        } catch (error) {
            setError(error.response.data.message);
        }

    }
    return (
        <>
            <Header />
            <body class="flex items-center justify-center min-h-screen">
                <div class="shadow-2xl rounded-lg max-w-sm w-full p-8">
                    <h1 class="text-3xl font-bold text-black mb-6 text-center">Регистрация</h1>
                    <form>
                        <div class="mb-4">
                            <label for="username" class="block text-gray-700 font-medium mb-2">Username</label>
                            <input type="text" id="username" class="w-full  bg-[#F5F5DC] border-b-2 border-gray-300  focus:outline-none  p-2"
                                placeholder="Введите username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div class="mb-4">
                            <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
                            <input type="text" id="email" class="w-full bg-[#F5F5DC] border-b-2 border-gray-300  focus:outline-none 0  p-2"
                                placeholder="example@mail.ru" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div class="mb-4">
                            <label for="password" class="block text-gray-700 font-medium mb-2">Пароль</label>
                            <input type="password" id="password" class="w-full bg-[#F5F5DC] border-b-2 border-gray-300  focus:outline-none  p-2"
                                placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div class="mb-4">
                            <label for="re-password" class="block text-gray-700 font-medium mb-2">Пароль</label>
                            <input type="password" id="re-password" class="w-full bg-[#F5F5DC] border-b-2 border-gray-300  focus:outline-none  p-2"
                                placeholder="Повторите пароль" value={repassword} onChange={(e) => setRepassword(e.target.value)} required />
                        </div>
                        {error && <div class='text-red-600 mb-2'>{error}</div>}
                        <button onClick={handleClick} type="submit" class="w-full bg-black text-white py-3 rounded-2xl hover:bg-gray-600 transition duration-300 mt-8">Отправить</button>
                    </form>
                </div>
            </body>
        </>
    )
}
