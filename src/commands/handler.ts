import type { Command, Context } from '@/commands/command';
import { File, OpenMode, type ReadableFileI, type WritableFileI } from '@/filesystem/file';

export class CommandNotFound extends Error {}

export class CommandHandler {
  public constructor(
    private commands: Command[],
    private stdin: File,
    private stdout: File,
    private stderr: File,
  ) {}

  public exec(name: string, context: Context, params: string[]): Result<Context, CommandNotFound> {
    const command = this.commands.find((cmd) => cmd.name === name);

    if (command) {
      const new_context: Context = command.execute(
        context,
        this.stdin.open(OpenMode.Read) as ReadableFileI,
        this.stdout.open(OpenMode.Write) as WritableFileI,
        this.stderr.open(OpenMode.Write) as WritableFileI,
        params,
      );

      return { success: true, result: new_context };
    }

    return { success: false, error: new CommandNotFound(`${name} not found`) };
  }
}
