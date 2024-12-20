import React, { useEffect, useState } from 'react';
import { TableOfContents } from './components/TableOfContents';
import { Section } from './components/Section';
import { fetchGalleryStructure } from './api/gallery';
import { ImageFolder } from 'lucide-react';
import type { ImageNode } from './types/gallery';

function App() {
  const [structure, setStructure] = useState<ImageNode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStructure() {
      try {
        const data = await fetchGalleryStructure();
        setStructure(data);
      } catch (error) {
        console.error('Error loading gallery structure:', error);
      } finally {
        setLoading(false);
      }
    }

    loadStructure();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading gallery...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2">
            <ImageFolder className="w-6 h-6 text-indigo-600" />
            <h1 className="text-xl font-bold text-gray-900">
              Dynamic Image Gallery
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <TableOfContents structure={structure} />
          </aside>
          <div className="lg:col-span-3">
            {structure.map(node => (
              <Section key={node.path} node={node} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;