import { useState, useEffect, useMemo } from "react";

export const usePagination = (
  pijamas: Array<any>,
  itensPerPage: number,
  visiblePages = 5
) => {
  const [actualPage, setActualPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.max(1, Math.ceil((pijamas?.length ?? 0) / (itensPerPage || 1)))
  );

  useEffect(() => {
    const pages = Math.max(1, Math.ceil((pijamas?.length ?? 0) / (itensPerPage || 1)));
    setTotalPages(pages);
    setActualPage((prev) => Math.min(prev, pages));
  }, [pijamas?.length, itensPerPage]);

  const handleBackPage = () => {
    setActualPage((prevState) => Math.max(1, prevState - 1));
  };

  const handleNextPage = () => {
    setActualPage((prevState) => Math.min(totalPages, prevState + 1));
  };

  const gotoPage = (page: number) => {
    const p = Math.min(Math.max(1, Math.floor(page)), totalPages);
    setActualPage(p);
  };

  const getItemsPage = () => {
    const firstIndex = (actualPage - 1) * itensPerPage;
    const lastIndex = actualPage * itensPerPage;
    return pijamas.slice(firstIndex, lastIndex);
  };

  const pages = useMemo(() => {
    const vp = Math.max(1, Math.floor(visiblePages));
    if (totalPages <= vp) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(vp / 2);
    let start = actualPage - half;
    let end = actualPage + half;

    if (start < 1) {
      start = 1;
      end = vp;
    } else if (end > totalPages) {
      end = totalPages;
      start = totalPages - vp + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [totalPages, actualPage, visiblePages]);

  return {
    actualPage,
    totalPages,
    pages,
    gotoPage,
    handleBackPage,
    handleNextPage,
    getItemsPage,
    setActualPage,
  };
};