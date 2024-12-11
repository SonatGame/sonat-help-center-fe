export const fontSizeValues = () => {
  const fontSizeValues = [];
  for (let i = 6; i <= 96; i++) fontSizeValues.push({ value: i, label: i });
  return fontSizeValues;
};

export const fontWeightValues = () => {
  const fontWeightValues = [];
  for (let i = 100; i <= 900; i += 100)
    fontWeightValues.push({ value: i, label: i });
  return fontWeightValues;
};
