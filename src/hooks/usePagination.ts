import { useCallback, useEffect, useState } from "react";

export function usePagination(initialPage: number = 1) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalItems, setTotalItems] = useState(0);

  const totalPages = totalItems ? Math.ceil(totalItems / 10) : 0;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const handleNextPage = useCallback(() => {
    if (!hasNextPage) return;
    setCurrentPage((prev) => prev + 1);
  }, [hasNextPage]);

  const handlePrevPage = useCallback(() => {
    if (!hasPreviousPage) return;
    setCurrentPage((prev) => prev - 1);
  }, [hasPreviousPage]);

  const handleSetPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleSetTotalItems = useCallback((items: number) => {
    setTotalItems(items);
  }, []);

  useEffect(() => {
    const urlParams = new URL(window.location.href);
    urlParams.searchParams.set("page", String(currentPage));

    const newUrl = `${urlParams.origin}${urlParams.pathname}?${urlParams.searchParams.toString()}`;

    window.history.replaceState(null, "", newUrl);
  }, [currentPage]);

  return {
    currentPage,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    handleSetTotalItems,
    handleNextPage,
    handlePrevPage,
    handleSetPage,
  };
}
