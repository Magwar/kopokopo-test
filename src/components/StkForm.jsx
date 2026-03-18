function StkForm({ onSubmit, loading }) {
  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    onSubmit({
      phoneNumber: form.get("phoneNumber"),
      amount: form.get("amount"),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">
          Phone Number
        </label>
        <input
          name="phoneNumber"
          placeholder="+254712345678"
          required
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">
          Amount (KES)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-2 text-sm text-gray-400">
            KES
          </span>
          <input
            name="amount"
            placeholder="0"
            type="number"
            min="1"
            required
            className="w-full border border-gray-200 rounded-lg pl-12 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            Sending prompt...
          </span>
        ) : (
          "Pay with M-PESA"
        )}
      </button>
    </form>
  );
}

export default StkForm;