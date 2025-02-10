import { Directory } from '@/filesystem/directory';
import { File, type ReadableFileI, type WritableFileI } from '@/filesystem/file';
import { type Command, type Context } from '../command';
import { FileSystemError, findDirFromPath } from './utils';

type ListParams = { all: boolean; long: boolean; source?: string };

function execute(
  ctx: Context,
  _stdin: ReadableFileI,
  stdout: WritableFileI,
  stderr: WritableFileI,
  params: string[],
): Context {
  let list_params: ListParams = { all: false, long: false };
  for (const param of params) {
    switch (param) {
      case '-l':
      case '--long':
        list_params = { ...list_params, long: true };
        break;
      case '-a':
      case '--all':
        list_params = { ...list_params, all: true };
        break;
      default:
        if (param.startsWith('-')) {
          stderr.write(`Failed: unknow param ${param}`);
          return { ...ctx, last_exit_code: 1 };
        }
        list_params = { ...list_params, source: param };
    }
  }

  if (list_params.source) {
    const search: Result<Directory, FileSystemError> = findDirFromPath(
      ctx.working_directory,
      list_params.source,
    );
    if (!search.success) {
      stderr.write(`Failed: ${list_params.source} not found`);
      return { ...ctx, last_exit_code: 1 };
    }

    listNodes(search.result, list_params.all, list_params.long, stdout);
  } else {
    listNodes(ctx.working_directory, list_params.all, list_params.long, stdout);
  }

  return { ...ctx, last_exit_code: 0 };
}

function listNodes(directory: Directory, all: boolean, long: boolean, stdout: WritableFileI): void {
  if (long) {
    listNodesLong(directory, all, stdout);
  } else {
    listNodesShort(directory, all, stdout);
  }
}

function listNodesShort(current_directory: Directory, all: boolean, stdout: WritableFileI): void {
  const childs = current_directory.child_list || [];

  stdout.write(
    childs.reduce(
      (accum: string, directory: Directory | File) => {
        const name: string = directory.getName();
        if (!all && name.startsWith('.')) return accum;
        return accum + `${name} `;
      },
      all ? '. .. ' : '',
    ),
  );
}

function listNodesLong(current_directory: Directory, all: boolean, stdout: WritableFileI): void {
  const childs: (Directory | File)[] = (current_directory.child_list || []).filter(
    (node: Directory | File): boolean => {
      return all || !node.getName().startsWith('.');
    },
  );

  stdout.write(`total ${childs.length + (all ? 2 : 0)}`);

  if (all) {
    stdout.write('.');
    stdout.write('..');
  }

  childs.forEach((node: Directory | File) => {
    stdout.write(node.getName());
  });
}

export const ls: Command = {
  name: 'ls',
  execute,
};
