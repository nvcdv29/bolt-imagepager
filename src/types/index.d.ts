interface ImageNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: ImageNode[];
}