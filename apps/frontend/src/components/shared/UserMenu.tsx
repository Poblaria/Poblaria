import { Menu, MenuItem, Divider } from "@mui/material";
import Link from "next/link";
import { useTranslation } from "react-i18next";

type UserMenuProps = {
    anchorEl: HTMLElement | null;
    onClose: () => void;
    onLogout: () => void;
};

const UserMenu: React.FC<UserMenuProps> = ({ anchorEl, onClose, onLogout }) => {
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
                        "filter": "drop-shadow(0px 10px 30px rgba(0,0,0,0.1))",
                        "mt": 1.5,
                        "p": 1,
                        "borderRadius": "16px",
                        "border": "1px solid rgba(229, 231, 235, 0.6)",
                        "minWidth": 220,
                        "& .MuiMenuItem-root": {
                            "px": 2,
                            "py": 1.2,
                            "borderRadius": "10px",
                            "fontSize": "0.875rem",
                            "fontWeight": 600,
                            "color": "#374151",
                            "transition": "all 0.2s ease",
                            "&:hover": {
                                bgcolor: "#F9FAFB",
                                color: "#5E7749",
                                transform: "translateX(4px)"
                            }
                        },
                        "& .MuiDivider-root": {
                            my: 1,
                            borderColor: "rgba(0,0,0,0.04)"
                        }
                    }
                }
            }}
        >
            <MenuItem component={Link} href="/profile">
                {t("navbar.profile")}
            </MenuItem>

            <MenuItem component={Link} href="/">
                {t("admin.menu.client_view", "Switch to Client View")}
            </MenuItem>

            <Divider />

            <MenuItem
                onClick={onLogout}
                sx={{
                    "color": "#DC2626 !important",
                    "&:hover": {
                        bgcolor: "#FEF2F2 !important",
                        color: "#B91C1C !important"
                    }
                }}
            >
                {t("admin.menu.logout", "Logout")}
            </MenuItem>
        </Menu>
    );
};

export default UserMenu;
