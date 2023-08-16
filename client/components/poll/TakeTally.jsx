import React, { useState, useEffect } from 'react';

const TakeTally = ({ surveyId }) => {
  //this is for getting the survey ID from the URL parameters
  const [question, setQuestion] = useState('');
  const [option, setOptions] = useState([]);
  const [newTally, setNewTally] = useState('');

  //fetches the survey data from DB using survey ID
  //updates the state the the fetched question and options
  useEffect(() => {
    fetch(`/survey_id=${survey_id}`)
      .then((response) => {
        if (!response.ok) {
          return new Error('error getting survey');
        }
        response.json();
      })
      .then((data) => {
        setQuestion(data.title);
        setOptions(data.options);
      })
      .catch((error) => {
        console.log('error fetching tally data:', error);
      });
  }, [surveyId]);

  //function for the user selecting an option
  const handlePick = (tallyIndex) => {
    const tallyList = [...options];
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
      const tallyList = [...options, { taxt: newOption, selected: false }];
      setOptions(tallyList);
      setNewOption('');
    }
  };

  const handleSubmit = () => {
    const updatedOptions = {
      options: option,
    };

    fetch(`/survey_id=${survey_id}`, {
      method: 'PUT',
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
    <div class='take-tally-container'>
      <h2>{question}</h2>
      <form onSubmit={handleSubmit}></form>
    </div>
  );
};

export default TakeTally;
