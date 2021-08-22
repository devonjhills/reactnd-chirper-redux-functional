import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { handleInitialData } from "./actions/shared";
import Dashboard from "./components/Dashboard";
import LoadingBar from "react-redux-loading";
import NewTweet from "./components/NewTweet";
import TweetPage from "./components/TweetPage";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Nav from "./components/Nav";

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
    <Router>
    <Fragment>
      <LoadingBar />
      <div className='container'>
        <Nav />
        {authedUser.loading === true
          ? null
          : <div>
              <Route path='/' exact component={Dashboard} />
              <Route path='/tweet/:id' component={TweetPage} />
              <Route path='/new' component={NewTweet} />
            </div>}
      </div>
    </Fragment>
  </Router>
  );
}

export default App;
