import React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { formatTweet, formatDate } from "../utils/helpers";
import {
  TiArrowBackOutline,
  TiHeartOutline,
  TiHeartFullOutline,
} from "react-icons/ti";
import { handleToggleTweet } from "../actions/tweets";
import { Link, withRouter } from "react-router-dom";

const Tweet = (props) => {
  const tweets = useSelector((state) => state.tweets);
  const users = useSelector((state) => state.users);
  const authedUser = useSelector((state) => state.authedUser);

  const tweet = tweets[props.id];
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null;

  const formattedTweet = useSelector(
    () => ({
      tweet: tweet
        ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
        : null,
    }),
    shallowEqual
  );

  const { name, avatar, timestamp, text, hasLiked, likes, replies, parent, id } =
    formattedTweet.tweet;

  const dispatch = useDispatch();

  const handleLike = (e) => {
    e.preventDefault();

    dispatch(
      handleToggleTweet({
        id: tweet.id,
        hasLiked,
        authedUser,
      })
    );
  };
  const toParent = (e, id) => {
    e.preventDefault();
    props.history.push(`/tweet/${id}`)
  };

  return (
    <Link to={`/tweet/${id}`} className="tweet">
      <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
      <div className="tweet-info">
        <div>
          <span>{name}</span>
          <div>{formatDate(timestamp)}</div>
          {parent && (
            <button
              className="replying-to"
              onClick={(e) => toParent(e, parent.id)}
            >
              Replying to @{parent.author}
            </button>
          )}
          <p>{text}</p>
        </div>
        <div className="tweet-icons">
          <TiArrowBackOutline className="tweet-icon" />
          <span>{replies !== 0 && replies}</span>
          <button className="heart-button" onClick={handleLike}>
            {hasLiked === true ? (
              <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
            ) : (
              <TiHeartOutline className="tweet-icon" />
            )}
          </button>
          <span>{likes !== 0 && likes}</span>
        </div>
      </div>
    </Link>
  );
};

export default withRouter(Tweet);
