"use client";

import { useState } from "react";
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltipContent,
} from "@/components/ui/chart";

// Sample data for the chart
const data = [
	{ day: "1", subscribers: 120000, views: 450000 },
	{ day: "5", subscribers: 125000, views: 460000 },
	{ day: "10", subscribers: 131000, views: 490000 },
	{ day: "15", subscribers: 135000, views: 510000 },
	{ day: "20", subscribers: 142000, views: 545000 },
	{ day: "25", subscribers: 145000, views: 578000 },
	{ day: "30", subscribers: 152000, views: 612000 },
];

const chartConfig = {
	subscribers: { label: "Subscribers", color: "var(--chart-1)" },
	views: { label: "Views", color: "var(--chart-2)" },
} as const satisfies ChartConfig;

type TimeRange = "30days" | "90days" | "year";

export function ChannelGrowthChart() {
	const [timeRange, setTimeRange] = useState<TimeRange>("30days");

	// Format numbers to be more readable
	const formatNumber = (value: number): string => {
		if (value >= 1000000) {
			return `${(value / 1000000).toFixed(1)}M`;
		} else if (value >= 1000) {
			return `${(value / 1000).toFixed(1)}K`;
		}
		return value.toString();
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<ChartLegend content={<ChartLegendContent />} />

				<div className="flex gap-1">
					<Button
						size="sm"
						variant={timeRange === "30days" ? "default" : "outline"}
						onClick={() => setTimeRange("30days")}
					>
						30 Days
					</Button>
					<Button
						size="sm"
						variant={timeRange === "90days" ? "default" : "outline"}
						onClick={() => setTimeRange("90days")}
					>
						90 Days
					</Button>
					<Button
						size="sm"
						variant={timeRange === "year" ? "default" : "outline"}
						onClick={() => setTimeRange("year")}
					>
						Year
					</Button>
				</div>
			</div>

			<ChartContainer config={chartConfig} className="h-[300px]">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart
						data={data}
						margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
					>
						<CartesianGrid
							strokeDasharray="3 3"
							vertical={false}
							className="stroke-muted"
						/>
						<XAxis
							dataKey="day"
							className="text-sm text-muted-foreground"
							tickLine={false}
							axisLine={false}
							tickFormatter={(value: string) => `Day ${value}`}
						/>
						<YAxis
							className="text-sm text-muted-foreground"
							tickLine={false}
							axisLine={false}
							tickFormatter={formatNumber}
						/>
						<Tooltip
							content={({ active, payload, label }) => {
								if (active && payload && payload.length) {
									return (
										<ChartTooltipContent
											className="space-y-1"
											label={`Day ${label}`}
											payload={payload}
										/>
									);
								}
								return null;
							}}
						/>
						<Line
							type="monotone"
							dataKey="subscribers"
							stroke="var(--chart-1)"
							strokeWidth={2}
							dot={{ fill: "var(--chart-1)", r: 4 }}
							activeDot={{ r: 6 }}
						/>
						<Line
							type="monotone"
							dataKey="views"
							stroke="var(--chart-2)"
							strokeWidth={2}
							dot={{ fill: "var(--chart-2)", r: 4 }}
							activeDot={{ r: 6 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</ChartContainer>
		</div>
	);
}
