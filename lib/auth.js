'use client';

import { toast } from 'react-toastify';

export async function login(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');

    if (!username || !password) {
        toast.error('Username and password are required');
        return;
    }

    try {
        const res = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: username, password })
        });

        if (!res.ok) {
            toast.error('Wrong username or password');
            return;
        }

        const tokens = await res.json();
        const backend = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tokens)
        });

        if (!backend.ok) {
            toast.error('Server session failed');
            return;
        }

        toast.success('Login successful');
        window.location.href = '/';
    } catch (err) {
        toast.error('Login failed');
        console.error(err);
    }
}


export async function logout() {
    const backend = await fetch('/api/logout', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    console.log(backend)

    if (!backend.ok) {
        toast.error('Server session failed');
        window.location.href = '/';
        return;
    }

    toast.success('Successfully logged out');
    window.location.href = '/authentication/sign-in';
}
