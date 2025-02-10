export class NodeExistsError extends Error {}
export class NodeNotFoundError extends Error {}

export abstract class INode {
  protected parent: INode | null = null;

  public constructor(
    protected name: string,
    protected childs: INode[] | null,
  ) {
    if (childs) {
      for (const child of childs) {
        child.parent = this;
      }
    }
  }

  public abstract isDirectory(): boolean;
  public abstract isFile(): boolean;

  public getName(): string {
    return this.name;
  }

  public rename(new_name: string): void {
    if (this.parent != null && this.parent.childs?.some((sibling) => sibling.name == new_name)) {
      throw new NodeExistsError();
    }
    this.name = new_name;
  }

  public getParent(): INode | null {
    return this.parent;
  }

  protected addChild(node: INode): void {
    if (!this.childs) {
      this.childs = [];
    } else if (this.childs?.some((a_node) => a_node.getName() == node.getName())) {
      throw new NodeExistsError();
    }

    if (node.parent != null) {
      node.parent.childs = node.parent.childs!.filter((siblings) => siblings.name != node.name);
    }

    node.parent = this;
    this.childs?.push(node);
  }

  protected deleteChild(node_to_delete: string): void {
    if (this.childs == null) {
      throw new NodeNotFoundError();
    }

    const index = this.childs.findIndex((node) => node.getName() == node_to_delete);

    if (index == -1) {
      throw new NodeNotFoundError();
    }

    const node: INode = this.childs[index];
    node.parent = null;
    this.childs = this.childs.slice(0, index).concat(this.childs.slice(index + 1));
  }
}

export function getPath(node: INode): string {
  const getPathAux = (node: INode): string => {
    const parent = node.getParent();
    return parent ? getPathAux(parent) + `/${node.getName()}` : '';
  };
  return getPathAux(node);
}
