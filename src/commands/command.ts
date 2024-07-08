export type Command = {
  name: string;
  execute: (stdout: WritableStream, params: string[]) => number;
};
