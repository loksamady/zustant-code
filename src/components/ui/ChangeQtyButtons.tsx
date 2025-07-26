import { userStore } from "@/store/store";
import { Minus, Plus } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

type Props = { productId: string };
export function ChangeQtyButton({ productId }: Props) {
  const { getProductById, decrementQuantity, incrementQuantity } = userStore(
    useShallow((state) => ({
      getProductById: state.getProductById,
      decrementQuantity: state.decrementQuantity,
      incrementQuantity: state.incrementQuantity,
    }))
  );
  const product = getProductById(productId);

  // Example usage: render product name or fallback
  return (
    <>
      {product && (
        <div className="flex items-center gap-2">
          <button onClick={() => decrementQuantity(productId)}>
            <Minus className="bg-gray-200 p-1 rounded" />
          </button>
          <span>{product.quantity}</span>
          <button onClick={() => incrementQuantity(productId)}>
            <Plus className="bg-gray-200 p-1 rounded" />
          </button>
        </div>
      )}
    </>
  );
}
