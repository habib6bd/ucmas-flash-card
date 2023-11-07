import { useState, useEffect } from "react";
import "./index.css";
import ucmasLogo from '../public/ucmas_logo_20231107.jpg';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [numbersLength, setNumbersLength] = useState("");
  const [numbers, setNumbers] = useState([]);
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
  const [error, setError] = useState("");
  const [lengthError, setLengthError] = useState("");
  const [timer, setTimer] = useState(0);
  const [currentNumberSum, setCurrentNumberSum] = useState(null);
  const [showFullScreen, setShowFullScreen] = useState(false); // State to control the full-screen view
  const [showAnswer, setShowAnswer] = useState(false); // State to control displaying the answer

  // console.log("numbersLength", numbersLength);

  // Function to generate random numbers based on the input
  const generateNumbers = () => {
    setError("");
    setLengthError("");

    if (inputValue.split("").length > 1) {
      setError("Please enter a single digit");
      return;
    }
    const length = parseInt(numbersLength, 10); // Parse numbersLength as an integer

    if (isNaN(length) || length < 10 || length > 100) {
      setLengthError("Please enter a number between 10 to 100");
      return;
    }


    const digits = Number(inputValue.trim());
    // const length = Number(numbersLength.toString());
    // console.log("length", length);
    setNumbersLength(length.toString());
    const generatedNumbers = [];
    for (let i = 0; i < length; i++) {
      let min = 1,
        max = 9;
      if (digits === 2) {
        min = 10;
        max = 99;
      } else if (digits === 3) {
        min = 100;
        max = 999;
      }
      const randomNum = Math.floor(min + Math.random() * (max - min + 1));
      // const randomNum = Math.round(Math.random() * (10**digits));
      // console.log(randomNum);
      generatedNumbers.push(randomNum);
    }
    setNumbers(generatedNumbers);
    setCurrentNumberIndex(0);
    setShowFullScreen(true);
    setShowAnswer(false); // Hide the answer when new numbers are generated

  };

  // Function to calculate the sum of numbers
  const calculateSum = () => {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    setCurrentNumberSum(sum);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (currentNumberIndex < numbersLength) {
        setCurrentNumberIndex(currentNumberIndex + 1);
      }
    }, timer); // 5 seconds
    return () => clearTimeout(timerId);
  }, [currentNumberIndex, numbersLength, timer]);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white">
      <img src={ucmasLogo} alt="Logo" className="w-32 h-32 absolute top-0 left-0 mt-4 ml-4" />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
      <div>
        <label>Enter Digit: </label>
        <input
          className="border-2 border-indigo-600"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <p className="text-red-500">{error}</p>
      </div>

      <div>
        <label>Enter Row: </label>{" "}
        <input
          className="border-2 border-indigo-600"
          type="text"
          value={numbersLength}
          onChange={(e) => setNumbersLength(e.target.value.toString())}
        />
      </div>
    </div>
    <p className="text-red-500">{lengthError}</p>

    <div className="flex justify-center gap-5 w-full mb-4">
      <button
        className="button hover:bg-blue-500"
        onClick={() => setTimer(1000)}
      >
        Slow
      </button>
      <button
        className="button hover:bg-blue-500"
        onClick={() => setTimer(500)}
      >
        Medium
      </button>
      <button
        className="button hover:bg-blue-500"
        onClick={() => setTimer(250)}
      >
        Fast
      </button>
    </div>

    <div className="flex justify-center">
      <button
        className="button hover:bg-blue-500"
        onClick={generateNumbers}
      >
        Start
      </button>
    </div>
    {showFullScreen && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60 z-50">
        <div className="bg-white rounded-lg shadow-lg custom-padding">
          <h2 className="text-[300px] text-center font-bold mb-4 m-30">
            {numbers[currentNumberIndex]}
          </h2>
          {!showAnswer && (
            <button
              className="button hover:bg-blue-500 block mx-auto mb-4"
              onClick={() => {
                calculateSum();
                setShowAnswer(true);
              }}
            >
              Answer
            </button>
          )}
          {showAnswer && (
            <p className="text-[300px] text-center font-bold mb-4">
              {currentNumberSum}
            </p>
          )}
          <button
            className="button hover:bg-blue-500 block mx-auto"
            onClick={() => setShowFullScreen(false)}
          >
            Close
          </button>
        </div>
      </div>
    )}
  </div>
  );
}

export default App;
