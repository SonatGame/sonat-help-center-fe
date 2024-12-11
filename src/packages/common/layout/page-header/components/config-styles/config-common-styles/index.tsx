import InputLabelCustom from "@/components/form/InputLabel";
import { ThemeMode } from "@/lib/constants/defaultTheme";
import ColorPickerSection from "@/packages/common/layout/page-header/components/config-styles/config-common-styles/common-color-picker/ColorPickerSection";
import { LightMode, NightlightOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { fontFamilyValues } from "./constants";
import useConfigCommonStyles from "./hooks";

export interface PageHeaderProps {
  isModalOpen: boolean;
  setIsModalOpen: any;
}

const modeList = [
  {
    key: ThemeMode.LIGHT,
    value: ThemeMode.LIGHT,
    icon: <LightMode />,
    label: "Light",
  },
  {
    key: ThemeMode.DARK,
    value: ThemeMode.DARK,
    icon: <NightlightOutlined />,
    label: "Dark",
  },
];

export const commonKeys: any = [
  {
    value: "fontFamily",
    label: "Font family",
    optionValues: fontFamilyValues.map((item) => {
      return { value: [item, "sans-serif"].join(","), label: item };
    }),
  },
  // {
  //   value: "fontSize",
  //   label: "Font Size",
  //   optionValues: fontSizeValues(),
  // },
  // {
  //   value: "fontWeightBold",
  //   label: "Font Weight for Bold Text and Heading",
  //   optionValues: fontWeightValues(),
  // },
  // {
  //   value: "fontWeightRegular",
  //   label: "Font Weight for Normal Text",
  //   optionValues: fontWeightValues(),
  // },
];

const ConfigCommonStyles = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const {
    modeColor,
    handleMode,
    initLightColors,
    onSectionLightChange,
    initDarkColors,
    onSectionDarkChange,
    initCommon,
    initShape,
    handleCommon,
    handleBorderRadius,
    onCancel,
    onSave,
    onReset,
  } = useConfigCommonStyles();

  return (
    <>
      <DialogContent>
        <Stack spacing={2}>
          <Stack spacing={1}>
            <Typography>
              <b>Mode</b>
            </Typography>

            <Box>
              <ToggleButtonGroup
                value={modeColor}
                exclusive
                onChange={handleMode}
                aria-label="text alignment"
              >
                {modeList.map((item, index) => (
                  <ToggleButton
                    value={item.value}
                    aria-label="left aligned"
                    key={`${item.key}.${index}`}
                  >
                    <Grid container>
                      <Grid item xs={12}>
                        {item.icon}
                      </Grid>
                      <Grid item xs={12}>
                        {item.label}
                      </Grid>
                    </Grid>
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
          </Stack>

          {modeColor === ThemeMode.LIGHT ? (
            <ColorPickerSection
              initColors={initLightColors}
              onSectionChange={onSectionLightChange}
            />
          ) : (
            <ColorPickerSection
              initColors={initDarkColors}
              onSectionChange={onSectionDarkChange}
            />
          )}

          <Stack spacing={1}>
            <Typography>
              <b>Typography</b>
            </Typography>

            {commonKeys.map((key: any, index: number) => (
              <Stack spacing={0.5} key={`${key.value}.${index}`}>
                <InputLabelCustom
                  variant="standard"
                  htmlFor="uncontrolled-native"
                >
                  {key.label}
                </InputLabelCustom>

                <Select
                  size="small"
                  value={initCommon[key.value]}
                  onChange={handleCommon(index)}
                  sx={{ width: "100%" }}
                  MenuProps={{
                    sx: {
                      maxHeight: 320,
                    },
                  }}
                >
                  {key.optionValues?.map((option: any, index: number) => (
                    <MenuItem
                      value={option.value}
                      key={`${option.value}.${index}`}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            ))}
          </Stack>

          <Stack spacing={1}>
            <Typography>
              <b>Shape</b>
            </Typography>

            <Stack spacing={0.5}>
              <InputLabelCustom
                variant="standard"
                htmlFor="uncontrolled-native"
              >
                Border Radius
              </InputLabelCustom>
              <TextField
                size="small"
                id="border-radius"
                type="number"
                value={initShape}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleBorderRadius}
              />
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            onClick={() => {
              onCancel();
              handleCloseModal();
            }}
          >
            Discard
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              onSave();
              handleCloseModal();
            }}
          >
            Confirm
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              onReset();
              handleCloseModal();
            }}
          >
            Reset All
          </Button>
        </Stack>
      </DialogActions>
    </>
  );
};

export default ConfigCommonStyles;
