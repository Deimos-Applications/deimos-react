import { DeimosFirebase } from "../../../deimos-crud-firestore/deimos-firebase";
import { DeimosCrudModel } from "../../deimos-crud-model";

export interface UruModel {}

export interface UruFormAdapter<T = any> {
  id: string;

  onProcess: (payload: any) => Promise<any>;
}

export class UruFormAdapterFirestoreAdd<T = any> implements UruFormAdapter<T> {
  public id: string = "UruFormAdapterFirestoreAdd";
  public model: DeimosCrudModel;

  constructor(model: DeimosCrudModel) {
    this.model = model;
  }

  async onProcess(payload: Partial<T>) {
    const id = DeimosFirebase.db.collection(this.model.id).doc().id;
    console.log(id, payload, this.model);

    const res = await this.model.add({
      id,
      ...payload,
    });

    console.log(res);
    return res;
  }
}

export class UruFormAdapterFirestoreEdit<T = any> implements UruFormAdapter<T> {
  public id: string = "UruFormAdapterFirestoreEdit";
  public model: DeimosCrudModel;

  constructor(model: DeimosCrudModel) {
    this.model = model;
  }

  async onProcess(payload: Partial<T>) {
    const id = (payload as any)[this.model.pk];
    console.log(id, payload, this.model);

    const res = await this.model.update(id, payload);

    console.log(res);
    return res;
  }
}
