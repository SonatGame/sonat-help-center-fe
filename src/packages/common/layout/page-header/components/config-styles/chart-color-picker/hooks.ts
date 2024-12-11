import { useChartConfig } from "@/contexts/chartConfigContext";
import { useForm } from "react-hook-form";

export default function useColorPickerModalHooks() {
  const charts = {
    column: "column",
    line: "line",
    pie: "pie",
    compare: "compare",
    average: "average",
  };
  const {
    columnColors: systemColumnColors,
    lineColors: systemLineColors,
    borderRadius: systemBorderRadius,
    tension: systemTension,
    borderWidth: systemBorderWidth,
    barPercentage: systemBarPercentage,
    pieColors: systemPieColors,
    compareColors: systemCompareColors,
    averageColors: systemAverageColors,
    setColumnColors: setSystemColumnColors,
    setLineColors: setSystemLineColors,
    setPieColors: setSystemPieColors,
    setCompareColors: setSystemCompareColors,
    setAverageColors: setSystemAverageColors,
    setBorderRadius: setSystemBorderRadius,
    setTension: setSystemTension,
    setBorderWidth: setSystemBorderWidth,
    setBarPercentage: setSystemBarPercentage,
  } = useChartConfig();

  const defaultValues = {
    column: systemColumnColors,
    line: systemLineColors,
    pie: systemPieColors,
    borderRadius: systemBorderRadius,
    tension: systemTension,
    borderWidth: systemBorderWidth,
    barPercentage: systemBarPercentage,
    compare: systemCompareColors,
    average: systemAverageColors,
  };

  const { handleSubmit, control, reset, setValue } = useForm({ defaultValues });

  const handleCancel = () => {
    reset(defaultValues);
  };

  const handleConfirm = handleSubmit((data) => {
    setSystemColumnColors(data.column);
    setSystemLineColors(data.line);
    setSystemPieColors(data.pie);
    setSystemAverageColors(data.average);
    setSystemBorderRadius(data.borderRadius);
    setSystemTension(data.tension);
    setSystemBorderWidth(data.borderWidth);
    setSystemBarPercentage(data.barPercentage);
    setSystemCompareColors(data.compare);
  });

  return {
    charts,
    control,
    handleCancel,
    handleConfirm,
    defaultValues,
    setValue,
  };
}
