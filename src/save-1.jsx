// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
// import './App.css';

// const App = () => {
//   const questions = [
//     {
//       question: "What is the capital of France?",
//       options: ["Paris", "London", "Berlin", "Madrid"],
//       answer: "Paris"
//     },
//     {
//       question: "What is the capital of Japan?",
//       options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
//       answer: "Tokyo"
//     },
//     {
//       question: "What is the largest planet in our solar system?",
//       options: ["Earth", "Jupiter", "Saturn", "Mars"],
//       answer: "Jupiter"
//     },
//     {
//       question: "Who wrote 'Hamlet'?",
//       options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
//       answer: "William Shakespeare"
//     },
//     {
//       question: "What is the chemical symbol for water?",
//       options: ["O2", "H2O", "CO2", "NaCl"],
//       answer: "H2O"
//     },
//     {
//       question: "What is the capital of Italy?",
//       options: ["Paris", "Rome", "Madrid", "Berlin"],
//       answer: "Rome"
//     },
//     {
//       question: "What is the tallest mountain in the world?",
//       options: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"],
//       answer: "Mount Everest"
//     },
//     {
//       question: "Who painted the Mona Lisa?",
//       options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
//       answer: "Leonardo da Vinci"
//     },
//     {
//       question: "What is the capital of Canada?",
//       options: ["Toronto", "Ottawa", "Vancouver", "Montreal"],
//       answer: "Ottawa"
//     },
//     {
//       question: "What is the largest ocean on Earth?",
//       options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
//       answer: "Pacific Ocean"
//     }
//   ];

//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [score, setScore] = useState(4882);
//   const initialColors = ['#321848', '#321848', '#321848', '#321848', '#321848', '#321848', '#321848', '#321848', '#321848', '#321848'];
//   const [colors, setColors] = useState(initialColors);
//   const [timer, setTimer] = useState(60);
//   const [questNo, setQuestNo] = useState(1);
//   const [modalMessage, setModalMessage] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [removedOptions, setRemovedOptions] = useState([]);
//   const [lifelineUsed, setLifelineUsed] = useState(false);
//   const [extraChanceUsed, setExtraChanceUsed] = useState(false); // New state for extra chance lifeline
//   const [extraChanceActive, setExtraChanceActive] = useState(false); // State to track if extra chance is active
//   var a = 10000000;

//   useEffect(() => {
//     if (timer === 0) {
//       handleGameOver(currentQuestion === 0 ? score * 0 : score);
//       return;
//     }
//     const interval = setInterval(() => {
//       setTimer((prevTimer) => prevTimer - 1);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [timer]);

//   const handleGameOver = (finalScore) => {
//     setModalMessage(`You lost the game. Your winning prize is: ${finalScore}`);
//     setShowModal(true);
//   };

//   const handleNextQuestion = () => {
//     const nextQuestion = currentQuestion + 1;
//     if (nextQuestion < questions.length) {
//       setCurrentQuestion(nextQuestion);
//       setQuestNo(questNo + 1);
//       setTimer(60);
//       setScore(score * 2);
//       setRemovedOptions([]);
//       setExtraChanceActive(false); // Reset extra chance activation for the next question
//     } else {
//       const nextIndex = colors.lastIndexOf('#321848');
//       const newColors = [...colors];
//       newColors[nextIndex] = 'yellow';
//       setColors(newColors);
//       setTimeout(() => {
//         setModalMessage(`Your winning prize is: ${score * 2}`);
//         setShowModal(true);
//       }, 500);
//     }
//   };

//   const handleAnswerOptionClick = (selectedOption) => {
//     if (selectedOption === questions[currentQuestion].answer) {
//       setScore(score * 2);
//       const nextIndex = colors.lastIndexOf('#321848');
//       if (nextIndex !== -1) {
//         const newColors = [...colors];
//         newColors[nextIndex] = 'yellow';
//         setColors(newColors);
//         handleNextQuestion();
//       }
//     } else {
//       if (extraChanceActive) {
//         setRemovedOptions([...removedOptions, selectedOption]); // Remove the selected incorrect option
//         setExtraChanceActive(false); // Deactivate extra chance after use
//       } else {
//         handleGameOver(currentQuestion === 0 ? score * 0 : score);
//       }
//     }
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     location.reload();
//   };

//   const handleRemoveTwoWrongAnswers = () => {
//     if (!lifelineUsed) {
//       const incorrectOptions = questions[currentQuestion].options.filter(
//         (option) => option !== questions[currentQuestion].answer
//       );
//       const optionsToRemove = incorrectOptions.sort(() => 0.5 - Math.random()).slice(0, 2);
//       setRemovedOptions(optionsToRemove);
//       setLifelineUsed(true);
//     }
//   };

//   const handleExtraChance = () => {
//     if (!extraChanceUsed) {
//       setExtraChanceUsed(true);
//       setExtraChanceActive(true); // Activate extra chance for the current question
//     }
//   };

//   return (
//     <div className="container-fluid article">
//       <div className="row">
//         {/* First Column */}
//         <div className="col-md-10 col-12 section-1">
//           <div className='d-flex justify-content-end gap-3 me-4 pb-2'>
//             <button className="btn btn-remove" onClick={handleRemoveTwoWrongAnswers} disabled={lifelineUsed}></button>
//             <button className="btn btn-lifeline" onClick={handleExtraChance} disabled={extraChanceUsed}></button>
//           </div>
          
//           <div className="p-3 question">
//             {questNo} <span>)</span> {questions[currentQuestion].question}
            
//             <div className="float-end ">
            
//               Time left: {timer}s</div>

//           </div>
//           <div className="row">
//             <div className="col-md-6 col-12 pt-3 mb-3">
//               <button
//                 className="btn btn-1 btn-light w-100"
//                 onClick={() => handleAnswerOptionClick(questions[currentQuestion].options[0])}
//                 disabled={removedOptions.includes(questions[currentQuestion].options[0])}
//               >
//                 {!removedOptions.includes(questions[currentQuestion].options[0]) && questions[currentQuestion].options[0]}
//               </button>
//               <button
//                 className="btn btn-1 btn-light w-100 mt-4"
//                 onClick={() => handleAnswerOptionClick(questions[currentQuestion].options[1])}
//                 disabled={removedOptions.includes(questions[currentQuestion].options[1])}
//               >
//                 {!removedOptions.includes(questions[currentQuestion].options[1]) && questions[currentQuestion].options[1]}
//               </button>
//             </div>
//             <div className="col-md-6 col-12 mb-3">
//               <button
//                 className="btn btn-1 btn-light w-100 mt-3"
//                 onClick={() => handleAnswerOptionClick(questions[currentQuestion].options[2])}
//                 disabled={removedOptions.includes(questions[currentQuestion].options[2])}
//               >
//                 {!removedOptions.includes(questions[currentQuestion].options[2]) && questions[currentQuestion].options[2]}
//               </button>
//               <button
//                 className="btn btn-1 btn-light w-100 mt-4"
//                 onClick={() => handleAnswerOptionClick(questions[currentQuestion].options[3])}
//                 disabled={removedOptions.includes(questions[currentQuestion].options[3])}
//               >
//                 {!removedOptions.includes(questions[currentQuestion].options[3]) && questions[currentQuestion].options[3]}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* This is the prize money section */}
//         <div className="col-md-2 money col-12" style={{ backgroundColor: '#321848' }}>
//           {colors.map((color, idx) => (
//             <div
//               key={idx}
//               className="money-word text-center text-white m-2"
//               style={{ backgroundColor: color }}
//             >
//               <h6>{a = parseInt(a / 2)}</h6>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="row justify-content-center mt-3"></div>

//       {/* Bootstrap Modal */}
//       <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">Game Over</h5>
//             </div>
//             <div className="modal-body">
//               <p>{modalMessage}</p>
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn w-100 btn-primary" onClick={handleCloseModal}>Play Again</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
