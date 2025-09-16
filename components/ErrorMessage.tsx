"use client";

import { ExclamationCircleIcon, XMarkIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
  onRetry?: () => void;
  showRetry?: boolean;
}

export default function ErrorMessage({ message, onClose, onRetry, showRetry = false }: ErrorMessageProps) {
  return (
    <>
      <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationCircleIcon className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm text-red-800">{message}</p>


          </div>
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                onClick={onClose}
                className="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div> {showRetry && onRetry && (<div className="mt-4 flex justify-center">
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
        >
          <ArrowPathIcon className="h-4 w-4" />
          Try Again
        </button>
      </div>)}</>
  );
}
