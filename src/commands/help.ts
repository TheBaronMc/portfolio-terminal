import { type Command } from './command';

function execute(_params: string[]): string {
  return '######################## HELP ########################\n\
          ######################################################';
}

export const help: Command = {
  name: 'help',
  execute,
};
