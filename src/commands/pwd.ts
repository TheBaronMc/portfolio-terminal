import type { ReadableFileI, WritableFileI } from '@/filesystem/file';
import { type Command, type Context } from './command';
import { getPath } from '@/filesystem/inode';

function execute(
  ctx: Context,
  _stdin: ReadableFileI,
  stdout: WritableFileI,
  _stderr: WritableFileI,
  _params: string[],
): Context {
  stdout.write(getPath(ctx.working_directory));

  return { ...ctx, last_exit_code: 0 };
}

export const pwd: Command = {
  name: 'pwd',
  execute,
};
