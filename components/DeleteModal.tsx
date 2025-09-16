"use client";

import { XMarkIcon, TrashIcon, ExclamationCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onRetry?: () => void;
  postTitle: string;
  error?: string;
  isDeleting?: boolean;
}

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  onRetry,
  postTitle,
  error,
  isDeleting = false
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-lg shadow-2xl border-2 border-gray-400 p-6 max-w-md w-full mx-4">
        <div className="flex items-center gap-2 mb-4">
          {error ? (
            <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
          ) : (
            <TrashIcon className="h-6 w-6 text-red-500" />
          )}
          <h3 className="text-lg font-semibold text-gray-900">
            {error ? "Delete Failed" : "Confirm Delete"}
          </h3>
        </div>

        {error ? (
          <div>
            <p className="text-red-600 mb-6">
              Failed to delete the post "{postTitle}". {error}
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="flex items-center gap-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-200 cursor-pointer"
              >
                <XMarkIcon className="h-4 w-4" />
                Close
              </button>
              {onRetry && (
                <button
                  onClick={onRetry}
                  disabled={isDeleting}
                  className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
                >
                  <ArrowPathIcon className="h-4 w-4" />
                  {isDeleting ? "Retrying..." : "Try Again"}
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the post "{postTitle}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="flex items-center gap-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-200 cursor-pointer"
              >
                <XMarkIcon className="h-4 w-4" />
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={isDeleting}
                className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
              >
                <TrashIcon className="h-4 w-4" />
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
