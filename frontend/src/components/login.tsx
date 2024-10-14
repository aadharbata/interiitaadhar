import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function LoginComponent() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');

    const validateEmail = (email: string) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleEmailChange = (e: any) => {
        const value = e.currentTarget.value;
        setEmail(value);
        if (!validateEmail(value)) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
        }
    };

    const HandleSignIn = async (data: { email: string, password: string }) => {
        const response = await axios.post(`${apiUrl}/user/signin`, data);
        localStorage.setItem("token", response.data.token);
        console.log(response.data.token);
        navigate(`/`);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (validateEmail(email)) {
            const data = { email: email, password: password };
            HandleSignIn(data);
        } else {
            setEmailError('Please enter a valid email address.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-md w-full p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome Back!</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="loginEmail"
                            type="email"
                            placeholder="you@example.com"
                            onChange={handleEmailChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                    </div>
                    <div>
                        <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="loginPassword"
                            type="password"
                            required
                            onChange={(e) => setPassword(e.currentTarget.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <button
                        className="w-full bg-gradient-to-r from-purple-500 to-red-600 hover:from-blue-600 hover:to-pink-700 text-white font-semibold py-2 rounded flex items-center justify-center"
                        type="submit">
                        Log In
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a href="/user/signup" className="text-blue-500 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
