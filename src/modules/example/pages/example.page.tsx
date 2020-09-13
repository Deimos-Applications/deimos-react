import React from "react";
import { RouteComponentProps } from "@reach/router";
import { useSelector, useDispatch } from "react-redux";
import { exampleSelector, setCounter } from "../example.slice";

interface ExamplePageProps extends RouteComponentProps {}

const ExamplePage: React.FC<ExamplePageProps> = () => {
  const { counter } = useSelector(exampleSelector);
  const dispatch = useDispatch();

  return (
    <div className="p-4 flex flex-col flex-center">
      <h1>Example Page</h1>
      <p>Counter: {counter}</p>

      <div>
        <button onClick={() => dispatch(setCounter(counter - 1))}>
          Substract 1
        </button>
        <button onClick={() => dispatch(setCounter(counter + 1))}>Add 1</button>
      </div>
    </div>
  );
};

export default ExamplePage;
