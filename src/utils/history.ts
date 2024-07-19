export class History<T> {
  private entries: Array<T> = new Array();
  private searches: Array<HistorySearch<T>> = new Array();

  add_entry(e: T): void {
    this.entries.push(e);
    this.update_seaches(e);

    console.log(this.entries);
  }

  search(match: (e: T) => boolean): HistorySearch<T> {
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
  private match: ((e: T) => boolean) | undefined;
  private index: number = 0;
  private entries: Array<T> = new Array<T>();

  constructor(match: (e: T) => boolean, entries: Array<T>) {
    this.match = match;
    console.log(entries);
    this.entries = entries.filter(this.match);
    console.log(this.entries);
    this.index = entries.length - 1;
  }

  previous(): T | undefined {
    if (this.index - 1 == -1) {
      return undefined;
    }

    this.index = this.index - 1;
    return this.entries[this.index];
  }

  next(): T | undefined {
    if (this.index + 1 == this.entries.length) {
      return undefined;
    }

    this.index = this.index + 1;
    return this.entries[this.index];
  }

  update(e: T): void {
    if (this.match && this.match(e)) {
      this.entries.push(e);
    }
  }
}
