import React, { useState } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

const Register = () => {
    const [form, setForm] = useState({
        student_name: '',
        email: '',
        phone_number: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const res = await fetch(`${API_BASE_URL}/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (res.ok) {
                setMessage('Registration successful! You can now log in.');
                setForm({ student_name: '', email: '', phone_number: '', password: '' });
            } else {
                setError(data.error || 'Registration failed');
            }
        } catch (err) {
            setError('Network error');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-center mb-2">Student Registration</h2>
                <input
                    type="text"
                    name="student_name"
                    placeholder="Full Name"
                    value={form.student_name}
                    onChange={handleChange}
                    required
                    className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={form.phone_number}
                    onChange={handleChange}
                    required
                    className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button type="submit" className="bg-blue-700 text-white font-bold py-2 rounded hover:bg-blue-800 transition-colors w-full">Register</button>
                {message && <div className="text-green-600 text-center text-sm">{message}</div>}
                {error && <div className="text-red-600 text-center text-sm">{error}</div>}
            </form>
        </div>
    );
};

export default Register;