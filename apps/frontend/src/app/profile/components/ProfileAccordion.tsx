import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Divider,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Props = {
    title: string;
    children: React.ReactNode;
    defaultExpanded?: boolean;
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
            sx={{
                "border": "1px solid #E5E7EB",
                "borderRadius": "4px !important",
                "overflow": "hidden",
                "&:before": { display: "none" }
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#000" }} />}
                sx={{ px: 3, py: 1 }}
            >
                <Typography
                    sx={{ fontSize: 20, fontWeight: 400, color: "#111827" }}
                >
                    {title}
                </Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails sx={{ p: 3, bgcolor: "white" }}>
                {children}
            </AccordionDetails>
        </Accordion>
    );
}
