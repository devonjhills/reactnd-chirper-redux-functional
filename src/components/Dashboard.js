import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import Tweet from './Tweet'

const Dashboard = () => {
  const tweets = useSelector((state) => ({
    tweetIds: Object.keys(state.tweets).sort(
      (a, b) => state.tweets[b].timestamp - state.tweets[a].timestamp
    ),
  }), shallowEqual);

  return (
    <div>
      <h3 className='center'>Your Timeline</h3>
      <ul className='dashboard-list'>
        {tweets.tweetIds.map((id) => (
          <li key={id}>
            <Tweet id={id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
