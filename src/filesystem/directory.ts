import { INode } from './inode';
import { File } from './file';

export class Directory extends INode {
  public constructor(name: string, nodes: (Directory | File)[]) {
    super(name, nodes);
  }

  public get child_list(): (Directory | File)[] | null {
    return <(Directory | File)[] | null>this.childs;
  }

  public isDirectory(): boolean {
    return true;
  }

  public isFile(): boolean {
    return false;
  }

  public add(node: Directory | File): void {
    this.addChild(node);
  }

  public deleteChild(node_to_delete: string): void {
    super.deleteChild(node_to_delete);
  }
}
