import { ClientsService } from "@/services/ClientsService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useClients(perPage: number = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useQuery({
    staleTime: 1000 * 60 * 5, // 5 minutes
    queryKey: ["clients", { page: currentPage, perPage }],
    queryFn: () => ClientsService.getAll(currentPage, perPage),
  });

  const totalPages = data ? Math.ceil(data.items / perPage) : 0;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  function handleNextPage() {
    if (!hasNextPage) return;
    setCurrentPage((prev) => prev + 1);
  }

  function handlePrevPage() {
    if (!hasPreviousPage) return;
    setCurrentPage((prev) => prev - 1);
  }

  function handleSetPage(page: number) {
    setCurrentPage(page);
  }

  return {
    clients: data?.data || [],
    isLoading,
    pagination: {
      handleNextPage,
      handlePrevPage,
      handleSetPage,
      totalPages,
      currentPage,
      hasNextPage,
      hasPreviousPage,
    },
  };
}
