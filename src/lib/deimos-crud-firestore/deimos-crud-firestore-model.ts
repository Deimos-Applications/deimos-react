import { DeimosCrudModel } from "../deimos-crud/deimos-crud-model";
import {
  collection,
  get,
  all,
  query,
  where,
  onGet,
  Collection,
  onGetMany,
  Doc,
  onAll,
  limit,
  startAfter,
  doc,
  ref,
  order,
  add,
  remove,
  set,
  update,
} from "typesaurus";
import { DeimosCrudConfig } from "../deimos-crud/deimos-crud.config";
import { DeimosSyncModel } from "../deimos-crud/deimos-sync.model";
import { DeimosFirebase } from "./deimos-firebase";

export class DeimosCrudFirestoreModel<T = any> implements DeimosCrudModel {
  public id: string;
  public name: string;
  public pk: string = "id";

  private collectionRef: Collection<T>;
  public currentDocs: string[] = [];
  public last: string = "";
  private config = collection<DeimosSyncModel>(
    DeimosCrudConfig.SYNC_COLLECTION
  );

  constructor(id: string, name: string, pk?: string) {
    this.id = id;
    this.name = name;
    if (pk) {
      this.pk = pk;
    }

    this.collectionRef = collection<T>(this.id);
  }

  async init(
    onTotalChange: (total: number) => void,
    onDataChange: (newDocs: T[]) => void
  ) {
    // Get initial config snapshot
    const snap = await get(this.config, this.id);

    // Subscribe to config changes
    onGet<DeimosSyncModel>(this.config, this.id, (newConfig) => {
      let total = 0;

      if (newConfig?.data.total) {
        total = newConfig.data.total;
      }

      onTotalChange(total);
    });

    // Subscribe to data changes
    onAll(this.collectionRef, (newDocs) => {
      onDataChange(newDocs.map(({ data }) => data as T));
    });

    return {
      ok: true,
      total: snap?.data.total ?? 0,
      payload: {},
    };
  }

  private setCurrentDocs = (docs: Doc<T>[]) => {
    this.currentDocs = docs.map((data) => {
      return (data.data as any)[this.pk];
    });
  };

  async add(payload: Partial<T>): Promise<T> {
    const res = await set(
      this.collectionRef,
      (payload as any)[this.pk],
      payload as any
    );
    return res as any;
  }
  async update(id: string, payload: Partial<T>): Promise<T> {
    await update(this.collectionRef, (payload as any)[this.pk], payload as any);
    return {} as any;
  }
  async delete(id: string): Promise<T> {
    const res = await remove(this.collectionRef, id);
    console.log("delete", res);
    return res as any;
  }
  findOne(id: string): Promise<T> {
    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<T[]> {
    console.log(this.collectionRef, this.id);

    const docs = await all(this.collectionRef);
    this.setCurrentDocs(docs);
    return docs.map(({ data }) => ({ ...data })) as T[];
  }

  async paginate(page: number, perPage: number, last?: string) {
    console.log("paginate", page, perPage, last);

    if (last) {
      const docs = await DeimosFirebase.db
        .collection(this.id)
        .orderBy(this.pk, "desc")
        .startAfter(DeimosFirebase.db.collection(this.id).doc(last))
        .limit(perPage)
        .get();

      this.setCurrentDocs(
        docs.docs.map((doc) => ({ data: doc.data() })) as Doc<T>[]
      );

      if (docs && docs.size > 0) {
        this.last = (docs.docs[docs.size - 1].data() as any)[this.pk];
      }

      return docs.docs.map((doc: any) => doc.data());
    } else {
      const docs = await query(this.collectionRef, [
        order(this.pk as any, "desc"),
        limit(perPage),
      ]);

      this.setCurrentDocs(docs);
      this.last = (docs[docs.length - 1].data as any)[this.pk];

      return docs.map((doc) => doc.data);
    }
  }
}
