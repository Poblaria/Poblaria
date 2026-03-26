import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Divider, Typography } from "@mui/material";

type Props = {
    title: string;
    children: React.ReactNode;
    defaultExpanded?: boolean;
};

const accordionSx = {
    "border": "1px solid #E5E7EB",
    "borderRadius": 1,
    "&:before": { display: "none" }
};

export default function ProfileAccordion({
    title,
    children,
    defaultExpanded
}: Props) {
    return (
        <Accordion
            defaultExpanded={defaultExpanded}
            disableGutters
            elevation={0}
            sx={accordionSx}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                    sx={{ fontSize: 22, fontWeight: 500, color: "#111827" }}
                >
                    {title}
                </Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails sx={{ py: 3 }}>{children}</AccordionDetails>
        </Accordion>
    );
}
