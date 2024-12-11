import { convertTitlecase } from "@/lib/utils/convertTitlecase";
import { Button, Grid, Typography } from "@mui/material";
import { UseFormSetValue } from "react-hook-form";
import PopoverColorPicker from "../../popover-color-picker";
import useColorPickerSectionHooks from "./hooks";

export interface ColorSectionProps {
  type: string;
  initColors: string[];
  CHART_COLORS: string[];
  onSectionChange: UseFormSetValue<any>;
}

const ColorPickerSection: React.FC<ColorSectionProps> = ({
  type,
  initColors,
  CHART_COLORS,
  onSectionChange,
}) => {
  const {
    colors,
    onAddColor,
    onResetColor,
    onDeleteLastColor,
    onColorChangeCallback,
  } = useColorPickerSectionHooks({
    type,
    initColors,
    CHART_COLORS,
    onSectionChange,
  });

  return (
    <>
      <Grid container spacing={2} justifyContent={"space-between"}>
        <Grid item xs={4}>
          <Typography>
            <b>{convertTitlecase(type)}:</b>
          </Typography>
        </Grid>
        {type !== "average" && (
          <Grid item xs={2}>
            <Button
              style={{ width: "100%" }}
              onClick={onAddColor}
              variant="outlined"
              size="small"
            >
              Add
            </Button>
          </Grid>
        )}
        <Grid item xs={2}>
          <Button
            onClick={onResetColor}
            style={{ width: "100%" }}
            variant="outlined"
            size="small"
          >
            Reset
          </Button>
        </Grid>
        {type !== "average" && (
          <Grid item xs={4}>
            <Button
              variant="outlined"
              disabled={colors.length == 1}
              onClick={onDeleteLastColor}
              style={{ width: "100%" }}
              size="small"
            >
              Remove last
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid container spacing={2} sx={{ py: 1 }}>
        {colors.map((item, index) => (
          <Grid item xs={8} sm={4} key={item}>
            <PopoverColorPicker
              index={index}
              initColor={item}
              onChangeCallback={onColorChangeCallback}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ColorPickerSection;
