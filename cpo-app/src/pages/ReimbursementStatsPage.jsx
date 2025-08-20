import React from "react";
import { Box, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";

// Static data (replace with API/database data as needed)
const reimbursementStats = [
  { label: "Approved", value: 30, color: "#2e7d32" },
  { label: "Rejected", value: 10, color: "#d32f2f" },
  { label: "Pending", value: 8, color: "#ed6c02" },
];

// Calculate percentages
const totalClaims = reimbursementStats.reduce((sum, stat) => sum + stat.value, 0);
const statsWithPercent = reimbursementStats.map(stat => ({
  ...stat,
  percent: totalClaims ? ((stat.value / totalClaims) * 100).toFixed(1) : 0,
}));

export default function ReimbursementReportPage() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" gutterBottom>
        Reimbursement Claims Report
      </Typography>
      <Typography sx={{ mb: 3 }} >
        Overview of approved, rejected, and pending reimbursement claims.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "#f8fafb",
          borderRadius: 3,
          boxShadow: 2,
          maxWidth: 380,
          mx: "auto",
          p: { xs: 2, sm: 3 },
        }}
      >
        <PieChart
          series={[
            {
              data: statsWithPercent.map((item, idx) => ({
                id: idx,
                value: item.value,
                label: item.label,
                color: item.color,
              })),
              innerRadius: 40,
              outerRadius: 80,
              paddingAngle: 4,
              cornerRadius: 6,
            },
          ]}
          width={260}
          height={200}
          slotProps={{
            legend: {
              direction: "row",
              position: { vertical: "bottom", horizontal: "middle" },
              itemGap: 10,
              labelStyle: { fontSize: 13, fontWeight: 500 },
            },
          }}
        />
        <Box sx={{ mt: 2, width: "100%" }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 500, mb: 1 }}>
            Percentage Breakdown
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
            {statsWithPercent.map(stat => (
              <Typography
                key={stat.label}
                variant="body2"
                sx={{
                  color: stat.color,
                  fontWeight: 600,
                  letterSpacing: 0.5,
                }}
              >
                {stat.label}: {stat.percent}%
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
