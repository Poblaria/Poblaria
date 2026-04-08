"use client";

import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import ProfileHeader from "@/app/profile/components/ProfileHeader";
import ProfileAccordion from "@/app/profile/components/ProfileAccordion";
import IconButton from "@mui/material/IconButton";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import Link from "next/link";

type Props = {
    user: {
        fullName: string | null;
        email: string;
    } | null;
};

export default function ProfileInfo({ user }: Props) {
    const { t } = useTranslation();

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
            />

            <ProfileAccordion
                title={t("profile.favorites", "Your favorites")}
                defaultExpanded
            >
                <Box sx={{ py: 1 }}>
                    <Link href="/explore" passHref>
                        <IconButton aria-label="add">
                            <AddSharpIcon />
                        </IconButton>
                    </Link>
                </Box>
            </ProfileAccordion>

            <ProfileAccordion title={t("profile.support", "Support")}>
                <Typography sx={{ color: "#6B7280" }}>
                    {t(
                        "profile.supportPlaceholder",
                        "Add support content here."
                    )}
                </Typography>
            </ProfileAccordion>

            <ProfileAccordion title={t("profile.resource", "Resource")}>
                <Typography sx={{ color: "#6B7280" }}>
                    {t(
                        "profile.resourcePlaceholder",
                        "Add resource links here."
                    )}
                </Typography>
            </ProfileAccordion>
        </Box>
    );
}
