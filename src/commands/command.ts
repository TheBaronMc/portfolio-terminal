export type Command = {
  name: string;
  execute: (params: string[]) => string;
};
