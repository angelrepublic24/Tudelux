import { Menu } from '@headlessui/react';
import { FaEllipsisV } from 'react-icons/fa';

export function ActionMenu({ onView, onEdit, onDelete }: {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="text-gray-600 hover:text-black">
        <FaEllipsisV />
      </Menu.Button>

      <Menu.Items className="fixed  right-0 mt-2 w-40 bg-white rounded-md shadow-lg border text-sm z-50">
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={onView}
              className={`block px-4 py-2 w-full text-left ${active ? 'bg-gray-100' : ''}`}
            >
              View
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={onEdit}
              className={`block px-4 py-2 w-full text-left ${active ? 'bg-gray-100' : ''}`}
            >
              Edit
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={onDelete}
              className={`block px-4 py-2 w-full text-left text-red-500 ${active ? 'bg-gray-100' : ''}`}
            >
              Delete
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
