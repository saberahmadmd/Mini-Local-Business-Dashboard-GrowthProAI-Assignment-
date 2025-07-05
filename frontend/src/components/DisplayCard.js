import React from 'react';

const DisplayCard = ({ data, onRegenerate, isRegenerating }) => {
  if (!data) return null;

  return (
    <div className="bg-white p-4 rounded shadow-md mt-6 max-w-md mx-auto">
      <p className="text-xl font-semibold">Rating: {data.rating}</p>
      <p className="text-md text-gray-700">Reviews: {data.reviews}</p>
      <p className="italic mt-2 text-gray-800">"{data.headline}"</p>
      <button
        onClick={onRegenerate}
        disabled={isRegenerating}
        className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:bg-gray-400"
      >
        {isRegenerating ? 'Regenerating...' : 'Regenerate SEO Headline'}
      </button>
    </div>
  );
};

export default DisplayCard;
