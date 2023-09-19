import React, { useState, useEffect } from "react";
import NavBar from "./little_comps/NavBar.jsx";
import { CopyToClipboard } from "react-copy-to-clipboard";

const TallyCreate = () => {
  // import userInfo?? right now it's hard coded
const loggedInPerson = '617e4a9a88438e5e2b96e4fb'

  const userInfo = {
    name: "Josh",
    tallies: ["asdf1234", "qwer1234", "zxcv5678"],
  };

  const [newTally, setNewTally] = useState("");

  const createTally = () => {};

  const [value, setValue] = React.useState("some\ntext");
  const [copied, setCopied] = React.useState(false);
  const onChange = React.useCallback(({ target: { value } }) => {
    setValue(value);
    setCopied(true);
  }, []);
  const onClick = React.useCallback(({ target: { innerText } }) => {
    console.log(`Clicked on "${innerText}"!`);
  }, []);
  const onCopy = React.useCallback(() => {
    setCopied(true);
  }, []);

  const handleNewTallyText = (e) => {
    e.preventDefault();
    setNewTally(e.target.value);
  };

  return (
    <div>
      <NavBar name={userInfo.name} key={userInfo.name} />
      <hr />
      <h3>Create a new Tally!</h3>
      <hr />
      <br />
      <div className="new-tally-container">
        <form onSubmit={createTally}>
          <input
            className="new-tally-input"
            type="question"
            placeholder="What's your question?"
            required
          />
          <input
            className="new-tally-input"
            type="text"
            placeholder="answer here"
            name="answer_1"
            required
          />
          <input
            className="new-tally-input"
            type="text"
            placeholder="answer here"
            name="answer_2"
            required
          />

          <button type="submit" className="new-tally-create">
            Create a Tally!
          </button>
        </form>
      </div>

      <hr />
      <br />

      <div className="new-tally-container">
        <input
          className="survey-link"
          placeholder="Tally link will appear here"
        />
        <CopyToClipboard onCopy={onCopy} text={value}>
          <button className="copy-to-clipboard">Copy Tally Link</button>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default TallyCreate;
