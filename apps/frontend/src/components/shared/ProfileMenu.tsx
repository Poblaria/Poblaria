"use client";

import { Menu, MenuItem, Typography, Box, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { UserResponse } from "@/app/actions/auth/me";

type ProfileMenuProps = {
    anchorEl: HTMLElement | null;
    onClose: () => void;
    user: UserResponse | null;
    onLogout: () => void;
    onViewProfile: () => void;
};

const ProfileMenu: React.FC<ProfileMenuProps> = ({
    anchorEl,
    onClose,
    user,
    onLogout,
    onViewProfile
}) => {
    const { t } = useTranslation();

    return (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={onClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            disableScrollLock
            slotProps={{
                paper: {
                    elevation: 0,
                    sx: {
                        "overflow": "visible",
                        "filter": "drop-shadow(0px 10px 30px rgba(0,0,0,0.08))",
                        "mt": 1.5,
                        "p": 1,
                        "borderRadius": "16px",
                        "border": "1px solid rgba(229, 231, 235, 0.6)",
                        "minWidth": 200,
                        "& .MuiMenuItem-root": {
                            "px": 2,
                            "py": 1.2,
                            "borderRadius": "10px",
                            "fontSize": "0.875rem",
                            "fontWeight": 600,
                            "color": "#374151",
                            "transition": "all 0.2s ease",
                            "display": "flex",
                            "alignItems": "center",
                            "gap": 1.5,
                            "&:hover": {
                                bgcolor: "#F9FAFB",
                                color: "#5E7749",
                                transform: "translateX(4px)"
                            }
                        }
                    }
                }
            }}
        >
            <Box sx={{ px: 2, py: 1.5 }}>
                <Typography
                    sx={{
                        fontSize: "0.7rem",
                        color: "#9CA3AF",
                        fontWeight: 700,
                        textTransform: "uppercase"
                    }}
                >
                    {t("navbar.logged_in_as")}
                </Typography>
                <Typography
                    sx={{
                        fontSize: "0.95rem",
                        fontWeight: 700,
                        color: "#111827",
                        mt: 0.5
                    }}
                >
                    {user?.fullName || user?.email}
                </Typography>
            </Box>
            <Divider sx={{ my: 1, opacity: 0.6 }} />
            <MenuItem onClick={onViewProfile}>
                <PersonIcon sx={{ fontSize: 20, opacity: 0.7 }} />
                {t("navbar.view_profile")}
            </MenuItem>
            <MenuItem
                onClick={onLogout}
                sx={{
                    "&:hover": {
                        color: "#DC2626 !important",
                        bgcolor: "rgba(220, 38, 38, 0.04) !important"
                    }
                }}
            >
                <LogoutIcon sx={{ fontSize: 20, opacity: 0.7 }} />
                {t("navbar.logout")}
            </MenuItem>
        </Menu>
    );
};

export default ProfileMenu;
