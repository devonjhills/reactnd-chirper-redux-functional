import React from 'react'
import { useDispatch } from "react-redux";
import { handleInitialData } from "./actions/shared";

function App() {

  const dispatch = useDispatch();
  dispatch(handleInitialData());

  return (
    <div>
      Hello World
    </div>
  );
}

export default App;
