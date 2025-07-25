import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";

type Props = { productId: string };
export function ChangeQtyButton({ productId }: Props) {
  const { getProductById } = useStore(
    useShallow((state) => ({
      getProductById: state.getProductById,
    }))
  );
  const product = getProductById(productId);
}
