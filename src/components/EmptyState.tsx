import Button from "./ui/Button";
import { FiClipboard } from "react-icons/fi";

export default function EmptyState({ onSeed }: { onSeed: () => void }) {
  return (
    <div className="grid place-items-center rounded-2xl border-2 border-dashed border-border bg-main p-10 text-center ">
      <div className=" flex flex-col gap-3 items-center">
        <div
          className="p-5 text-title/70 bg-selected/60 rounded-full w-20 h-20"
          aria-hidden
        >
          <FiClipboard className="inline-block align-middle text-secondary h-10 w-10" />
        </div>
        <h3 className="text-lg font-semibold text-title">No Items Yet</h3>
        <p className="text-title/70">
          Click the
          <span className="text-secondary px-1">
            <strong>Create New Item</strong>
          </span>
          button to add your first entry, or load some data below.
        </p>
        <div className="flex items-center justify-center gap-2">
          <Button variant="secondary" onClick={onSeed}>
            Add sample data
          </Button>
        </div>
      </div>
    </div>
  );
}
