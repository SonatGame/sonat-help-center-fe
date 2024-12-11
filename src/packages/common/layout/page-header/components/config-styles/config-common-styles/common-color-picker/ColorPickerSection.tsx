import palette from "@/packages/common/theme/mui/palette";
import { alpha, Box, darken, Grid, ThemeOptions } from "@mui/material";
import { useEffect, useState } from "react";
import PopoverColorPicker from "../../popover-color-picker";

interface ColorSectionProps {
  initColors: ThemeOptions | any;
  onSectionChange: (colors: ThemeOptions) => void;
}

const ColorPickerSection: React.FC<ColorSectionProps> = ({
  initColors,
  onSectionChange,
}) => {
  const [colors, setColors] = useState(initColors);

  const onColorChangeCallback = (index: number, newColor: string) => {
    let newColors;
    const lighterColor = alpha(newColor, 0.2);

    switch (index) {
      case 0:
        newColors = {
          ...colors,
          primary: {
            lighter: lighterColor,
            light: alpha(newColor, 0.5),
            main: newColor,
            dark: darken(newColor, 0.25),
            darker: darken(newColor, 0.5),
          },
          action: {
            ...colors.action,
            selected: lighterColor,
            text_hover: newColor,
            text_selected: newColor,
            checked: newColor,
          },
        };
        setColors(newColors);
        onSectionChange(newColors);
        break;
      case 1:
        newColors = {
          ...colors,
          action: { ...colors.action, hover: newColor },
        };
        setColors(newColors);
        onSectionChange(newColors);
        break;
      case 2:
        newColors = {
          ...colors,
          background: { ...colors.background, default: newColor },
        };
        setColors(newColors);
        onSectionChange(newColors);
        break;
      case 3:
        newColors = {
          ...colors,
          background: { ...colors.background, paper: newColor },
        };
        setColors(newColors);
        onSectionChange(newColors);
        break;
      case 4:
        newColors = {
          ...colors,
          text: { ...colors.text, primary: newColor },
        };
        setColors(newColors);
        onSectionChange(newColors);
        break;
      case 5:
        newColors = {
          ...colors,
          text: { ...colors.text, secondary: newColor },
        };
        setColors(newColors);
        onSectionChange(newColors);
        break;
    }
  };

  useEffect(() => {
    setColors(initColors);
  }, [initColors]);

  return (
    <Box>
      <Grid container spacing={2}>
        {[
          colors.primary?.main || palette.light.primary.main,
          colors.action?.hover || palette.light.action.hover,
          colors.background?.default || palette.light.background.default,
          colors.background?.paper || palette.light.background.paper,
          colors.text?.primary || palette.light.text.primary,
          colors.text?.secondary || palette.light.text.secondary,
        ].map((item, index) => (
          <Grid item xs={1.5} key={index}>
            <PopoverColorPicker
              index={index}
              initColor={item}
              onChangeCallback={onColorChangeCallback}
              hasLabel
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ColorPickerSection;
