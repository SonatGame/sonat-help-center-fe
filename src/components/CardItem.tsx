import { convertNumber } from "@/lib/utils/convertNumber";
import {
  displayDifference,
  getBackgroundColor,
  getTextColor,
} from "@/packages/analytics/home/helpers";
import { HelpOutline, MoreVert } from "@mui/icons-material";
import {
  Card,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import ChipPopover from "./chip-popover";

export enum Unit {
  text,
  number,
  currency,
  percentage,
}

export function formatValue(value: number, unit: Unit) {
  switch (unit) {
    case Unit.currency:
      return `$${convertNumber(value)}`;
    case Unit.percentage:
      return `${(value * 100).toFixed(1)}%`;
    case Unit.number:
      return `${convertNumber(value)}`;
    default:
      return value;
  }
}

interface ICardItemProps {
  name: string;
  unit: Unit;
  value: number | string;
  prevValue?: number | string;
  isLoading: boolean;
  note?: string;
  hasAction?: false;
  action?: React.ReactNode;
}

interface ICardItemWithActionsProps {
  name: string;
  unit: Unit;
  value: number | string;
  prevValue?: number | string;
  isLoading: boolean;
  note?: string;
  hasAction: true;
  action: React.ReactNode;
}

export default function CardItem(
  props: ICardItemProps | ICardItemWithActionsProps
) {
  const {
    name,
    unit,
    isLoading,
    prevValue,
    value,
    note,
    hasAction = false,
    action,
  } = props;
  const theme = useTheme();
  const [isMouseOver, setIsMouseOver] = useState(false);

  return (
    <Card
      sx={{
        height: 1,
        position: "relative",
      }}
      onMouseOver={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={1.5}
        sx={{
          px: 2,
          py: 4,
          position: "relative",
          borderRadius: 1.5,
          minHeight: 156,
        }}
      >
        <Typography
          variant="subtitle2"
          color="text.secondary"
          textAlign="center"
        >
          {name}
        </Typography>
        {isLoading ? (
          <Stack direction="row" alignItems="center" spacing={1} height={30}>
            <Skeleton variant="rounded" width={80} />
            <Skeleton variant="rounded" width={30} />
          </Stack>
        ) : (
          <Stack direction="row" alignItems="center" spacing={1} height={30}>
            <Typography variant="h5">
              {typeof value === "number" ? formatValue(value, unit) : value}
            </Typography>
            {prevValue !== undefined &&
              prevValue !== null &&
              typeof prevValue === "number" &&
              typeof value === "number" && (
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    px: 1,
                    py: 0.3,
                    borderRadius: 1.5,
                    color: getTextColor(value - prevValue),
                    background: getBackgroundColor(value - prevValue),
                  }}
                >
                  <Typography variant="caption" fontWeight={500}>
                    {displayDifference(value - prevValue, value)}
                  </Typography>
                </Stack>
              )}
          </Stack>
        )}
      </Stack>

      {isMouseOver && (
        <Stack
          spacing={0.5}
          direction="row"
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          {note && (
            <Tooltip
              title={<Typography variant="body2">{note}</Typography>}
              placement="top"
              sx={{
                backgroundColor: theme.palette.background.paper,
              }}
              PopperProps={{
                sx: { borderRadius: 1.5 },
              }}
            >
              <HelpOutline />
            </Tooltip>
          )}

          {hasAction && (
            <ChipPopover
              width={24}
              height={24}
              sx={{
                minHeight: 24,
                backgroundColor: theme.palette.background.paper,
                borderColor: "transparent",

                "&:hover": {
                  borderColor: (theme) => theme.palette.action.hover,
                  backgroundColor: (theme) => theme.palette.action.hover,
                },
              }}
              popoverProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "right",
                },
              }}
              label={<MoreVert fontSize="small" color="primary" />}
              popoverChildren={action}
            />
          )}
        </Stack>
      )}
    </Card>
  );
}
