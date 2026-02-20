"use client";

import { useMemo, useState } from "react";
import {
    Box,
    Button,
    Divider,
    Paper,
    Stack,
    Typography,
    Chip
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import { useRouter } from "next/navigation";
import PostTypeDialog from "@/components/admin/PostTypeDialog";

type MiniPost = { id: number; title: string; createdAt: string };
type Filter = "All" | "Properties" | "Jobs";

const colors = {
    primary: "#5E7749",
    bg: "#EEF1EA",
    text: "#2E3A28",
    muted: "rgba(46,58,40,0.65)",
    border: "rgba(0,0,0,0.08)"
};

function FilterChips({
    value,
    onChange
}: {
    value: Filter;
    onChange: (v: Filter) => void;
}) {
    const chipSx = (active: boolean) => ({
        "mr": 1,
        "mb": 1,
        "fontWeight": 900,
        "cursor": "pointer",
        "borderRadius": 999,
        "px": 1,
        "transition": "background-color 0.2s, color 0.2s, border-color 0.2s",
        "bgcolor": active ? colors.primary : "transparent",
        "color": active ? "#fff" : colors.primary,
        "borderColor": active ? colors.primary : "rgba(94,119,73,0.35)",
        "&:hover": {
            bgcolor: active ? colors.primary : "rgba(94,119,73,0.10)"
        }
    });

    return (
        <Stack direction="row" alignItems="center" sx={{ flexWrap: "wrap" }}>
            {(["All", "Properties", "Jobs"] as const).map((c) => {
                const active = value === c;
                return (
                    <Chip
                        key={c}
                        label={c}
                        variant={active ? "filled" : "outlined"}
                        onClick={() => onChange(c)}
                        sx={chipSx(active)}
                    />
                );
            })}
        </Stack>
    );
}

function PostRow({
    title,
    createdAt,
    onClick
}: {
    title: string;
    createdAt: string;
    onClick: () => void;
}) {
    return (
        <Paper
            variant="outlined"
            onClick={onClick}
            sx={{
                "p": 1.5,
                "borderRadius": 3,
                "cursor": "pointer",
                "display": "flex",
                "alignItems": "center",
                "gap": 1.5,
                "borderColor": colors.border,
                "transition": "0.15s",
                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.06)",
                    borderColor: "rgba(94,119,73,0.35)"
                }
            }}
        >
            {/* Thumbnail placeholder (we need to change it for the real images) */}
            <Box
                sx={{
                    width: 78,
                    height: 58,
                    borderRadius: 2.5,
                    bgcolor: "rgba(94,119,73,0.12)",
                    flexShrink: 0
                }}
            />

            <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                <Typography sx={{ fontWeight: 900, color: colors.text }} noWrap>
                    {title}
                </Typography>
                <Typography variant="body2" sx={{ color: colors.muted }}>
                    Created: {createdAt}
                </Typography>
            </Box>

            <ArrowForwardRoundedIcon sx={{ color: colors.primary }} />
        </Paper>
    );
}

function SectionCard({
    icon,
    title,
    subtitle,
    items,
    onItemClick,
    footerAction
}: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    items: MiniPost[];
    onItemClick: (id: number) => void;
    footerAction: React.ReactNode;
}) {
    return (
        <Paper
            elevation={0}
            sx={{
                flex: 1,
                p: { xs: 2, sm: 3 },
                borderRadius: 4,
                bgcolor: "#fff",
                border: `1px solid ${colors.border}`
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                mb={1.5}
            >
                <Stack direction="row" spacing={1.25} alignItems="center">
                    <Box
                        sx={{
                            display: "grid",
                            placeItems: "center",
                            color: colors.primary
                        }}
                    >
                        {icon}
                    </Box>
                    <Box>
                        <Typography
                            sx={{ fontWeight: 900, color: colors.text }}
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: colors.muted }}
                        >
                            {subtitle}
                        </Typography>
                    </Box>
                </Stack>
            </Stack>

            <Divider sx={{ mb: 2 }} />

            <Stack spacing={1.2}>
                {items.map((p) => (
                    <PostRow
                        key={p.id}
                        title={p.title}
                        createdAt={p.createdAt}
                        onClick={() => onItemClick(p.id)}
                    />
                ))}

                {items.length === 0 && (
                    <Typography sx={{ opacity: 0.7 }}>No posts yet.</Typography>
                )}

                {footerAction}
            </Stack>
        </Paper>
    );
}

export default function AdminPage() {
    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState<Filter>("All");
    const router = useRouter();

    // TODO: we need to replace with backend results
    const housing: MiniPost[] = [
        { id: 1, title: "Cozy Studio in Braga", createdAt: "2026-02-06" },
        { id: 2, title: "T2 near University", createdAt: "2026-02-05" }
    ];

    const jobs: MiniPost[] = [
        { id: 10, title: "Barista (Part-time)", createdAt: "2026-02-06" },
        { id: 11, title: "Construction Helper", createdAt: "2026-02-04" }
    ];

    const showHousing = useMemo(
        () => filter === "All" || filter === "Properties",
        [filter]
    );
    const showJobs = useMemo(
        () => filter === "All" || filter === "Jobs",
        [filter]
    );

    return (
        <Box>
            {/* Header */}
            <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "stretch", md: "center" }}
                gap={2}
                mb={2}
            >
                <Box>
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: 900, mb: 0.5, color: colors.text }}
                    >
                        Dashboard
                    </Typography>
                    <Typography sx={{ opacity: 0.7 }}>
                        Create and manage your published posts.
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<AddRoundedIcon />}
                    onClick={() => setOpen(true)}
                    sx={{
                        "bgcolor": colors.primary,
                        "borderRadius": 3,
                        "px": 3,
                        "py": 1.25,
                        "fontWeight": 900,
                        "&:hover": { bgcolor: "#4F673D" }
                    }}
                >
                    Create post
                </Button>
            </Stack>

            {/* Chips */}
            <Box sx={{ mb: 3 }}>
                <FilterChips value={filter} onChange={setFilter} />
            </Box>

            {/* Content */}
            <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
                {showHousing && (
                    <SectionCard
                        icon={<HomeWorkRoundedIcon />}
                        title="Property"
                        subtitle={`${housing.length} listings`}
                        items={housing}
                        onItemClick={(id) =>
                            router.push(`/admin/housing/${id}`)
                        }
                        footerAction={
                            <Button
                                variant="text"
                                onClick={() => router.push("/admin/housing")}
                                sx={{
                                    alignSelf: "flex-start",
                                    fontWeight: 900,
                                    color: colors.primary
                                }}
                            >
                                View all properties →
                            </Button>
                        }
                    />
                )}

                {showJobs && (
                    <SectionCard
                        icon={<WorkRoundedIcon />}
                        title="Job offer"
                        subtitle={`${jobs.length} listings`}
                        items={jobs}
                        onItemClick={(id) => router.push(`/admin/jobs/${id}`)}
                        footerAction={
                            <Button
                                variant="text"
                                onClick={() => router.push("/admin/jobs")}
                                sx={{
                                    alignSelf: "flex-start",
                                    fontWeight: 900,
                                    color: colors.primary
                                }}
                            >
                                View all job offers →
                            </Button>
                        }
                    />
                )}
            </Stack>

            {/* Modal (your existing flow) */}
            <PostTypeDialog
                open={open}
                onClose={() => setOpen(false)}
                onNext={(type) => {
                    setOpen(false);
                    if (type === "property") router.push("/admin/housing/new");
                    if (type === "job") router.push("/admin/jobs/new");
                }}
            />
        </Box>
    );
}
