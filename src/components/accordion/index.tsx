import {
  ExpandMoreRounded,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import { styled, useTheme } from "@mui/material/styles";
import { ReactNode, useState } from "react";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 12,
  boxShadow: "none",
  backgroundColor: theme.palette.grey[50],
  overflow: "hidden",
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ExpandMoreRounded />} {...props} />
))(({ theme }) => ({
  minHeight: 76,
  paddingLeft: 16,
  paddingRight: 16,
  "& .MuiAccordionSummary-expandIconWrapper": {
    display: "none",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  paddingTop: 0,
  paddingBottom: 0,
  paddingRight: theme.spacing(3),
  paddingLeft: theme.spacing(3),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

interface IProps {
  summary: ReactNode;
  detail: ReactNode;
}

export default function StyledAccordion(props: IProps) {
  const { summary, detail } = props;
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <AccordionSummary>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
          sx={{ width: "100%" }}
        >
          {summary}
          <Box
            sx={{
              backgroundColor: theme.palette.background.paper,
              border: 1,
              borderColor: theme.palette.divider,
              borderRadius: 1,
              width: 32,
              height: 32,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!expanded ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
          </Box>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>{detail}</AccordionDetails>
    </Accordion>
  );
}
