import React from "react";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles["deimos-react"]}>
      <header>
        <a
          href="https://github.com/arcanite24/deimos-react"
          target="_blank"
          rel="noopener noreferrer"
        >
          Deimos React
        </a>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Testing TailwindCSS
        </button>
      </header>
    </div>
  );
}

export default App;
