import { useState } from "react";
import "./Form.css";
import {
  calculateBMR,
  calculateMaintenance,
  calculateProtein,
} from "./utils/calculator";
import { CM, INCHES, KG, LBS, MAN, WOMAN } from "./utils/constants";
import { get, store } from "./utils/storageHandler";

function Form() {
  const [gender, setGender] = useState(MAN);
  const [PAL, setPAL] = useState(1.4);
  const [age, setAge] = useState(25);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [isMetric, setMetric] = useState(get("isMetric") === "true");

  const renderCalories = () => {
    if (height && weight && age) {
      const heightData = { value: height, type: isMetric ? CM : INCHES };
      const weightData = { value: weight, type: isMetric ? KG : LBS };
      const BMR = calculateBMR(gender, age, heightData, weightData);
      const protein = calculateProtein(weightData);
      return (
        <div className="calories">
          <div className="maintenance">{`Maintenance calories: ${calculateMaintenance(
            BMR,
            PAL
          )}`}</div>
          <div className="bmr">{`BMR: ${BMR}`}</div>
          <div className="bmr">{`Recommended minimum protein intake: ${protein}g`}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="headline">Harris-Benedict formula</div>
      <div className="Form">
        <h5>{isMetric ? "Metric" : "US"}</h5>
        <label className="switch">
          <input
            tabIndex={0}
            onChange={() => {
              setMetric(!isMetric);
              store("isMetric", !isMetric);
            }}
            type="checkbox"
            checked={!!!isMetric}
          />
          <span className="slider"></span>
        </label>
        <div className="gender">
          <h5>Gender</h5>
          <div className="gender-checkboxes">
            <label className="checkbox-container">
              Man
              <input
                tabIndex={1}
                type="checkbox"
                checked={gender === MAN}
                onChange={(e) => (gender === WOMAN ? setGender(MAN) : "")}
              />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-container">
              Woman
              <input
                tabIndex={2}
                type="checkbox"
                checked={gender === WOMAN}
                onChange={(e) => (gender === MAN ? setGender(WOMAN) : "")}
              />
              <span className="checkmark"></span>
            </label>
          </div>
          <h5>{`Height (${isMetric ? "cm" : "inches"})`}</h5>
          <div className="height">
            <input
              tabIndex={3}
              className="input"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              type="number"
              placeholder={isMetric ? "cm" : "inches"}
              min={0}
            />
          </div>
          <h5>{`Weight (${isMetric ? "kg" : "lbs"})`}</h5>
          <div className="weight">
            <input
              tabIndex={4}
              className="input"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              type="number"
              placeholder={isMetric ? "kg" : "lbs"}
              min={0}
            />
          </div>
          <h5>Age</h5>
          <div className="age">
            <input
              tabIndex={5}
              className="input"
              value={age}
              type="number"
              onChange={(e) => setAge(e.target.value)}
              placeholder=""
              min={0}
            />
          </div>
          <h5>Physical activity</h5>
          <div className="activity">
            <select
              tabIndex={6}
              defaultValue={PAL}
              onChange={(e) => setPAL(e.target.value)}
              className="selector"
            >
              <option value={1.2}>Little/no exercise</option>
              <option value={1.4}>Light exercise 1-2 times/week</option>
              <option value={1.6}>Moderate exercise 2-3 times/week</option>
              <option value={1.65}>Moderate exercise 3-4 times/week</option>
              <option value={1.75}>Hard exercise 3-5 times/week</option>
              <option value={1.85}>Hard exercise 4-6 times/week</option>
              <option value={2}>
                Physical job or hard exercise 6-7 times/week
              </option>
              <option value={2.4}>Professional athlete</option>
            </select>
            <div className="pal-value">{`Physical Activity Level (PAL): ${PAL}`}</div>
          </div>
        </div>
        {renderCalories()}
      </div>
      <article className="desc">
        This calculator will help you to estimate how much energy and nutrients
        your body needs to maintain your current weight. Please note that it may
        vary between individuals, and this result is a guideline.
      </article>
    </>
  );
}

export default Form;
