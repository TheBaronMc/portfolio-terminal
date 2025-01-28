import { INode } from './inode';

export enum OpenMode {
  Write = 'w',
  Read = 'r',
  Append = 'a',
}

export interface OpenedFileI {
  close(): void;
  isClosed(): boolean;
}

export interface ReadableFileI extends OpenedFileI {
  read(chars: number): string | null;

  readLine(): string | null;

  readLines(): string[];
}

export interface WritableFileI extends OpenedFileI {
  write(chars: string): void;

  writeLines(lines: string[]): void;
}

export class File extends INode {
  public constructor(
    name: string,
    private content: string = '',
  ) {
    super(name, null);
  }

  public get size(): number {
    return this.content.length;
  }

  public isDirectory(): boolean {
    return false;
  }

  public isFile(): boolean {
    return true;
  }

  public open(mode: OpenMode): OpenedFileI {
    if (mode == OpenMode.Read) {
      return new File.ReadableFile(this);
    }

    if (mode == OpenMode.Write) {
      this.content = ''; // Reset content
    }

    return new File.WritableFile(this);
  }

  private static OpenedFile = class implements OpenedFileI {
    protected closed: boolean = false;

    public constructor(protected file: File) {}

    public close(): void {
      this.closed = true;
    }

    public isClosed(): boolean {
      return this.closed;
    }
  };

  private static ReadableFile = class extends File.OpenedFile implements ReadableFileI {
    private cursor: number = 0;

    public constructor(file: File) {
      super(file);
    }

    public read(chars: number): string | null {
      const content: string = this.file.content;
      if (this.cursor >= content.length) {
        return null;
      }

      const next_cursor: number = this.cursor + Math.floor(chars);
      const buffer: string = this.file.content.slice(this.cursor, next_cursor);
      this.cursor = next_cursor;

      return buffer;
    }

    public readLine(): string | null {
      return this.readLineAux(null);
    }

    private readLineAux(line: string | null): string | null {
      const char: string | null = this.read(1);
      if (char == null) {
        return line;
      } else if (char == '\n') {
        return line;
      }

      if (line == null) {
        return this.readLineAux(char);
      }

      return this.readLineAux(line + char);
    }

    public readLines(): string[] {
      const line: string | null = this.readLine();
      if (line == null) {
        // End Of File
        return [];
      }

      return [line].concat(this.readLines());
    }
  };

  private static WritableFile = class extends File.OpenedFile implements WritableFileI {
    public constructor(file: File) {
      super(file);
    }

    public write(chars: string): void {
      this.file.content += chars;
    }

    public writeLines(lines: string[]): void {
      this.file.content += lines.join('\n');
    }
  };
}
