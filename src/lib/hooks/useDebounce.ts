import debounce from "lodash/debounce";
import { useEffect, useState } from "react";

export default function useDebounce(value: any, delay: number = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const exeDebounce = debounce(() => {
      setDebouncedValue(value);
    }, delay);
    exeDebounce();
    return () => {
      exeDebounce.cancel();
    };
  }, [value, delay]);

  return debouncedValue;
}
