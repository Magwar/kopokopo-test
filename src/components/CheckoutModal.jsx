import { useState } from "react";
import StkForm from "./StkForm";

function CheckoutModal({ onClose }) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit({ phoneNumber, amount }) {
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("http://localhost:3001/api/stk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, amount }),
      });
      const data = await res.json();
      setStatus(data);
    } catch (err) {
      setStatus({ success: false, error: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">M-PESA Payment</h2>
            <p className="text-xs text-gray-400 mt-0.5">Powered by KopoKopo</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Form or Status */}
        {!status?.success && (
          <StkForm onSubmit={handleSubmit} loading={loading} />
        )}

        {status && (
          <div
            className={`rounded-lg p-4 text-sm text-center ${status.success ? "bg-green-50" : "bg-red-50"}`}
          >
            {status.success ? (
              <>
                <div className="text-3xl mb-2">📲</div>
                <p className="font-semibold text-green-700">
                  Prompt sent to your phone!
                </p>
                <p className="text-green-600 text-xs mt-1">
                  Enter your M-PESA PIN to complete
                </p>
                <p className="text-gray-400 text-xs mt-3 break-all">
                  Ref: {status.location?.split("/").pop()}
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-600"
                >
                  Done
                </button>
              </>
            ) : (
              <>
                <div className="text-3xl mb-2">❌</div>
                <p className="font-semibold text-red-700">
                  Something went wrong
                </p>
                <p className="text-red-500 text-xs mt-1">{status.error}</p>
                <button
                  onClick={() => setStatus(null)}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-600"
                >
                  Try Again
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutModal;