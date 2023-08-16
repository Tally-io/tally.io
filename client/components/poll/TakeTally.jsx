import React, { useState, useEffect } from "react";

const TakeTally = ({ survey_id }) => {
  //this is for getting the survey ID from the URL parameters
  const [question, setQuestion] = useState("");
  const [option, setOptions] = useState([]);
  const [newTally, setNewTally] = useState("");

  // fetches the survey data from DB using survey ID
  // updates the state the the fetched question and options
  // useEffect(() => {
  //   fetch(`/survey_id=${survey_id}`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         return new Error("error getting survey");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setQuestion(data.title);
  //       setOptions(data.options);
  //     })
  //     .catch((error) => {
  //       console.log("error fetching tally data:", error);
  //     });
  // }, [survey_id]);

  // Placeholder data for testing
  const placeholderQuestion = "What is your favorite color?";
  const placeholderOptions = [
    { text: "Red", selected: false },
    { text: "Blue", selected: false },
    { text: "Green", selected: false },
  ];

  // PLACEHOLDER USE EFFECT
  useEffect(() => {
    setQuestion(placeholderQuestion);
    setOptions(placeholderOptions);
  }, []);

  // function for the user selecting an option
  // const handlePick = (tallyIndex) => {
  //   console.log("handlepick");
  //   const tallyList = [...options];
  //   //toggles "selected" property of the option at tallyIndex.
  //   tallyList[tallyIndex].selected = !tallyList[tallyIndex].selected;
  //   setOptions(tallyList);
  // };

  const handleNewTallyText = (e) => {
    e.preventDefault();
    setNewTally(e.target.value);
  };

  const handleAddTally = () => {
    if (newTally.trim() !== "") {
      const tallyList = [...option, { text: newTally, selected: false }];
      setOptions(tallyList);
      setNewTally("");
    }
  };

  const handleSubmit = () => {
    const updatedOptions = {
      options: option,
    };

    fetch(`/survey_id=${survey_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedOptions),
    })
      .then((response) => {
        if (response.ok) {
          window.alert("Submission Accepted");
        } else {
          console.log("failed to update options");
        }
      })
      .catch((error) => {
        console.log("an error occurred:", error);
      });
  };
  return (
    <div className="take-tally-container">
      <h2>{question}</h2>
      <form onSubmit={handleSubmit}>
        {placeholderOptions.map((option, index) => (
          <div key={index}>
            <label>
              <input
                type="checkbox"
                checked={option.selected}
                onChange={() => handlePick(index)}
              />
              {option.text}
            </label>
          </div>
        ))}
        {/* {options.map((option, index) => (
          <div key={index}>
            <label>
              <input
                type='checkbox'
                checked={option.selected}
                onChange={() => handlePick(index)}
              />
              {option.text}
            </label>
          </div>
        ))} */}

        {/* <div>
          <input
            type="text"
            placeholder="add your own option"
            value={newTally}
            onChange={handleNewTallyText}
          />
          <button type="button" onClick={handleAddTally}>
            Add Tally!
          </button>
        </div> */}

        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default TakeTally;
