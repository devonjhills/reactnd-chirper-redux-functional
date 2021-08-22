import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { handleAddTweet } from "../actions/tweets";

const NewTweet = (props) => {
  const [text, setText] = useState("");
  const [toHome, setToHome] = useState(false);

  const dispatch = useDispatch();

  const { id } = props;

  const handleChange = (text) => {
    setText(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(handleAddTweet(text, id));

    setText("");
    setToHome(() => (id ? false : true));
  };

  const tweetLeft = 280 - text.length;

  return (
    <div>
      <h3 className="center">Compose New Tweet</h3>
      <form className="new-tweet" onSubmit={handleSubmit}>
        <textarea
          placeholder="What's happening?"
          value={text}
          onChange={(e) => handleChange(e.target.value)}
          className="textarea"
          maxLength={280}
        />
        {tweetLeft <= 100 && <div className="tweet-length">{tweetLeft}</div>}
        <button className="btn" type="submit" disabled={text === ""}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewTweet;
