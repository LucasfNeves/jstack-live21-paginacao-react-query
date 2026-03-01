import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination";
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
import { useClients } from "@/hooks/useClients";

export function Clients() {
  const { clients, isLoading, pagination } = useClients();

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

          <TableCaption>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={pagination.handlePrevPage}
                    disabled={!pagination.hasPreviousPage}
                  />
                </PaginationItem>

                {Array.from(
                  {
                    length: pagination.totalPages,
                  },
                  (_, index) => (
                    <PaginationItem key={index}>
                      <PaginationButton
                        isActive={index + 1 === pagination.currentPage}
                        onClick={() => pagination.handleSetPage(index + 1)}
                      >
                        {index + 1}
                      </PaginationButton>
                    </PaginationItem>
                  ),
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={pagination.handleNextPage}
                    disabled={!pagination.hasNextPage}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </TableCaption>
        </Table>
      )}
    </div>
  );
}
