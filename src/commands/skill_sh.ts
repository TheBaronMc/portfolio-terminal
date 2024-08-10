import { write } from '@/utils/io';
import { type Command } from './command';

function execute(stdout: WritableStream, _params: string[]): number {
  write(
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
    stdout,
  );

  return 0;
}

export const skill: Command = {
  name: 'skill.sh',
  execute,
};
