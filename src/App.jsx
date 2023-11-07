import { useState, useEffect } from "react";
import "./index.css";
import ucmas_logo_20231107 from "../src/assets/ucmas_logo_20231107";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [numbersLength, setNumbersLength] = useState("");
  const [numbers, setNumbers] = useState([]);
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
  const [showSum, setShowSum] = useState(null);
  const [error, setError] = useState("");
  const [lengthError, setLengthError] = useState("");
  const [timer, setTimer] = useState(0);
  const [showNumberPopup, setShowNumberPopup] = useState(false); // State to control the number pop-up
  const [currentNumberSum, setCurrentNumberSum] = useState(null);
  const [showFullScreen, setShowFullScreen] = useState(false); // State to control the full-screen view
  const [showAnswer, setShowAnswer] = useState(false); // State to control displaying the answer


  console.log("numbersLength", numbersLength);

  // Function to generate random numbers based on the input
  const generateNumbers = () => {
    setError("");
    setLengthError("");

    if (inputValue.split("").length > 1) {
      setError("Please enter a single digit");
      return;
    }

    if (
      numbersLength.split("").length > 3 ||
      numbersLength.split("").length < 2
    ) {
      setLengthError("Please enter a number between 10 to 100");
      return;
    }

    const digits = Number(inputValue.trim());
    const length = Number(numbersLength.trim());
    console.log("length", length);
    setNumbersLength(length);
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
      console.log(randomNum);
      generatedNumbers.push(randomNum);
    }
    setNumbers(generatedNumbers);
    setCurrentNumberIndex(0);
    setShowSum(null);
    setInputValue(0);
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
    <div className="h-screen flex flex-col justify-center items-center bg-gray-200">
      <img src={ucmas_logo_20231107} alt="Logo" className="mb-4" />

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
          onChange={(e) => setNumbersLength(e.target.value)}
        />
      </div>
    </div>
    <p className="text-red-500">{lengthError}</p>

    <div className="flex justify-center gap-5 w-full mb-4">
      <button
        className="button"
        onClick={() => setTimer(5000)}
      >
        Slow
      </button>
      <button
        className="button"
        onClick={() => setTimer(2000)}
      >
        Medium
      </button>
      <button
        className="button"
        onClick={() => setTimer(1000)}
      >
        Fast
      </button>
    </div>

    <div className="flex justify-center">
      <button
        className="button"
        onClick={generateNumbers}
      >
        Start
      </button>
    </div>
    {showFullScreen && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-9xl text-center font-bold mb-4 m-30">
            {numbers[currentNumberIndex]}
          </h2>
          {!showAnswer && (
            <button
              className="button block mx-auto mb-4"
              onClick={() => {
                calculateSum();
                setShowAnswer(true);
              }}
            >
              Show Answer
            </button>
          )}
          {showAnswer && (
            <p className="text-9xl text-center font-bold mb-4">
              = {currentNumberSum}
            </p>
          )}
          <button
            className="button block mx-auto"
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
