"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltipContent,
} from "@/components/ui/chart";

// Sample data for the chart
const data = [
	{ name: "Technology", value: 35, color: "var(--chart-1)" },
	{ name: "Gaming", value: 25, color: "var(--chart-2)" },
	{ name: "Entertainment", value: 15, color: "var(--chart-3)" },
	{ name: "Education", value: 12, color: "var(--chart-4)" },
	{ name: "Other", value: 13, color: "var(--chart-5)" },
];

const chartConfig = {
	Technology: { label: "Technology", color: "var(--chart-1)" },
	Gaming: { label: "Gaming", color: "var(--chart-2)" },
	Entertainment: { label: "Entertainment", color: "var(--chart-3)" },
	Education: { label: "Education", color: "var(--chart-4)" },
	Other: { label: "Other", color: "var(--chart-5)" },
} as const satisfies ChartConfig;

export function GroupCategoryDistribution() {
	return (
		<div className="space-y-4">
			<ChartLegend
				content={<ChartLegendContent className="flex-wrap gap-4" />}
			/>

			<ChartContainer config={chartConfig} className="h-[300px]">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie
							data={data}
							cx="50%"
							cy="50%"
							innerRadius={60}
							outerRadius={90}
							paddingAngle={2}
							dataKey="value"
							label={({ name, percent }) =>
								name != null && percent != null
									? `${name} (${(percent * 100).toFixed(0)}%)`
									: undefined
							}
							labelLine={false}
						>
							{data.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={entry.color} />
							))}
						</Pie>
						<Tooltip
							content={({ active, payload }) => {
								if (active && payload && payload.length) {
									return <ChartTooltipContent payload={payload} />;
								}
								return null;
							}}
						/>
					</PieChart>
				</ResponsiveContainer>
			</ChartContainer>
		</div>
	);
}
