import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { handleInitialData } from "./actions/shared";
import Dashboard from "./components/Dashboard";

function App() {
  const dispatch = useDispatch();
  dispatch(handleInitialData());

  const authedUser = useSelector((state) => ({
    loading: state.authedUser === null,
  }), shallowEqual);

  return <div>{authedUser.loading === true ? 'LOADING...' : <Dashboard />}</div>;
}

export default App;
