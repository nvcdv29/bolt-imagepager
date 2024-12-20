import { readdir, stat } from 'fs/promises';
import { join, relative } from 'path';

interface ImageNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: ImageNode[];
}

export async function scanDirectory(dir: string): Promise<ImageNode[]> {
  const items = await readdir(dir);
  const nodes: ImageNode[] = [];

  for (const item of items) {
    const path = join(dir, item);
    const stats = await stat(path);
    const relativePath = relative('src', path);

    if (stats.isDirectory()) {
      const children = await scanDirectory(path);
      nodes.push({
        name: item,
        path: relativePath,
        type: 'directory',
        children,
      });
    } else if (isImageFile(item)) {
      nodes.push({
        name: item,
        path: relativePath,
        type: 'file',
      });
    }
  }

  return nodes;
}

function isImageFile(filename: string): boolean {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  return imageExtensions.some(ext => filename.toLowerCase().endsWith(ext));
}