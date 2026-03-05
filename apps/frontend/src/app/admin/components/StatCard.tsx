import {
    Typography,
    Card,
    CardContent,
    Box,
    Divider,
    Skeleton
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface StatCardProps {
    title: string;
    total: number;
    newItems: number;
    loading?: boolean;
}

const BRAND_GREEN = "#5E7749";

export const StatCard = ({
    title,
    total,
    newItems,
    loading
}: StatCardProps) => {
    const hasGrowth = newItems > 0;
    const { t } = useTranslation();

    if (loading) {
        return (
            <Card
                sx={{ borderRadius: 4, border: "1px solid #E5E7EB" }}
                elevation={0}
            >
                <CardContent sx={{ p: 3 }}>
                    <Skeleton width="40%" height={20} sx={{ mb: 1 }} />
                    <Skeleton width="30%" height={60} sx={{ mb: 2 }} />
                    <Divider sx={{ mb: 2 }} />
                    <Skeleton width="80%" height={20} />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card
            elevation={0}
            sx={{
                "borderRadius": 4,
                "border": "1px solid #E5E7EB",
                "bgcolor": "#FFFFFF",
                "height": "100%",
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
                            px: 1.2,
                            py: 0.4,
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
                            +{newItems}
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
                        {t("admin.growth_label", "GROWTH STATUS")}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: "#4B5563" }}
                    >
                        {hasGrowth
                            ? `${t("admin.growth_positive", "Expanded by")} ${newItems} ${t("admin.growth_units", "units")}`
                            : t("admin.growth_none", "No new entries")}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};
