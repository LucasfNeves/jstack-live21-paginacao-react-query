import { Skeleton } from "@/components/ui/Skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { useClientsInfiniteScroll } from "@/hooks/useClientsInfiniteScroll";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export function ClientsScroll() {
  const { clients, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useClientsInfiniteScroll();
  const tableCaptionRef = useRef<null | HTMLTableCaptionElement>(null);
  const containerRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!tableCaptionRef.current || !containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries, internalObserver) => {
        const { isIntersecting } = entries[0];

        if (!hasNextPage) {
          internalObserver.disconnect();
          return;
        }

        if (isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: containerRef.current,
        rootMargin: "20%",
        threshold: 0,
      },
    );

    observer.observe(tableCaptionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isLoading, fetchNextPage, hasNextPage]);

  return (
    <div>
      <header className="mb-6 pb-10">
        <h1 className="text-3xl font-bold">Clientes</h1>
      </header>

      {isLoading && (
        <div className="space-y-2">
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
        </div>
      )}

      {!isLoading && (
        <div ref={containerRef} className="max-h-[400px] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Data de entrada</TableHead>
                <TableHead>Tipo de veículo</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Modelo</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="flex items-center gap-2">
                    <img
                      src={client.avatar}
                      alt={client.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <strong>{client.name}</strong>
                      <small className="text-muted-foreground block">
                        {client.email}
                      </small>
                    </div>
                  </TableCell>

                  <TableCell>{client.createdAt}</TableCell>

                  <TableCell>{client.vehicleType}</TableCell>

                  <TableCell>{client.vehicleManufacturer}</TableCell>

                  <TableCell>{client.vehicleModel}</TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableCaption
              ref={tableCaptionRef}
              className={cn(!isFetchingNextPage && "w-0 h-0 m-0")}
            >
              {isFetchingNextPage && (
                <div className="flex items-center gap-2">
                  <span>Carregando mais...</span>
                </div>
              )}
            </TableCaption>
          </Table>
        </div>
      )}
    </div>
  );
}
