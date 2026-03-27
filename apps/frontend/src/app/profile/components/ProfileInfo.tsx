import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import ProfileHeader from "@/app/profile/components/ProfileHeader";
import ProfileAccordion from "@/app/profile/components/ProfileAccordion";

type Props = {
    user: {
        fullName: string | null;
        email: string;
    } | null;
};

export default function ProfileInfo({ user }: Props) {
    const { t, i18n } = useTranslation();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3
            }}
        >
            <ProfileHeader
                userName={user?.fullName || "User"}
                email={user?.email || "no email available"}
            />

            <ProfileAccordion
                title={t("profile.favorites", "Your favorites")}
                defaultExpanded
            >
                <Box sx={{ py: 1 }}>
                    <Typography sx={{ fontWeight: 700, mb: 0.5 }}>
                        Job Position:
                    </Typography>
                    <Typography sx={{ color: "#4B5563" }}>
                        Baker at La Fornal
                    </Typography>
                </Box>
            </ProfileAccordion>

            <ProfileAccordion title={t("profile.support", "Support")}>
                <Typography sx={{ color: "#6B7280" }}>
                    Need help? Contact our team at support@poblaria.com
                </Typography>
            </ProfileAccordion>

            <ProfileAccordion title={t("profile.resource", "Resource")}>
                <Typography sx={{ color: "#6B7280" }}>
                    View community guidelines and documentation.
                </Typography>
            </ProfileAccordion>
        </Box>
    );
}
