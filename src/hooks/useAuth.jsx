import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function useAuth() {
    const auth = useContext(AuthContext);

    return auth;
}
