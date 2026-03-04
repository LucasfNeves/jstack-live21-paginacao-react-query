import { ClientsService } from "@/services/ClientsService";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useClientsInfiniteScroll(perPage: number = 10) {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      staleTime: 1000 * 60 * 5, // 5 minutes
      queryKey: ["clients"],
      initialPageParam: 1,
      queryFn: async ({ pageParam = 1 }) => {
        return ClientsService.getAll(pageParam, perPage);
      },
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        const totalPages = lastPage.items
          ? Math.ceil(lastPage.items / perPage)
          : 0;

        const isLastPage = lastPageParam >= totalPages;

        // o hasNextPage do useInfiniteQuery é baseado no valor retornado por getNextPageParam, ou seja, se retornar null ou undefined, o hasNextPage será false
        if (isLastPage) return null;

        return lastPageParam + 1;
      },
    });

  const clients = data?.pages.flatMap((page) => page.data);

  return {
    clients: clients ?? [],
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
