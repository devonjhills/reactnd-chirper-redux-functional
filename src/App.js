import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { handleInitialData } from "./actions/shared";
import Dashboard from "./components/Dashboard";
import LoadingBar from "react-redux-loading";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch])

  const authedUser = useSelector(
    (state) => ({
      loading: state.authedUser === null,
    }),
    shallowEqual
  );

  return (
    <div>
      <LoadingBar />
      {authedUser.loading === true ? null : <Dashboard />}
    </div>
  );
}

export default App;
