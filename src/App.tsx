import { PRODUCTS_DATA } from "./lib/mockData";
import { Button } from "./components/ui/button";
import { userStore } from "./store/store";
import { ChangeQtyButton } from "./components/ui/ChangeQtyButtons";
import { UserIcon } from "./components/ui/UserIcon";
import { CartIcon } from "./components/ui/CartIcon";
// import { StoreDebugger } from "./components/ui/StoreDebugger";

export default function App() {
  const addProduct = userStore((state) => state.addProduct);
  const cartProducts = userStore((state) => state.products);

  // Calculate total items in cart
  const totalItemsInCart = cartProducts.reduce(
    (total, product) => total + product.quantity,
    0
  );

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="flex flex-row items-center justify-between w-full max-w-2xl mb-8">
        <UserIcon className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors" />
        <CartIcon
          className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors"
          itemCount={totalItemsInCart}
          showBadge={true}
        />
      </div>
      <h1 className="text-4xl font-bold">Product List</h1>
      <ul className="w-full max-w-2xl mt-4">
        {PRODUCTS_DATA.map((product) => (
          <li
            key={product.id}
            className="cursor-pointer border-b py-2 flex items-center justify-between hover:bg-gray-100 transition-colors"
          >
            <span>{product.id}</span>
            <img
              className="w-16 h-16 object-cover mr-4 inline-block"
              src={product.imageUrl ?? ""}
              alt={product.name ?? "Product Image"}
            />
            {product.name}
            {product.price && (
              <span className="text-lg font-semibold">${product.price}</span>
            )}
            <span className="text-sm text-gray-500">{product.brand}</span>

            {cartProducts.find((p) => p.id === product.id) ? (
              <ChangeQtyButton productId={product.id} />
            ) : (
              <Button onClick={() => addProduct(product)}>Add to Cart</Button>
            )}
          </li>
        ))}
      </ul>

      {/* Debug component - remove in production */}
      {/* <StoreDebugger /> */}
    </main>
  );
}
