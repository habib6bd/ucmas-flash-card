import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [numbersLength, setNumbersLength] = useState("");
  const [numbers, setNumbers] = useState([]);
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
  const [showSum, setShowSum] = useState(null);
  const [error, setError] = useState("");
  const [lengthError, setLengthError] = useState("");
  const [timer, setTimer] = useState(0);

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
  };

  // Function to calculate the sum of numbers
  const calculateSum = () => {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    setShowSum(sum);
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
    <div className="w-screen h-screen flex justify-center items-center">
      {/* <h1 className="first-letter:text-3xl font-bold underline">
        Number Sum App
      </h1> */}

      <div className="grid grid-rows-12 grid-flow-col gap-4 justify-center items-center block">
        <div className="">
          <label>Enter Digit: </label>
          <input
            className="border-solid border-2 border-indigo-600"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <p>{error}</p>
        </div>

        <div className="">
          <label>Enter Row: </label>{" "}
          <input
            className="border-solid border-2 border-indigo-600"
            type="text"
            value={numbersLength}
            onChange={(e) => setNumbersLength(e.target.value)}
          />
        </div>
      </div>
      <p>{lengthError}</p>
      
      <div className="flex justify-center gap-5 w-full block">
        <button className="button" onClick={() => setTimer(5000)}>
          Slow
        </button>
        <button className="button" onClick={() => setTimer(2000)}>
          Medium
        </button>
        <button className="button" onClick={() => setTimer(1000)}>
          Fast
        </button>
      </div>

      <div className="flex justify-center">
        <button className="button" onClick={generateNumbers}>
          Start
        </button>
      </div>

      <div>
        <p>Current Number: {numbers[currentNumberIndex]}</p>
        {currentNumberIndex === numbersLength && (
          <>
            <button onClick={() => calculateSum()}>Show Sum</button>{" "}
            <h3>{showSum}</h3>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
