import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const TakeTally = () => {
  const { questionId } = useParams();
  console.log(questionId);
  //this is for getting the survey ID from the URL parameters
  const [question, setQuestion] = useState('');
  const [option, setOptions] = useState([]);
  const [newTally, setNewTally] = useState('');

  // fetches the survey data from DB using survey ID
  // updates the state the the fetched question and options
  useEffect(() => {
    fetch(`/survey/${questionId}`)
      .then((response) => {
        return response.json();
        // if (!response.ok) {
        //   return new Error('error getting survey');
        // }
      })
      .then((data) => {
        console.log(data);
        setQuestion(data.title);
        setOptions(data.options);
      })
      .catch((error) => {
        console.log('error fetching tally data:', error);
      });
  }, []);

  // Placeholder data for testing
  // const placeholderQuestion = "What is your favorite color?";
  // const placeholderOptions = [
  //   { text: "Red", selected: false },
  //   { text: "Blue", selected: false },
  //   { text: "Green", selected: false },
  // ];

  // PLACEHOLDER USE EFFECT
  // useEffect(() => {
  //   setQuestion(placeholderQuestion);
  //   setOptions(placeholderOptions);
  // }, []);

  // function for the user selecting an option
  const handlePick = (tallyIndex) => {
    console.log('handlepick');
    const tallyList = [...option];
    //toggles "selected" property of the option at tallyIndex.
    tallyList[tallyIndex].selected = !tallyList[tallyIndex].selected;
    setOptions(tallyList);
  };

  const handleNewTallyText = (e) => {
    e.preventDefault();
    setNewTally(e.target.value);
  };

  const handleAddTally = () => {
    if (newTally.trim() !== '') {
      const tallyList = [...option, { text: newTally, selected: false }];
      setOptions(tallyList);
      setNewTally('');
    }
  };

  const handleSubmit = () => {
    const updatedOptions = {
      options: option,
    };

    fetch(`/${questionId}/sendOptions`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedOptions),
    })
      .then((response) => {
        if (response.ok) {
          window.alert('Submission Accepted');
        } else {
          console.log('failed to update options');
        }
      })
      .catch((error) => {
        console.log('an error occurred:', error);
      });
  };
  return (
    <div className='take-tally-container'>
      <h2>{question}</h2>
      <form onSubmit={handleSubmit}>
        {/* {placeholderOptions.map((option, index) => (
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
        ))} */}
        {option.map((option, index) => (
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
        ))}
        <div>
          <input
            type='text'
            placeholder='add your own option'
            value={newTally}
            onChange={handleNewTallyText}
          />
          <button type='button' onClick={handleAddTally}>
            Add Tally!
          </button>
        </div>
        <button type='button' onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default TakeTally;
