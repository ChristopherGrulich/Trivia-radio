import React from "react";
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import Trivia from "./components/Trivia";
import Footer from "./components/Footer";
import image1 from "./images/blob1.png";
import { usePromiseTracker } from "react-promise-tracker";

const LoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && <h2 className="loading">Loading, please wait...</h2>
  );
};

export default function App() {
  const [isNew, setIsNew] = React.useState(true);

  function isReady() {
    setIsNew(false);
  }

  return (
    <div className="container">
      <img src={image1} className="bg-image1" alt=""></img>
      <Header />
      <LoadingIndicator />
      {isNew && (
        <div>
          <Welcome />
          <div className="button-box">
            <div className="button" onClick={isReady}>
              I'm ready!
            </div>
          </div>
        </div>
      )}

      {isNew === false && <Trivia />}

      <Footer />
    </div>
  );
}
