import React from 'react';

export default function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F5F5DC]">
            <div className="flex flex-col items-center">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4"></div>
                <h2 className="text-center text-2xl font-semibold text-gray-700">Загрузка...</h2>
                <p className="text-center text-gray-500">Пожалуйста, подождите</p>
            </div>
        </div>
    );
}
