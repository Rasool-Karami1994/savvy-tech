export default function UndoToast({ onUndo }: { onUndo: () => void }) {
  return (
    <div
      className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 rounded-full bg-btn px-4 py-2 text-sm text-btn-foreground shadow-lg ring-1"
      style={{
        boxShadow: "var(--shadow-elev-2)",
        borderColor: "rgb(var(--border-rgb) / 0.3)",
      }}
      role="status"
    >
      Item deleted.{" "}
      <button className="ml-2 underline cursor-pointer" onClick={onUndo}>
        Undo
      </button>
    </div>
  );
}
