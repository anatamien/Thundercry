import React from 'react';

function MenuButton({ hieroglyph, title, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`menu-hieroglyph ${active ? 'active' : ''} group relative`}
      title={title}
    >
      {hieroglyph}
      
      {/* Hover tooltip */}
      <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 bg-gray-900 text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        {title}
      </div>
    </button>
  );
}

window.MenuButton = MenuButton;