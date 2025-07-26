import React from "react";
import { userStore } from "../../store/store";

export const StoreDebugger: React.FC = () => {
  const store = userStore();
  const resetCart = userStore((state) => state.reset);

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-sm z-50">
      <h3 className="font-bold text-sm mb-2">🔧 Store Debug</h3>

      <div className="text-xs space-y-1">
        <div>
          <strong>Cart:</strong> {store.products.length} items
        </div>
        <div>
          <strong>Total:</strong> ${store.total}
        </div>
        <div>
          <strong>User:</strong> {store.fullName || "Not set"}
        </div>
        <div>
          <strong>LocalStorage:</strong> ✅ Enabled
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <button
          onClick={resetCart}
          className="w-full text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          Clear Cart
        </button>
        <button
          onClick={() => localStorage.removeItem("zustand-cart-storage")}
          className="w-full text-xs bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
        >
          Clear Storage
        </button>
      </div>

      <div className="mt-2 text-xs text-gray-500">
        Open DevTools → Application → Local Storage to see stored data
      </div>
    </div>
  );
};
