import React from "react";
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import Trivia from "./components/Trivia";
import Footer from "./components/Footer";
import { usePromiseTracker } from "react-promise-tracker";
import { Select, Slider } from 'antd';
const { Option } = Select;

const LoadingIndicator = () => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && <h2 className="loading">Loading, please wait...</h2>
  );
};

export const App: React.FC = () => {
  const [isNew, setIsNew] = React.useState(true);
  const [apiUrl, setApiUrl] = React.useState(
    "https://opentdb.com/api.php?amount=5&category=20&difficulty=medium&type=multiple"
    );

  function isReady() {
    setIsNew(false);
  }

  // type Option = {
  //   value: string
  // }

  function apiSetup(value: number) {
    setApiUrl(
      `https://opentdb.com/api.php?amount=5&category=${value}&difficulty=medium&type=multiple`
    );
  }

  return (
    <div className="container">
      <Header />
      <LoadingIndicator />
      {isNew && (
        <div>
          <Welcome />
          <div>
            <Select 
            showSearch
            id="category" 
            onChange={apiSetup} 
            placeholder="Select a category"
            optionFilterProp="children"
            >
              <Option value="20">Mythology</Option>
              <Option value="22">Geography</Option>
              <Option value="21">Sports</Option>
              <Option value="23">History</Option>
              <Option value="28">Vehicles</Option>
            </Select>
            <Slider min={5} max={15} defaultValue={5} tooltipVisible />
            <Select id="questionAmnt" onChange={categorySelect}>
              <Option selected value="5">
                5
              </Option>
              <Option value="10">10</Option>
              <Option value="15">15</Option>
            </Select>
          </div>
          <div className="button-box">
            <div className="button" onClick={isReady}>
              I'm ready!
            </div>
          </div>
        </div>
      )}

      {isNew === false && <Trivia categoryChoice={apiUrl} />}

      <Footer />
    </div>
  );
}

export default App