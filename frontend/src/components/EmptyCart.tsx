import { FC } from "react";

export const EmptyCart: FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[70vh] w-full">
          <div className="relative w-64 h-64 mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-48 h-48 text-gray-300 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 bg-white rounded-full opacity-30"></div>
            </div>
          </div>
  
          <h2 className="text-3xl font-bold text-gray-700 mb-4" data-testid="empty">Ваша корзина пуста</h2>
          <p className="text-lg text-gray-500 mb-8 text-center max-w-md">
            Начните покупки, чтобы заполнить её товарами!
          </p>
  
          <a
            href="/"
            className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Перейти к покупкам
          </a>
  
          <div className="mt-12 flex space-x-4 opacity-50">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
              >
                <svg
                  className="w-8 h-8 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>
      );
}