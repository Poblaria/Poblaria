"use client";

import { useEffect, useState, useCallback } from "react";
import {
    Typography,
    Paper,
    CircularProgress,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Stack,
    IconButton,
    Tooltip
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { StatCard } from "@/app/admin/components/StatCard";
import getStatistics, {
    StatisticsResponse
} from "@/app/actions/statistics/getStatistics";

const BRAND_GREEN = "#5E7749";

export default function StatisticsPage() {
    const [data, setData] = useState<StatisticsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<string>("");

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getStatistics();
            if (response.data) {
                setData(response.data);
                setLastUpdated(new Date().toLocaleTimeString());
            }
        } catch (err) {
            console.error("Failed to fetch stats", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (loading && !data)
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="50vh"
            >
                <CircularProgress sx={{ color: BRAND_GREEN }} />
            </Box>
        );

    const totalUsers = data
        ? data.users.default.total +
          data.users.localAuthorities.total +
          data.users.administrators.total
        : 0;
    const newUsersTotal = data
        ? data.users.default.new.current +
          data.users.localAuthorities.new.current +
          data.users.administrators.new.current
        : 0;

    return (
        <Box
            sx={{
                p: { xs: 2, md: 5 },
                backgroundColor: "#F9FAFB",
                minHeight: "100vh"
            }}
        >
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
                    <Typography variant="caption" sx={{ color: "#9CA3AF" }}>
                        Last updated: {lastUpdated}
                    </Typography>
                </Box>

                <Tooltip title="Refresh Data">
                    <IconButton
                        onClick={fetchData}
                        disabled={loading}
                        sx={{ bgcolor: "white", border: "1px solid #E5E7EB" }}
                    >
                        <RefreshIcon
                            sx={{
                                color: BRAND_GREEN,
                                animation: loading
                                    ? "spin 2s linear infinite"
                                    : "none"
                            }}
                        />
                        <style>{`@keyframes spin { 100% { transform:rotate(360deg); } }`}</style>
                    </IconButton>
                </Tooltip>
            </Stack>

            <Stack direction="row" gap={3} sx={{ mb: 6, flexWrap: "wrap" }}>
                <StatCard
                    title="Housings"
                    total={data?.housings.total || 0}
                    newItems={data?.housings.new.current || 0}
                />
                <StatCard
                    title="Jobs"
                    total={data?.jobs.total || 0}
                    newItems={data?.jobs.new.current || 0}
                />
                <StatCard
                    title="Total Users"
                    total={totalUsers}
                    newItems={newUsersTotal}
                />
                {/* TODO: Add Newsletter StatCard once Backend provides 'newsletter' data 
                    Acceptance Criteria: Dashboard displays newsletter subscribers count.
                */}
            </Stack>

            <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                User Breakdown
            </Typography>

            <TableContainer
                component={Paper}
                elevation={0}
                sx={{ borderRadius: 4, border: "1px solid #E5E7EB" }}
            >
                <Table>
                    <TableHead sx={{ bgcolor: "#F9FAFB" }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>
                                Role Type
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: 700 }}>
                                Total Registered
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: 700 }}>
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
            </TableContainer>
        </Box>
    );
}
