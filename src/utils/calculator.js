import { CM, inchesMultiplier, KG, lbsMultiplier, MAN } from "./constants";

export const calculateBMR = (gender, age, heightData, weightData) => {
  const weight =
    weightData.type === KG ? kgToLbs(weightData.value) : weightData.value;
  const height =
    heightData.type === CM ? cmToInches(heightData.value) : heightData.value;

  if (gender === MAN) {
    return maleBMRFormula(age, weight, height);
  }
  return femaleBMRFormula(age, weight, height);
};

export const calculateMaintenance = (bmr, PAL) => Math.ceil(bmr * PAL);

export const calculateProtein = (weightData) => {
  const weight =
    weightData.type === KG ? kgToLbs(weightData.value) : weightData.value;
  return Math.ceil(weight * 0.8);
};

const maleBMRFormula = (age, weight, height) =>
  Math.ceil(66 + 6.3 * weight + 12.9 * height - 6.8 * age);

const femaleBMRFormula = (age, weight, height) =>
  Math.ceil(655 + 4.3 * weight + 4.7 * height - 4.7 * age);

const kgToLbs = (kg) => {
  return kg * lbsMultiplier;
};

const cmToInches = (cm) => {
  return cm / inchesMultiplier;
};
