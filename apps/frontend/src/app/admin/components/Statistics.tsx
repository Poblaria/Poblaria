"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import {
    Typography,
    Paper,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Stack,
    IconButton,
    Tooltip,
    Skeleton,
    Alert,
    Snackbar
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { BarChart } from "@mui/x-charts/BarChart";
import { StatCard } from "@/app/admin/components/StatCard";
import getStatistics, {
    StatisticsResponse
} from "@/app/actions/statistics/getStatistics";

const BRAND_GREEN = "#5E7749";

export default function StatisticsPage() {
    const [data, setData] = useState<StatisticsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<string>("");

    // Notification States
    const [notification, setNotification] = useState<{
        open: boolean;
        message: string;
        severity: "success" | "error";
    }>({
        open: false,
        message: "",
        severity: "success"
    });

    const fetchData = useCallback(async (isManual = false) => {
        setLoading(true);
        try {
            const response = await getStatistics();
            if (response.data) {
                setData(response.data);
                setLastUpdated(new Date().toLocaleTimeString());
                if (isManual) {
                    setNotification({
                        open: true,
                        message: "Statistics updated successfully!",
                        severity: "success"
                    });
                }
            } else {
                throw new Error("No data");
            }
        } catch (err) {
            setNotification({
                open: true,
                message: "Failed to sync data. Please try again.",
                severity: "error"
            });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const totals = useMemo(() => {
        if (!data) return { users: 0, newUsers: 0 };
        return {
            users:
                data.users.default.total +
                data.users.localAuthorities.total +
                data.users.administrators.total,
            newUsers:
                data.users.default.new.current +
                data.users.localAuthorities.new.current +
                data.users.administrators.new.current
        };
    }, [data]);

    const isFirstLoad = loading && !data;

    return (
        <Box
            sx={{
                p: { xs: 2, md: 5 },
                backgroundColor: "#F9FAFB",
                minHeight: "100vh"
            }}
        >
            {/* Success/Error Notifications */}
            <Snackbar
                open={notification.open}
                autoHideDuration={4000}
                onClose={() =>
                    setNotification({ ...notification, open: false })
                }
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    severity={notification.severity}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {notification.message}
                </Alert>
            </Snackbar>

            {/* Header */}
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 4 }}
            >
                <Box>
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: 800, color: "#111827" }}
                    >
                        Statistics
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{ color: "#9CA3AF", fontWeight: 600 }}
                    >
                        Live as of {lastUpdated}
                    </Typography>
                </Box>
                <Tooltip title="Refresh Data">
                    <IconButton
                        onClick={() => fetchData(true)}
                        disabled={loading}
                        sx={{
                            "bgcolor": "white",
                            "border": "1px solid #E5E7EB",
                            "&:hover": { bgcolor: "#f3f4f6" }
                        }}
                    >
                        <RefreshIcon
                            sx={{
                                color: BRAND_GREEN,
                                animation: loading
                                    ? "spin 1s linear infinite"
                                    : "none"
                            }}
                        />
                    </IconButton>
                </Tooltip>
            </Stack>

            {/* 4-Column Grid */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                        lg: "repeat(4, 1fr)"
                    },
                    gap: 3,
                    mb: 6
                }}
            >
                <StatCard
                    loading={isFirstLoad}
                    title="Housings"
                    total={data?.housings.total || 0}
                    newItems={data?.housings.new.current || 0}
                />
                <StatCard
                    loading={isFirstLoad}
                    title="Jobs"
                    total={data?.jobs.total || 0}
                    newItems={data?.jobs.new.current || 0}
                />
                <StatCard
                    loading={isFirstLoad}
                    title="Total Users"
                    total={totals.users}
                    newItems={totals.newUsers}
                />
                <StatCard
                    loading={isFirstLoad}
                    title="Subscribers"
                    total={data?.newsletter.subscribers.total || 0}
                    newItems={data?.newsletter.subscribers.new.current || 0}
                />
            </Box>

            {/* Platform Distribution Chart */}
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    borderRadius: 4,
                    border: "1px solid #E5E7EB",
                    mb: 6
                }}
            >
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
                    Platform Distribution
                </Typography>
                <Box sx={{ width: "100%", height: 350 }}>
                    {isFirstLoad ? (
                        <Skeleton
                            variant="rectangular"
                            height="100%"
                            sx={{ borderRadius: 2 }}
                        />
                    ) : (
                        <BarChart
                            xAxis={[
                                {
                                    scaleType: "band",
                                    data: [
                                        "Housings",
                                        "Jobs",
                                        "Users",
                                        "Subscribers"
                                    ]
                                }
                            ]}
                            series={[
                                {
                                    data: [
                                        data?.housings.total || 0,
                                        data?.jobs.total || 0,
                                        totals.users,
                                        data?.newsletter.subscribers.total || 0
                                    ],
                                    color: BRAND_GREEN,
                                    label: "Platform Reach"
                                }
                            ]}
                            height={350}
                            borderRadius={10}
                            slotProps={{ tooltip: { trigger: "item" } }}
                            aria-label="Bar chart showing platform data distribution"
                        />
                    )}
                </Box>
            </Paper>

            {/* Table Breakdown */}
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                User Breakdown
            </Typography>
            <TableContainer
                component={Paper}
                elevation={0}
                sx={{ borderRadius: 4, border: "1px solid #E5E7EB" }}
            >
                {isFirstLoad ? (
                    <Box sx={{ p: 3 }}>
                        <Skeleton
                            variant="rectangular"
                            height={200}
                            sx={{ borderRadius: 2 }}
                        />
                    </Box>
                ) : (
                    <Table aria-label="user breakdown table">
                        <TableHead sx={{ bgcolor: "#F9FAFB" }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>
                                    Role Type
                                </TableCell>
                                <TableCell
                                    align="right"
                                    sx={{ fontWeight: 700 }}
                                >
                                    Total Registered
                                </TableCell>
                                <TableCell
                                    align="right"
                                    sx={{ fontWeight: 700 }}
                                >
                                    New (This Month)
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data &&
                                [
                                    {
                                        name: "Default Users",
                                        stats: data.users.default
                                    },
                                    {
                                        name: "Local Authorities",
                                        stats: data.users.localAuthorities
                                    },
                                    {
                                        name: "Administrators",
                                        stats: data.users.administrators
                                    }
                                ].map((row) => (
                                    <TableRow key={row.name} hover>
                                        <TableCell sx={{ fontWeight: 600 }}>
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.stats.total.toLocaleString()}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={{
                                                color:
                                                    row.stats.new.current > 0
                                                        ? BRAND_GREEN
                                                        : "#9CA3AF",
                                                fontWeight: 700
                                            }}
                                        >
                                            +{row.stats.new.current}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
        </Box>
    );
}
