import { type Command, type Context } from './command';
import type { ReadableFileI, WritableFileI } from '@/filesystem/file';

function execute(
  ctx: Context,
  _stdin: ReadableFileI,
  stdout: WritableFileI,
  _stderr: WritableFileI,
  _params: string[],
): Context {
  stdout.write(
    '\\033[redm######################## \\033[#E6A439mSKILLS\\033[m ########################\\033[m\n\
\\033[redm+\\033[m \\033[#03978Amskill_1\\033[m \\033[redm:\\033[m \n\
  \\033[redm+\\033[m \\033[#E6A439mDescription\\033[m \\033[redm:\\033[m some description \n\
  \\033[redm+\\033[m \\033[#E6A439mExamples\\033[m    \\033[redm:\\033[m \n\
    \\033[redm+\\033[m link_1 \n\
    \\033[redm+\\033[m link_2 \n\
\\033[#E6A439m--------------------------------------------------------\\033[m \n\
\\033[redm+\\033[m \\033[#03978Amskill_2\\033[m \\033[redm:\\033[m \n\
  \\033[redm+\\033[m \\033[#E6A439mDescription\\033[m \\033[redm:\\033[m some description \n\
  \\033[redm+\\033[m \\033[#E6A439mExample\\033[m     \\033[redm:\\033[m link             \n\
\\033[#E6A439m--------------------------------------------------------\\033[m \n\
\\033[redm+\\033[m \\033[#03978Amskill_3\\033[m \\033[redm:\\033[m                                              \n\
  \\033[redm+\\033[m \\033[#E6A439mDescription\\033[m \\033[redm:\\033[m some description                       \n\
\\033[redm########################################################\\033[m \n',
  );

  return { ...ctx, last_exit_code: 0 };
}

export const skill: Command = {
  name: 'skill.sh',
  execute,
};
