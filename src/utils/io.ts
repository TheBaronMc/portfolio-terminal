import { formatTextToHTML } from './format';
import { File } from '@/filesystem/file';

export const stdin = new File('');
export const stdout = new File('');
export const stderr = new File('');

export function display(text: string): void {
  formatTextToHTML(text).forEach((element) => {
    document.getElementById('output')?.appendChild(element);
  });
}
