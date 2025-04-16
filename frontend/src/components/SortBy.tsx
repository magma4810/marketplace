import { FC } from "react";

type SortButtonProps = {
    active: boolean;
    direction?: 'asc' | 'desc';
    onClick: () => void;
    children: React.ReactNode;
}

export const SortBy: FC<SortButtonProps> = ({ 
    active, 
    direction, 
    onClick, 
    children 
}) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-lg transition-colors ${
            active ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
        }`}
    >
        {children}
        {active && (
            <span className="ml-2" data-testid="direction">
                {direction === 'asc' ? '↑' : '↓'}
            </span>
        )}
    </button>
);