import { Th, Td } from "./Table";
import Button from "./ui/Button";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { formatDate } from "../utils/date";
import type { Item } from "../utils/types";

export default function ItemsTable({
  items,
  onEdit,
  onDelete,
}: {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto md:overflow-visible rounded-2xl">
      <div className="inline-block min-w-full align-middle">
        <div className="shadow-sm overflow-auto rounded-2xl">
          <div className="min-h-6 bg-grid-soft" />
          <div className="border-b border-border">
            <table className="min-w-[720px] w-full divide-y divide-border">
              <thead className="bg-grid-soft">
                <tr>
                  <Th>Date Created</Th>
                  <Th>Title</Th>
                  <Th>Subtitle</Th>
                  <Th className="text-right pr-32">Actions</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {items.map((it) => (
                  <tr key={it.id} className="hover:bg-selected/40">
                    <Td>{formatDate(it.createdAt)}</Td>
                    <Td className="font-medium">{it.title}</Td>
                    <Td className="text-title/70">
                      {it.subtitle || <em className="text-title/50">—</em>}
                    </Td>
                    <Td>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(it)}
                          leftIcon={<FiEdit2 className="h-4 w-4 text-secondary" />}
                          aria-label="Edit"
                          className="gap-0 sm:gap-2 px-2 sm:px-3"
                        >
                          <span className="hidden sm:inline">Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDelete(it.id)}
                          leftIcon={<FiTrash2 className="h-4 w-4 text-red-500" />}
                          aria-label="Delete"
                          className="gap-0 sm:gap-2 px-2 sm:px-3"
                        >
                          <span className="hidden sm:inline">Delete</span>
                        </Button>
                      </div>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="min-h-9 bg-grid-soft" />
        </div>
      </div>
    </div>
  );
}
