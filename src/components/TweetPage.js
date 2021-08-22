import React from "react";
import { shallowEqual } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import Tweet from "./Tweet";
import NewTweet from "./NewTweet";

const TweetPage = (props) => {
  const tweets = useSelector((state) => state.tweets);
  const users = useSelector((state) => state.users);
  const authedUser = useSelector((state) => state.authedUser);

  const dispatch = useDispatch();
  const { id } = props.match.params;

  const formattedTweet = useSelector(
    () => ({
      id,
      replies: !tweets[id]
        ? []
        : tweets[id].replies.sort(
            (a, b) => tweets[b].timestamp - tweets[a].timestamp
          ),
    }),
    shallowEqual
  );

  const { replies } = formattedTweet;

  return (
    <div>
      <Tweet id={id} />
      <NewTweet id={id} />
      {replies.length !== 0 && <h3 className="center">Replies</h3>}
      <ul>
        {replies.map((replyId) => (
          <li key={replyId}>
            <Tweet id={replyId} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TweetPage;
