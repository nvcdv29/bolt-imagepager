import React from 'react';
import type { ImageNode } from '../types/gallery';

interface ImageGridProps {
  images: ImageNode[];
}

export function ImageGrid({ images }: ImageGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map(image => (
        <div
          key={image.path}
          className="relative aspect-auto overflow-hidden rounded-lg"
        >
          <img
            src={`/${image.path}`}
            alt={image.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}