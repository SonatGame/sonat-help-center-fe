import ChipPopover, { IChipPopoverRef } from "@/components/chip-popover";
import { Close } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface LevelRangeProps<T extends FieldValues> {
  label?: string;
  watch: UseFormWatch<T>;
  control: Control<T, any>;
  setValue: UseFormSetValue<T>;
  startLevel?: number;
  endLevel?: number;
  startLevelValueName: FieldPath<T>;
  endLevelValueName: FieldPath<T>;
  hasRemoveButton?: boolean;
}

export default function LevelRangePickerChip<T extends FieldValues>(
  props: LevelRangeProps<T>
) {
  const {
    label,
    watch,
    setValue,
    startLevel,
    endLevel,
    startLevelValueName,
    endLevelValueName,
    hasRemoveButton = false,
  } = props;
  const ref = useRef<IChipPopoverRef>(null);
  const [currentStartLevel, setCurrentStartLevel] = useState(startLevel);
  const [currentEndLevel, setCurrentEndLevel] = useState(endLevel);

  const startLevelVal = watch(startLevelValueName);
  const endLevelVal = watch(endLevelValueName);

  const handleClose = () => {
    ref.current?.handleClose();
  };

  const resetLevelRange = () => {
    setCurrentStartLevel(startLevel);
    setCurrentEndLevel(endLevel);
  };

  useEffect(() => {
    resetLevelRange();
  }, [startLevel, endLevel]);

  return (
    <>
      <ChipPopover
        ref={ref}
        label={
          <Stack
            width={1}
            direction="row"
            spacing={1}
            justifyContent="flex-start"
            alignItems="center"
          >
            <Typography
              variant="body2"
              color="text.secondary"
              lineHeight={1.2}
              fontWeight={500}
            >
              {label ?? "Level range"}
            </Typography>
            {startLevelVal !== undefined && endLevelVal !== undefined && (
              <Typography
                variant="subtitle2"
                fontWeight={600}
                lineHeight={1.2}
                sx={{ display: "flex", alignItems: "center" }}
              >
                {startLevelVal} {" - "}
                {endLevelVal}
              </Typography>
            )}

            {hasRemoveButton &&
              startLevelVal !== undefined &&
              endLevelVal !== undefined && (
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    setValue(
                      startLevelValueName,
                      undefined as PathValue<T, Path<T>>
                    );
                    setValue(
                      endLevelValueName,
                      undefined as PathValue<T, Path<T>>
                    );
                  }}
                >
                  <Close sx={{ fontSize: 16 }} />
                </IconButton>
              )}
          </Stack>
        }
        popoverChildren={
          <Stack
            spacing={1.5}
            p={1.5}
            direction="row"
            alignItems="center"
            height={50}
          >
            <TextField
              sx={{ width: 160 }}
              value={currentStartLevel ?? ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Min</InputAdornment>
                ),
              }}
              onChange={(e) => {
                const value = Number(e.target.value);
                setCurrentStartLevel(value);
              }}
            />

            <div>{"-"}</div>

            <TextField
              sx={{ width: 160 }}
              type="number"
              inputProps={{
                step: 1,
              }}
              value={currentEndLevel ?? ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Max</InputAdornment>
                ),
              }}
              onChange={(e) => {
                const value = Number(e.target.value);
                setCurrentEndLevel(value);
              }}
            />

            <Button
              variant="contained"
              onClick={() => {
                setValue(
                  startLevelValueName,
                  currentStartLevel as PathValue<T, Path<T>>
                );
                setValue(
                  endLevelValueName,
                  currentEndLevel as PathValue<T, Path<T>>
                );
                handleClose();
              }}
              disabled={
                currentStartLevel === undefined ||
                currentEndLevel === undefined ||
                (currentStartLevel !== undefined && currentStartLevel < 0) ||
                (currentEndLevel !== undefined && currentEndLevel < 0) ||
                (currentStartLevel !== undefined &&
                  currentEndLevel !== undefined &&
                  currentStartLevel > currentEndLevel)
              }
            >
              Apply
            </Button>
          </Stack>
        }
      />
    </>
  );
}
