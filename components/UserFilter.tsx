import { UserIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface User {
  id: number;
  name: string;
}

interface UserFilterProps {
  users: User[];
  selectedUserId: number | null;
  onUserChange: (userId: number | null) => void;
}

export default function UserFilter({ users, selectedUserId, onUserChange }: UserFilterProps) {
  return (
    <div className="mb-6">
      <label htmlFor="user-filter" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
        <UserIcon className="h-4 w-4" />
        Filter by Author:
      </label>
      <div className="relative max-w-xs">
        <select
          id="user-filter"
          value={selectedUserId || ""}
          onChange={(e) => onUserChange(e.target.value ? Number(e.target.value) : null)}
          className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium cursor-pointer appearance-none"
        >
          <option value="" className="text-gray-900 font-medium">All Authors</option>
          {users.map((user) => (
            <option key={user.id} value={user.id} className="text-gray-900 font-medium">
              {user.name}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDownIcon className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
