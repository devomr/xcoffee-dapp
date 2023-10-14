import type { PropsWithChildren, MouseEvent } from 'react';
import { WithClassnameType } from 'types';

interface TabProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const Tab: React.FC<TabProps> = ({ id, label, isActive, onClick }) => (
  <button
    id={id}
    onClick={onClick}
    className={`border-t-2 border-transparent px-4 py-2 ${isActive
      ? 'text-blue-500 border-blue-500'
      : 'text-gray-600 hover:text-gray-800'
      }`}
  >
    {label}
  </button>
);

