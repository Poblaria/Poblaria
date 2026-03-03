import { Typography, Card, CardContent, Box, Divider } from "@mui/material";

interface StatCardProps {
    title: string;
    total: number;
    newItems: number;
}

const BRAND_GREEN = "#5E7749";

export const StatCard = ({ title, total, newItems }: StatCardProps) => {
    const hasGrowth = newItems > 0;

    const statusText = hasGrowth
        ? `Database expanded by ${newItems} units in last 30 days`
        : `Database maintained at ${total} ${total === 1 ? "unit" : "units"} (No new entries)`;

    return (
        <Card
            elevation={0}
            sx={{
                "flex": "1 1 300px",
                "borderRadius": 4,
                "border": "1px solid #E5E7EB",
                "bgcolor": "#FFFFFF",
                "transition": "all 0.2s ease-in-out",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
                }
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Typography
                    variant="overline"
                    sx={{
                        color: "#6B7280",
                        fontWeight: 700,
                        letterSpacing: "0.1em"
                    }}
                >
                    {title}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "baseline",
                        mt: 1,
                        mb: 2
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{ fontWeight: 800, color: BRAND_GREEN, mr: 2 }}
                    >
                        {total.toLocaleString()}
                    </Typography>
                    <Box
                        sx={{
                            bgcolor: hasGrowth ? "#ECFDF5" : "#F3F4F6",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1.5
                        }}
                    >
                        <Typography
                            variant="caption"
                            sx={{
                                color: hasGrowth ? "#059669" : "#6B7280",
                                fontWeight: 700
                            }}
                        >
                            +{newItems} new
                        </Typography>
                    </Box>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Box>
                    <Typography
                        variant="caption"
                        display="block"
                        sx={{ color: "#9CA3AF", fontWeight: 600, mb: 0.5 }}
                    >
                        GROWTH STATUS
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 600,
                            color: "#4B5563",
                            lineHeight: 1.4
                        }}
                    >
                        {statusText}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};
