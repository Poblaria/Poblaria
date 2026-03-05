import { Menu, MenuItem, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import useSupportedLanguages from "@/utils/languageUtils";

type LanguageMenuProps ={
    anchorEl: HTMLElement | null;
    onClose: () => void;
    onSelectLanguage: (code: string) => void;
}

const LanguageMenu: React.FC<LanguageMenuProps> = ({
    anchorEl,
    onClose,
    onSelectLanguage
}) => {
    const { t, i18n } = useTranslation();
    const supportedLanguages = useSupportedLanguages();

    const getLanguageLabel = (code: string) =>
        t(`languages.${code}`, code.toUpperCase());

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
                        "minWidth": 160,
                        "& .MuiMenuItem-root": {
                            "px": 2,
                            "py": 1.2,
                            "borderRadius": "10px",
                            "fontSize": "0.875rem",
                            "fontWeight": 600,
                            "color": "#374151",
                            "transition": "all 0.2s ease",
                            "display": "flex",
                            "justifyContent": "space-between",
                            "alignItems": "center",
                            "&:hover": {
                                bgcolor: "#F9FAFB",
                                color: "#5E7749",
                                transform: "translateX(4px)"
                            },
                            "&.Mui-selected": {
                                "bgcolor": "rgba(94, 119, 73, 0.08)",
                                "color": "#5E7749",
                                "&:hover": {
                                    bgcolor: "rgba(94, 119, 73, 0.12)"
                                }
                            }
                        }
                    }
                }
            }}
        >
            {supportedLanguages.map((code) => (
                <MenuItem
                    key={code}
                    selected={code === i18n.language}
                    onClick={() => onSelectLanguage(code)}
                >
                    <Typography variant="inherit">
                        {getLanguageLabel(code)}
                    </Typography>
                    {code === i18n.language && (
                        <Box
                            sx={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                bgcolor: "#5E7749",
                                ml: 2
                            }}
                        />
                    )}
                </MenuItem>
            ))}
        </Menu>
    );
};

export default LanguageMenu;
