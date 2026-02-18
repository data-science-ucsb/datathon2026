import React from 'react';

interface PendingItemsProps {
  applicationCompleted: boolean;
  onCompleteApplication: () => void;
}

const PendingItems: React.FC<PendingItemsProps> = ({ applicationCompleted, onCompleteApplication }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Pending Items</h2>
      {!applicationCompleted ? (
        <div className="flex items-center justify-between p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-yellow-400">Incomplete Application</p>
              <p className="text-sm text-gray-400">Please complete your registration to attend the event</p>
            </div>
          </div>
          <button
            onClick={onCompleteApplication}
            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-medium transition"
          >
            Complete Now
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
          <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-green-400">All Caught Up!</p>
            <p className="text-sm text-gray-400">No pending items at the moment</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingItems;