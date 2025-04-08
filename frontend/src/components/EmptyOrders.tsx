import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import EmptyCartIcon from "../assets/no-order.png";

export const EmptyOrders: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-md text-center">
        <div className="animate-bounce mb-8">
          <div className=" text-indigo-400 mx-auto" />
            <img src={EmptyCartIcon} alt="" className='w-32 h-32'/>
            </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          У вас пока нет заказов
        </h2>
        
        <p className="text-lg text-gray-600 mb-8">
          Начните покупки и откройте для себя наш ассортимент. 
        </p>
        
        <button
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          Перейти к покупкам
        </button>
        
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
};