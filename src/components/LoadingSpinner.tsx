import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-[#00be00] border-t-transparent" />
  );
};