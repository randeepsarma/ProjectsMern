"use client"
import React, { useState, useEffect } from 'react';

function RadioButtonsGroup() {
  const [selectedOption, setSelectedOption] = useState(
    typeof window !== 'undefined'
      ? localStorage.getItem('selectedOption') || 'option1'
      : 'option1'
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedOption', selectedOption);
    }
  }, [selectedOption]);

  const handleRadioButtonChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          name="option"
          value="option1"
          checked={selectedOption === 'option1'}
          onChange={handleRadioButtonChange}
        />
        Option 1
      </label>
      <label>
        <input
          type="radio"
          name="option"
          value="option2"
          checked={selectedOption === 'option2'}
          onChange={handleRadioButtonChange}
        />
        Option 2
      </label>
      <label>
        <input
          type="radio"
          name="option"
          value="option3"
          checked={selectedOption === 'option3'}
          onChange={handleRadioButtonChange}
        />
        Option 3
      </label>
      <p>Selected option: {selectedOption}</p>
    </div>
  );
}

export default RadioButtonsGroup;
