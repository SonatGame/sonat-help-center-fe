import RHFTextField from "@/components/form/RHFTextField";
import { CHART_COLORS } from "@/lib/constants/chartConfig";
import { Button, DialogActions, DialogContent, Stack } from "@mui/material";
import ColorPickerSection from "./color-picker-section";
import useColorPickerModalHooks from "./hooks";

const ChartColorPicker = ({
  elementKeys,
  handleCloseModal,
}: {
  elementKeys: string[];
  handleCloseModal: () => void;
}) => {
  const {
    charts,
    control,
    handleCancel,
    handleConfirm,
    defaultValues,
    setValue,
  } = useColorPickerModalHooks();

  const chartTypes: { [key: string]: any } = {
    column: {
      colors: defaultValues.column,
      borderRadius: defaultValues.borderRadius,
      barPercentage: defaultValues.barPercentage,
    },
    line: {
      colors: defaultValues.line,
      tension: defaultValues.tension,
      lineWidth: defaultValues.borderWidth,
    },
    pie: {
      colors: defaultValues.pie,
    },
    compare: {
      colors: defaultValues.compare,
    },
    average: {
      colors: defaultValues.average,
    },
  };

  return (
    <>
      <DialogContent>
        {Object.entries(chartTypes)
          .filter(([type]) => elementKeys.includes(type))
          .map(([type, props]) => (
            <div key={type} style={{ marginBottom: "20px" }}>
              <ColorPickerSection
                type={charts[type as keyof typeof charts]}
                initColors={props.colors}
                CHART_COLORS={CHART_COLORS[type as keyof typeof CHART_COLORS]}
                onSectionChange={setValue}
              />
              {props.borderRadius && (
                <Stack spacing={1}>
                  <RHFTextField
                    name={`${type}.borderRadius`}
                    label="Border radius"
                    control={control}
                    defaultValue={props.borderRadius}
                    TextFieldProps={{
                      InputLabelProps: {
                        shrink: true,
                      },
                      type: "number",
                      variant: "standard",
                    }}
                  />

                  {props.barPercentage && (
                    <RHFTextField
                      control={control}
                      name={`${type}.barPercentage`}
                      label="Bar percentage"
                      defaultValue={props.barPercentage}
                      TextFieldProps={{
                        InputLabelProps: {
                          shrink: true,
                        },
                        type: "number",
                        variant: "standard",
                      }}
                    />
                  )}
                </Stack>
              )}

              {props.tension && (
                <Stack spacing={1}>
                  <RHFTextField
                    name={`${type}.tension`}
                    control={control}
                    defaultValue={props.tension}
                    label="Line tension"
                    TextFieldProps={{
                      InputLabelProps: {
                        shrink: true,
                      },
                      type: "number",
                      variant: "standard",
                    }}
                  />

                  {props.lineWidth && (
                    <RHFTextField
                      name={`${type}.lineWidth`}
                      control={control}
                      label="Line width"
                      defaultValue={props.lineWidth}
                      TextFieldProps={{
                        InputLabelProps: {
                          shrink: true,
                        },
                        type: "number",
                        variant: "standard",
                      }}
                    />
                  )}
                </Stack>
              )}
            </div>
          ))}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            onClick={() => {
              handleCancel();
              handleCloseModal();
            }}
          >
            Discard
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleConfirm();
              handleCloseModal();
            }}
          >
            Confirm
          </Button>
        </Stack>
      </DialogActions>
    </>
  );
};

export default ChartColorPicker;
