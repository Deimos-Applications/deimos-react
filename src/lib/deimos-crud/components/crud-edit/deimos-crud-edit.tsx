import React, { useState } from "react";
import JSONPretty from "react-json-pretty";
import { toast } from "react-toastify";
import { UserAddSchema } from "../../../../modules/user/schemas/userAdd.schema";
import DeimosModal from "../../../deimos-ui/components/deimos-modal/DeimosModal";
import { UruFormAdapter } from "../forms/uru.model";
import UruForm from "../forms/UruForm";

interface DeimosCrudEditProps {
  adapter: UruFormAdapter;
  fields: any[];
  isOpen: boolean;
  onCancel: () => void;
  onEdit: () => void;
  payload: any;
  schema: any;
}

const DeimosCrudEdit: React.FC<DeimosCrudEditProps> = ({
  adapter,
  fields,
  isOpen = false,
  onCancel,
  onEdit,
  payload,
  schema,
}) => {
  return (
    <div>
      <DeimosModal hideCloseButton={true} isOpen={isOpen} handleClose={onEdit}>
        {payload && (
          <UruForm
            adapter={adapter}
            validationSchema={schema}
            fields={fields}
            onCancel={onCancel}
            initialValues={payload}
            onValidate={(payload) => true}
            postSubmit={() => {
              toast("Elemento editado correctamente", { type: "success" });
              onEdit();
            }}
            submitButtonText="Editar"
          ></UruForm>
        )}
      </DeimosModal>
    </div>
  );
};

export default DeimosCrudEdit;
