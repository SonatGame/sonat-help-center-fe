import { LocalTheme, ThemeMode } from "@/lib/constants/defaultTheme";
import { ThemeModeContext } from "@/packages/common/theme/mui";
import palette from "@/packages/common/theme/mui/palette";
import typography from "@/packages/common/theme/mui/typography";
import { PaletteMode } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";

export default function useConfigStylesDialog() {
  const themeModeController = useContext(ThemeModeContext);
  const [curLight, setCurLight] = useState<any>();
  const [curDark, setCurDark] = useState<any>();
  const [curCommon, setCurCommon] = useState<any>();

  const [lightColors, setLightColors] = useLocalStorage(LocalTheme.light, "");
  const [darkColors, setDarkColors] = useLocalStorage(LocalTheme.dark, "");
  const [modeColor, setModeColor] = useLocalStorage(
    LocalTheme.ThemeMode,
    ThemeMode.LIGHT
  );
  const [shape, setShape] = useLocalStorage(LocalTheme.ThemeShape, "");

  const initLightColors = lightColors
    ? JSON.parse(lightColors)?.palette || JSON.parse(lightColors)
    : palette.light;
  const initDarkColors = darkColors
    ? JSON.parse(darkColors)?.palette || JSON.parse(darkColors)
    : palette.dark;
  const initShape = shape ? Number(JSON.parse(shape)) : 8;

  const commonV2LocalStorage = useReadLocalStorage(
    LocalTheme.commonV2
  ) as string;
  const commonV2 = commonV2LocalStorage ? JSON.parse(commonV2LocalStorage) : "";

  const initCommon = commonV2 || typography;

  const [common, setCommon] = useLocalStorage(
    LocalTheme.commonV2,
    JSON.stringify(initCommon)
  );

  const onReset = () => {
    setLightColors(JSON.stringify(palette.light));
    setDarkColors(JSON.stringify(palette.dark));
    setCommon(JSON.stringify(typography));
    themeModeController.markChange();
  };

  const onSave = () => {
    setCurLight(lightColors);
    setCurDark(darkColors);
    setCurCommon(common);
  };

  const handleMode = (
    event: React.MouseEvent<HTMLElement>,
    newMode: string
  ) => {
    if (newMode) {
      setModeColor(newMode as PaletteMode);
      themeModeController.markChange();
    }
  };

  const onSectionLightChange = (newColors: any) => {
    const newObj = JSON.stringify(newColors);
    setLightColors(newObj);
    themeModeController.markChange();
  };

  const onSectionDarkChange = (newColors: any) => {
    const newObj = JSON.stringify(newColors);
    setDarkColors(newObj);
    themeModeController.markChange();
  };

  const handleCommon = (index: number) => (event: any) => {
    const value = event.target.value;
    // if (index !== 2) {
    const newObj = {
      ...initCommon,
      fontFamily: value,
    };
    setCommon(JSON.stringify(newObj));
    // } else {
    //   const newObj = {
    //     ...initCommon,
    //     typography: {
    //       ...initCommon.typography,
    //       [commonKeys[index].value]: value,
    //       h1: {
    //         // ...initCommon.typography.h1,
    //         fontWeight: value,
    //       },
    //       h2: {
    //         // ...initCommon.typography.h2,
    //         fontWeight: value,
    //       },
    //       h3: {
    //         //...initCommon.typography.h3,
    //         fontWeight: value,
    //       },
    //       h4: {
    //         // ...initCommon.typography.h4,
    //         fontWeight: value,
    //       },
    //       h5: {
    //         //  ...initCommon.typography.h5,
    //         fontWeight: value,
    //       },
    //       h6: {
    //         //  ...initCommon.typography.h6,
    //         fontWeight: value,
    //       },
    //     },
    //   };

    //   setCommon(JSON.stringify(newObj));
    // }

    themeModeController.markChange();
  };

  const handleBorderRadius = (event: any) => {
    const value = parseInt(event.target.value);
    setShape(JSON.stringify(value));
    themeModeController.markChange();
  };

  const onCancel = () => {
    setLightColors(curLight ?? palette.light);
    setDarkColors(curDark ?? palette.dark);
    setCommon(curCommon ?? typography);
    themeModeController.markChange();
  };
  useEffect(() => {
    setCurLight(lightColors);
    setCurDark(darkColors);
    setCurCommon(common);
  }, []);

  return {
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
  };
}
