import React from "react";
import { useFormik, Form, Formik } from "formik";
import UruInput from "./UruInput";
import * as uuid from "uuid";
// import loader from "../../assets/img/loader.svg";
import classnames from "classnames";
import { toast } from "react-toastify";
import { useState } from "react";
import UruFormList from "./UruFormList";
import UruCheck from "./UruCheck";
import { UruFormAdapter } from "./uru.model";
import DeimosButton, {
  DeimosButtonVariant,
} from "../../../deimos-ui/components/deimos-button/DeimosButton";
import JSONPretty from "react-json-pretty";

interface UruFormProps {
  id?: string;
  validationSchema: any;
  fields?: any[];
  initialValues?: any;
  preSubmit?: (payload: any) => any;
  postSubmit?: (res: any) => void;
  onError?: (error: any) => void;
  onValidate?: (payload: any) => boolean;
  onValidationError?: (payload: any) => void;
  onCancel?: () => void;
  onPayloadChange?: () => {};

  submitButtonText?: string;
  submitButtonClasses?: any;

  hideCancelButton?: boolean;
  hideSubmitButton?: boolean;
  cancelButtonText?: string;
  cancelButtonClasses?: any;
  adapter: UruFormAdapter;

  actions?: any;

  resetAfterSuccess?: boolean;
}

const UruForm: React.FC<UruFormProps> = ({
  id = uuid.v4(),
  validationSchema,
  fields = [],
  initialValues = fields
    .map(({ name, initialValue }) => ({
      [name]: initialValue !== undefined ? initialValue : "",
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr })),
  preSubmit,
  postSubmit,
  onError,
  onValidate,
  onValidationError,
  onCancel = () => {},
  onPayloadChange = (inputName: any, newValue: any) => {},

  submitButtonText,
  submitButtonClasses,

  hideCancelButton = false,
  hideSubmitButton = false,
  cancelButtonText,
  cancelButtonClasses,
  adapter,

  actions,

  resetAfterSuccess = true,
}) => {
  const [loading, setLoading] = useState(false);
  const [localPayload, setLocalPayload] = useState<any>({});

  const executeRequest = async (payload: any) => {
    console.log("executeRequest", payload);

    setLoading(true);

    try {
      const res = await adapter.onProcess(payload);
      console.log(res);

      if (postSubmit) {
        postSubmit(res);
      }
      setLoading(false);

      if (resetAfterSuccess) {
      }
    } catch (error) {
      if (onError) {
        onError(error);
      } else {
        onErrorDefault();
      }
      setLoading(false);
    }
  };

  const onErrorDefault = () => {
    toast("Error", { type: "error" });
  };

  const onSubmit = async (payload: any) => {
    console.log("UruForm onSubmit", payload);
    if (onValidate) {
      const isValid = onValidate(payload);
      console.log("isValid", isValid);

      if (isValid === false) {
        if (onValidationError) onValidationError(payload);
        return;
      }
    }

    if (preSubmit) {
      payload = preSubmit(payload);
    }

    executeRequest({
      ...payload,
      ...localPayload,
    });
  };

  const customTypesMap: any = {
    list: (name: string, label: string, fieldProps: any): any => (
      <UruFormList
        title={fieldProps.title}
        placeholder={fieldProps.placeholder}
        name={name}
        items={fieldProps.items}
        onChange={(newItems: any) => {
          setLocalPayload({ ...localPayload, [name]: newItems });
          console.log(newItems);
        }}
      ></UruFormList>
    ),
    checkbox: (name: string, label: string): any => (
      <UruCheck
        label={label}
        name={name}
        checked={!!localPayload[name]}
        onChange={(newValue: any) => {
          setLocalPayload({ ...localPayload, [name]: newValue });
          console.log(newValue);
        }}
      ></UruCheck>
    ),
  };

  const mapInputTypeToComponent = (
    { name, label, type, ...fieldProps }: any,
    i: number,
    props: any
  ): any => {
    const customTypes = Object.keys(customTypesMap);

    if (customTypes.includes(type)) {
      return customTypesMap[type](name, label, fieldProps);
    } else {
      return (
        <UruInput
          key={`${id}-${i}`}
          controlId={`${id}-${name}`}
          label={label}
          name={name}
          type={type}
          {...props}
          {...fieldProps}
          onChange={(inputName: any, newValue: any) => {
            setLocalPayload({ ...localPayload, [inputName]: newValue });
            onPayloadChange(inputName, newValue);
          }}
        ></UruInput>
      );
    }
  };

  return (
    <div className="flex flex-col">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(props) => (
          <form noValidate onSubmit={props.handleSubmit}>
            {fields
              .filter(({ hide }) => !hide)
              .map((inputItem, i) => {
                return mapInputTypeToComponent(inputItem, i, {
                  handleChange: props.handleChange,
                  handleBlur: props.handleBlur,
                  value: props.values[inputItem.name],
                  errors: props.errors,
                });
              })}

            {/* <JSONPretty data={props}></JSONPretty> */}

            <div className="mt-2 flex flex-row">
              {!hideSubmitButton && (
                <DeimosButton
                  variant={DeimosButtonVariant.Success}
                  className={classnames(
                    "btn btn-success mr-2",
                    submitButtonClasses
                  )}
                  type="submit"
                  disabled={Object.keys(props.errors).length > 0 || loading}
                  loading={loading}
                >
                  {submitButtonText ?? "Agregar"}
                </DeimosButton>
              )}

              {!hideCancelButton && (
                <DeimosButton
                  variant={DeimosButtonVariant.Danger}
                  className={classnames(
                    "btn btn-light mr-2",
                    cancelButtonClasses
                  )}
                  type="button"
                  disabled={loading}
                  onClick={() => onCancel()}
                >
                  {cancelButtonText ?? "Cancelar"}
                </DeimosButton>
              )}

              {actions}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default UruForm;
