import { useState } from 'react';

export default function LoginModal({ onClose, onConfirm }) {
  const [code, setCode] = useState('');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-80 p-6 ring-1 ring-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Admin Login
        </h2>

        <input
          type="password"
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder="Enter code"
          autoComplete="off"         /* stops browser from remembering */
          className="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(code)}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
