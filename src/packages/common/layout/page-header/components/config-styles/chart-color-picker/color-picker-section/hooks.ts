import { useRemoteConfig } from "@/contexts/remoteConfigContext";
import { useState } from "react";
import { ColorSectionProps } from ".";

export default function useColorPickerSectionHooks({
  type,
  initColors,
  CHART_COLORS,
  onSectionChange,
}: ColorSectionProps) {
  const { chartConfig } = useRemoteConfig();
  const [colors, setColors] = useState(initColors);

  const onAddColor = () => {
    let newColors = [...colors, "#aabbcc"];
    setColors(newColors);
    onSectionChange(type, newColors);
  };

  const onResetColor = () => {
    let chartColorList = CHART_COLORS;

    if (chartConfig && chartConfig[type as keyof typeof chartConfig])
      chartColorList = chartConfig.data[
        type as keyof typeof chartConfig.data
      ] as string[];

    setColors(chartColorList);
    onSectionChange(type, chartColorList);
  };

  const onDeleteLastColor = () => {
    let newColors = colors.slice(0, -1);
    setColors(newColors);
    onSectionChange(type, newColors);
  };

  const onColorChangeCallback = (index: number, newColor: string) => {
    let newColors = [...colors];
    newColors[index] = newColor;
    setColors(newColors);
    onSectionChange(type, newColors);
  };

  return {
    colors,
    onAddColor,
    onResetColor,
    onDeleteLastColor,
    onColorChangeCallback,
  };
}
