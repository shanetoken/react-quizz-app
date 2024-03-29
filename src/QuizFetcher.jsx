import Loader from './Loader';
import ErrorHandler from './ErrorHandler';
import React, { useEffect, useReducer, useState } from 'react';
import Question from './Question';
import CountDown from './CountDown';
import './App.css';

// Initial State
const initialState = {
  status: 'loading',
  data: [],
};

// Switch Case
function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        status: 'ready',
        data: action.payload,
      };
    case 'dataFailed':
      return {
        ...state,
        status: 'error',
        data: null,
      };
    default:
      return state;
  }
}

// Fetch Data
const fetchData = async (dispatch) => {
  const response = await fetch('https://opentdb.com/api.php?amount=8');
  if (!response.ok) {
    dispatch({ type: 'dataFailed' });
  } else {
    const data = await response.json();
    dispatch({ type: 'dataReceived', payload: data.results });
  }
};

// Handle Data
function FetchData() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    fetchData(dispatch);
  }, []);

  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3);

  useEffect(() => {
    if (index <= 8) {
      setTimeout(() => {
        setIndex((prevIndex) => prevIndex + 1);
      }, 3000);
    }
  }, [index]);

  return (
    <div>
      {state.status === 'loading' && <Loader />}
      {state.status === 'error' && <ErrorHandler />}
      {state.status === 'ready' && (
        <>
          <Question questions={state.data} index={index} />
          <div className="controller">
            <span id="countdown">⏳ 00:{('0' + timeLeft).slice(-2)}</span>
            <button id="btn_reset">↻ Reset</button>
          </div>
        </>
      )}
    </div>
  );
}

export default FetchData;
