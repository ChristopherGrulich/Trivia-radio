import React from "react";
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import Trivia from "./components/Trivia";
import Footer from "./components/Footer";
// import image1 from "./images/blob1.png";
import { usePromiseTracker } from "react-promise-tracker";

const LoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && <h2 className="loading">Loading, please wait...</h2>
  );
};

export default function App() {
  const [isNew, setIsNew] = React.useState(true);
  const [categoryChoice, setCategoryChoice] = React.useState(
    "https://opentdb.com/api.php?amount=5&category=20&difficulty=medium&type=multiple"
  );

  function isReady() {
    setIsNew(false);
  }

  function categorySelect() {
    setCategoryChoice(
      `https://opentdb.com/api.php?amount=${
        document.getElementById("questionAmnt").value
      }&category=${
        document.getElementById("category").value
      }&difficulty=medium&type=multiple`
    );
  }

  return (
    <div className="container">
      {/* <img src={image1} className="bg-image1" alt=""></img> */}
      <Header />
      <LoadingIndicator />
      {isNew && (
        <div>
          <Welcome />
          <div className="category-choice">
            <p>Select Category: </p>
            <select id="category" onChange={categorySelect}>
              <option value="20">Mythology</option>
              <option value="22">Geography</option>
              <option value="21">Sports</option>
              <option value="23">History</option>
              <option value="25">Art</option>
              <option value="28">Vehicles</option>
            </select>
            <p>Number of Questions: </p>
            <select id="questionAmnt" onChange={categorySelect}>
              <option selected value="5">
                5
              </option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
          <div className="button-box">
            <div className="button" onClick={isReady}>
              I'm ready!
            </div>
          </div>
        </div>
      )}

      {isNew === false && <Trivia categoryChoice={categoryChoice} />}

      <Footer />
    </div>
  );
}
