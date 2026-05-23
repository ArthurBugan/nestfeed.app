import { useQuery } from "@tanstack/react-query";
import { type ApiResponse, apiClient } from "@/hooks/api/api-client";
import { queryKeys } from "@/hooks/utils/queryKeys";

export interface Invoice {
	paymentId: string;
	totalAmount: number;
	currency: string;
	status: string;
	createdAt: string;
	customerName: string;
	customerEmail: string;
	subscriptionId: string;
	invoiceUrl: string;
	refundStatus: string | null;
}

const getInvoices = async (): Promise<Invoice[]> => {
	const response = await apiClient.get<ApiResponse<Invoice[]>>(
		"/api/v3/invoices/history",
	);
	return response.data?.items || [];
};

export function useInvoices() {
	return useQuery({
		queryKey: queryKeys.invoices(),
		queryFn: () => getInvoices(),
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
	});
}

export { getInvoices };
