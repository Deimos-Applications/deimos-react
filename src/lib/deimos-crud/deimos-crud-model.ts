export interface DeimosCrudModel<T = any> {
  readonly id: string;
  readonly name: string;
  readonly pk: string;

  currentDocs: string[];
  last: string;

  // Lifecycle hooks
  init(
    onTotalChange: (total: number) => void,
    onDataChange: (newDocs: T[]) => void
  ): Promise<{
    ok: boolean;
    total: number;
    payload?: object;
  }>;

  // CRUD operations
  add(payload: Partial<T>): Promise<T>;
  update(id: string, payload: Partial<T>): Promise<T>;
  delete(id: string): Promise<T>;
  findOne(id: string): Promise<T>;
  findAll(): Promise<Array<T>>;
  paginate(page: number, perPage: number, last?: string): Promise<Array<T>>;
}
