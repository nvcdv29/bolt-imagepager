import type { ImageNode } from '../types/gallery';

export async function fetchGalleryStructure(): Promise<ImageNode[]> {
  // In a real implementation, this would fetch from a server API
  // For now, return mock data for demonstration
  return [
    {
      name: "Sample Gallery",
      path: "sample",
      type: "directory",
      children: [
        {
          name: "Nature",
          path: "sample/nature",
          type: "directory",
          children: [
            {
              name: "Mountains",
              path: "sample/nature/mountains.jpg",
              type: "file"
            }
          ]
        }
      ]
    }
  ];
}