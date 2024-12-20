import React from 'react';
import { ImageGrid } from './ImageGrid';
import type { ImageNode } from '../types/gallery';

interface SectionProps {
  node: ImageNode;
  level?: number;
}

export function Section({ node, level = 2 }: SectionProps) {
  const HeadingTag = `h${Math.min(level, 6)}` as keyof JSX.IntrinsicElements;
  const images = node.children?.filter(child => child.type === 'file') || [];
  const directories = node.children?.filter(child => child.type === 'directory') || [];

  return (
    <section id={node.path} className="mb-12">
      <HeadingTag className="text-2xl font-bold mb-6 text-gray-800">
        {node.name}
      </HeadingTag>
      {images.length > 0 && <ImageGrid images={images} />}
      {directories.map(dir => (
        <Section key={dir.path} node={dir} level={level + 1} />
      ))}
    </section>
  );
}