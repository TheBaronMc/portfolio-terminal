import type { Directory } from '@/filesystem/directory';
import type { ReadableFileI, WritableFileI } from '@/filesystem/file';

export type Context = {
  working_directory: Directory;
  username: string;
  last_exit_code: IntRange<0, 255>;
};

export type Command = {
  name: string;
  execute: (
    ctx: Context,
    stdin: ReadableFileI,
    stdout: WritableFileI,
    stderr: WritableFileI,
    params: string[],
  ) => Context;
};
