import React, { useState, useEffect } from "react";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import JSONPretty from "react-json-pretty";
import classnames from "classnames";
import styles from "./deimos-crud-table.module.scss";
import { DeimosCrudModel } from "../../deimos-crud-model";
import DeimosCrudAdd from "../crud-add/deimos-crud-add";
import {
  UruFormAdapterFirestoreAdd,
  UruFormAdapterFirestoreEdit,
} from "../forms/uru.model";
import DeimosCrudTableActions from "./deimos-crud-table-actions";
import DeimosCrudConfirmDelete from "./deimos-crud-confirm-delete";
import { toast } from "react-toastify";
import DeimosCrudEdit from "../crud-edit/deimos-crud-edit";

interface DeimosCrudTableProps {
  model: DeimosCrudModel;

  title: string;
  columns: IDataTableColumn[];
  fields: any[];

  addSchema: any;
  editSchema: any;
}

function DeimosCrudTable<T = any>({
  model,
  title,
  columns,
  fields,

  addSchema,
  editSchema,
}: DeimosCrudTableProps) {
  const [data, setData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [currentItem, setCurrentItem] = useState<T | null>(null);

  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const addAdapter = new UruFormAdapterFirestoreAdd<T>(model);
  const updateAdapter = new UruFormAdapterFirestoreEdit<T>(model);

  const initTable = async () => {
    try {
      const { total } = await model.init(onTotalChange, onDataChange);
      setTotal(total);
      fetchData(1, perPage);
    } catch (error) {}
  };

  const fetchData = async (page: number = 1, perPage: number = 10) => {
    const newData = await model.paginate(page, perPage, model.last);
    setData(newData);
    setTotal(newData.length);
  };

  const onTotalChange = (newTotal: number) => setTotal(newTotal);
  const onDataChange = (newDocs: T[]) => {
    setData(
      newDocs
      //   .filter((doc: any) =>
      //   model.currentDocs.includes(doc[model.pk] as any)
      // )
    );
    setTotal(newDocs.length);
  };

  useEffect(() => {
    initTable();
  }, []);

  useEffect(() => {
    fetchData(page, perPage);
  }, [page, perPage]);

  const onEdit = (item: T) => {
    setCurrentItem(item);
    setIsOpenEdit(true);
  };

  const onDelete = (item: T) => {
    setCurrentItem(item);
    setIsOpenDelete(true);
  };

  const deleteItem = async () => {
    try {
      console.log("deleteItem", (currentItem as any)[model.pk]);

      await model.delete((currentItem as any)[model.pk]);
      toast("Elemento eliminado correctamente", { type: "success" });
      setIsOpenDelete(false);
    } catch (error) {
      toast("Ocurrió un erro al borrar el elemento.", { type: "error" });
    }
  };

  const afterEditItem = () => {
    setIsOpenEdit(false);
  };

  return (
    <div
      className={classnames(styles["deimos-crud-table"], "flex flex-col w-100")}
    >
      <JSONPretty
        data={{
          ...model,
          total,
          currentItem,
        }}
      ></JSONPretty>

      <DeimosCrudConfirmDelete
        isOpen={isOpenDelete}
        onDelete={() => deleteItem()}
        onCancel={() => {
          setIsOpenDelete(false);
          setCurrentItem(null);
        }}
      ></DeimosCrudConfirmDelete>

      <DeimosCrudAdd
        adapter={addAdapter}
        fields={fields}
        schema={addSchema}
      ></DeimosCrudAdd>
      <DeimosCrudEdit
        adapter={updateAdapter}
        fields={fields}
        isOpen={isOpenEdit}
        onEdit={afterEditItem}
        payload={currentItem}
        schema={editSchema}
        onCancel={() => {
          setIsOpenEdit(false);
          setCurrentItem(null);
        }}
      ></DeimosCrudEdit>

      <DataTable
        columns={[
          ...columns,
          {
            name: "Acciones",
            sortable: false,
            cell: (item) => (
              <DeimosCrudTableActions
                onEdit={() => onEdit(item)}
                onDelete={() => onDelete(item)}
              ></DeimosCrudTableActions>
            ),
          },
        ]}
        data={data}
        title={title}
        paginationTotalRows={data.length}
        pagination
        paginationPerPage={perPage}
        // onChangeRowsPerPage={(newPerPage) => setPerPage(newPerPage)}
        // onChangePage={(newPage) => setPage(newPage)}
      ></DataTable>
    </div>
  );
}

export default DeimosCrudTable;
