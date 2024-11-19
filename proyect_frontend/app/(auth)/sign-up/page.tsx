"use client";

import RegisterForm from '@/components/forms/RegisterForm';

export default function SignUp() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Regístrate</h1>
            <RegisterForm onSubmit={(values) => console.log(values)} />
        </div>
    );
}