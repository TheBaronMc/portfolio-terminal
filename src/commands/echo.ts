import type { ReadableFileI, WritableFileI } from '@/filesystem/file';
import { type Command, type Context } from './command';

function execute(
  ctx: Context,
  _stdin: ReadableFileI,
  stdout: WritableFileI,
  _stderr: WritableFileI,
  params: string[],
): Context {
  const value: string = params[0] || '';

  stdout.write(value);

  return { ...ctx, last_exit_code: 0 };
}

export const echo: Command = {
  name: 'echo',
  execute,
};
