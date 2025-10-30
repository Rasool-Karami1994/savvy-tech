import { useEffect, useMemo, useState } from "react";
import type { Item } from "./utils/types";
import { uid } from "./utils/id";
import { loadItems, saveItems } from "./utils/storage";
import Modal from "./components/Modal";
import ItemForm, { type ItemFormValues } from "./components/ItemForm";
import EmptyState from "./components/EmptyState";
import ThemeToggle from "./components/ThemeToggle";
import Button from "./components/ui/Button";
import ItemsTable from "./components/ItemsTable";
import UndoToast from "./components/UndoToast";

import { FiPlus } from "react-icons/fi";
import SearchBar from "./components/SearchBar";

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Item | null>(null);
  const [undo, setUndo] = useState<{ snap: Item; timer: number } | null>(null);

  useEffect(() => setItems(loadItems<Item[]>([])), []);
  useEffect(() => saveItems(items), [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (it) =>
        it.title.toLowerCase().includes(q) ||
        it.subtitle.toLowerCase().includes(q)
    );
  }, [items, query]);

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }
  function openEdit(item: Item) {
    setEditing(item);
    setModalOpen(true);
  }

  function handleCreate(values: ItemFormValues) {
    const next: Item = {
      id: uid(),
      createdAt: new Date().toISOString(),
      title: values.title.trim(),
      subtitle: (values.subtitle ?? "").trim(),
    };
    setItems((s) => [next, ...s]);
    setModalOpen(false);
  }

  function handleEdit(values: ItemFormValues) {
    if (!editing) return;
    setItems((s) =>
      s.map((it) => (it.id === editing.id ? { ...it, ...values } : it))
    );
    setEditing(null);
    setModalOpen(false);
  }

  function handleDelete(id: string) {
    const victim = items.find((x) => x.id === id);
    if (!victim) return;
    setItems((s) => s.filter((x) => x.id !== id));
    const timer = window.setTimeout(() => setUndo(null), 5000);
    setUndo({ snap: victim, timer });
  }

  function handleUndo() {
    if (!undo) return;
    clearTimeout(undo.timer);
    setItems((s) => [undo.snap, ...s]);
    setUndo(null);
  }

  return (
    <div className="min-h-screen mx-auto px-4 py-4 bg-main text-title md:px-8">
      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight text-title">
            SavvyTech
          </h1>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex w-full items-center gap-2 mb-5">
        <SearchBar value={query} onChange={setQuery} />
        <Button
          variant="primary"
          onClick={openCreate}
          size="lg"
          leftIcon={<FiPlus className="h-5 w-5" />}
        >
          <span className="hidden md:block">Create New Item</span>
          <span className="block md:hidden">Create</span>
        </Button>
      </div>

      {items.length === 0 ? (
        <EmptyState
          onSeed={() => {
            const seed: Item[] = [
              {
                id: uid(),
                createdAt: new Date().toISOString(),
                title: "Welcome to SavvyTech",
                subtitle:
                  "Click Create to add your first item or seed examples.",
              },
              {
                id: uid(),
                createdAt: new Date().toISOString(),
                title: "Edit me",
                subtitle: "Try the Edit button to update this row.",
              },
            ];
            setItems(seed);
          }}
        />
      ) : (
        <ItemsTable
          items={filtered}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      )}

      {undo && <UndoToast onUndo={handleUndo} />}

      <Modal
        open={modalOpen}
        title={editing ? "Edit Item" : "Create Item"}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
      >
        <ItemForm
          defaultValues={editing ?? undefined}
          onCancel={() => {
            setModalOpen(false);
            setEditing(null);
          }}
          onSubmit={(vals) => (editing ? handleEdit(vals) : handleCreate(vals))}
          submitLabel={editing ? "Save changes" : "Create"}
        />
      </Modal>
    </div>
  );
}
