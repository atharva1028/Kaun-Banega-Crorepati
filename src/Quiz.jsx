import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const App = () => {
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris"
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      answer: "4"
    },
    {
      question: "What is the capital of Japan?",
      options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
      answer: "Tokyo"
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(4882);
  const initialColors = ['#321848', '#321848', '#321848', '#321848','#321848','#321848','#321848','#321848','#321848','#321848'];
  const [colors, setColors] = useState(initialColors);
  const [timer, setTimer] = useState(60);
  const [questNo, setQuestNo] = useState(1);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  var a = 10000000;

  useEffect(() => {
    if (timer === 0) {
      handleGameOver(currentQuestion === 0 ? score * 0 : score);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleGameOver = (finalScore) => {
    setModalMessage(`You lost the game. Your wining price is: ${finalScore}`);
    setShowModal(true);
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setQuestNo(questNo + 1);
      setTimer(60); // Reset timer for next question
      setScore(score * 2);
    } else {
      const nextIndex = colors.lastIndexOf('#321848');
      const newColors = [...colors];
      newColors[nextIndex] = 'yellow';
      setColors(newColors);
      setTimeout(() => {
        setModalMessage(`Your wining price is: ${score * 2}`);
        setShowModal(true);
      }, 500);
    }
  };

  const handleAnswerOptionClick = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(a * 2);
      const nextIndex = colors.lastIndexOf('#321848');
      if (nextIndex !== -1) {
        const newColors = [...colors];
        newColors[nextIndex] = 'yellow';
        setColors(newColors);
        handleNextQuestion();
      }
    } else {
      console.log(currentQuestion)
      handleGameOver(currentQuestion === 0 ? score * 0 : score);
    }
    console.log(currentQuestion)
    
  };

  const handleCloseModal = () => {
    setShowModal(false);
    location.reload();
  };

  return (
    <div className="container-fluid article">
      <div className="row">
        {/* First Column */}
        <div className="col-md-10 col-12 section-1">
          <div className="p-3 question">
            {questNo} <span>)</span> {questions[currentQuestion].question}
            <div className="float-end">Time left: {timer}s</div>
          </div>
          <div className="row">
            <div className="col-md-6 col-12 pt-3 mb-3">
              <button
                className="btn btn-1 btn-light w-100"
                onClick={() => handleAnswerOptionClick(questions[currentQuestion].options[0])}
              >
                {questions[currentQuestion].options[0]}
              </button>
              <button
                className="btn btn-1 btn-light w-100 mt-4"
                onClick={() => handleAnswerOptionClick(questions[currentQuestion].options[1])}
              >
                {questions[currentQuestion].options[1]}
              </button>
            </div>
            <div className="col-md-6 col-12 mb-3">
              <button
                className="btn btn-1 btn-light w-100 mt-3"
                onClick={() => handleAnswerOptionClick(questions[currentQuestion].options[2])}
              >
                {questions[currentQuestion].options[2]}
              </button>
              <button
                className="btn btn-1 btn-light w-100 mt-4"
                onClick={() => handleAnswerOptionClick(questions[currentQuestion].options[3])}
              >
                {questions[currentQuestion].options[3]}
              </button>
            </div>
          </div>
        </div>

        {/* This is the prize money section */}
        <div className="col-md-2 money col-12" style={{backgroundColor: '#321848'}}>
          {colors.map((color, idx) => (
            <div
              key={idx}
              className="money-word text-center text-white m-2"
              style={{ backgroundColor: color}}
            >
              <h6>{a = parseInt(a / 2)}</h6>
            </div>
          ))}
        </div>
      </div>

      {/* Bootstrap Modal */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Game Over</h5>
              {/* <button type="button" className="btn-close" onClick={handleCloseModal}></button> */}
            </div>
            <div className="modal-body">
              <p>{modalMessage}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn w-100 btn-primary" onClick={handleCloseModal}>Play-Again</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
