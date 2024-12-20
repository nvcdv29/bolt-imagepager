import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { ImageNode } from '../types/gallery';

interface TOCProps {
  structure: ImageNode[];
}

export function TableOfContents({ structure }: TOCProps) {
  const [isOpen, setIsOpen] = useState(true);

  const renderTOCItem = (item: ImageNode, level = 0) => {
    if (item.type === 'directory') {
      return (
        <div key={item.path} className="ml-4">
          <a
            href={`#${item.path}`}
            className="text-gray-700 hover:text-gray-900 block py-1"
          >
            {item.name}
          </a>
          {item.children?.map(child => renderTOCItem(child, level + 1))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sticky top-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-lg font-semibold mb-2"
      >
        Table of Contents
        {isOpen ? (
          <ChevronDown className="w-5 h-5" />
        ) : (
          <ChevronRight className="w-5 h-5" />
        )}
      </button>
      {isOpen && (
        <div className="mt-2 border-t pt-2">
          {structure.map(item => renderTOCItem(item))}
        </div>
      )}
    </div>
  );
}