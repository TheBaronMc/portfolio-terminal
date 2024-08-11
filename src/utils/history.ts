export class History<T> {
  private entries = new Array<T>();
  private searches = new Array<HistorySearch<T>>();

  public add_entry(e: T): void {
    this.entries.push(e);
    this.update_seaches(e);
  }

  public search(match: (e: T) => boolean): HistorySearch<T> {
    const history_search = new HistorySearch<T>(match, this.entries);

    this.searches.push(history_search);

    return history_search;
  }

  private update_seaches(e: T): void {
    this.searches.forEach((search: HistorySearch<T>) => {
      search.update(e);
      return;
    });
  }
}

export type HistorySearchInterface<T> = InstanceType<typeof HistorySearch<T>>;
class HistorySearch<T> {
  private index: number = 0;

  public constructor(
    private match: (e: T) => boolean,
    private entries: T[],
  ) {
    this.match = match;
    this.entries = entries.filter(this.match);
    this.index = entries.length - 1;
  }

  public previous(): T | undefined {
    if (this.index - 1 == -1) {
      return undefined;
    }

    this.index = this.index - 1;
    return this.entries[this.index];
  }

  public next(): T | undefined {
    if (this.index + 1 == this.entries.length) {
      return undefined;
    }

    this.index = this.index + 1;
    return this.entries[this.index];
  }

  public update(e: T): void {
    if (this.match && this.match(e)) {
      this.entries.push(e);
    }
  }
}
