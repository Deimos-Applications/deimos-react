import React, { useState } from "react";
import { toast } from "react-toastify";
import { UserAddSchema } from "../../../../modules/user/schemas/userAdd.schema";
import DeimosModal from "../../../deimos-ui/components/deimos-modal/DeimosModal";
import { UruFormAdapter } from "../forms/uru.model";
import UruForm from "../forms/UruForm";

interface DeimosCrudAddProps {
  adapter: UruFormAdapter;
  fields: any[];
  schema: any;
}

const DeimosCrudAdd: React.FC<DeimosCrudAddProps> = ({
  adapter,
  fields,
  schema,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Add</button>
      <DeimosModal
        hideCloseButton={true}
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
      >
        <UruForm
          adapter={adapter}
          validationSchema={schema}
          fields={fields}
          onCancel={() => setIsOpen(false)}
          initialValues={{ name: "", wea: "" }}
          onValidate={(payload) => true}
          postSubmit={() => {
            toast("Elemento agregado correctamente", { type: "success" });
            setIsOpen(false);
          }}
        ></UruForm>
      </DeimosModal>
    </div>
  );
};

export default DeimosCrudAdd;
