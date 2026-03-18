import { useState, useEffect } from "react";
import CheckoutModal from "./components/CheckoutModal";

function App() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.ctrlKey && e.key === "m") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center text-gray-400">
        <div className="text-5xl mb-4">🟢</div>
        <p className="text-lg font-medium text-gray-500">KopoKopo STK Push</p>
        <p className="text-sm mt-2">
          Press{" "}
          <kbd className="bg-white border border-gray-300 rounded px-2 py-1 text-xs font-mono shadow-sm">
            Ctrl
          </kbd>{" "}
          +{" "}
          <kbd className="bg-white border border-gray-300 rounded px-2 py-1 text-xs font-mono shadow-sm">
            M
          </kbd>{" "}
          to open payment
        </p>
      </div>

      {open && <CheckoutModal onClose={() => setOpen(false)} />}
    </div>
  );
}

export default App;