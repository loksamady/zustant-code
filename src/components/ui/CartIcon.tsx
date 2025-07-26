import { ShoppingBasket } from "lucide-react";
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { userStore } from "../../store/store";
import { ChangeQtyButton } from "./ChangeQtyButtons";

interface CartIconProps {
  className?: string;
  itemCount?: number;
  showBadge?: boolean;
  onClick?: () => void;
}

export const CartIcon: React.FC<CartIconProps> = ({
  className = "",
  itemCount = 0,
  showBadge = false,
  onClick,
}) => {
  const [visible, setVisible] = useState(false);
  const cartProducts = userStore((state) => state.products);
  const resetCart = userStore((state) => state.reset);
  const removeProduct = userStore((state) => state.removeProduct);

  const handleIconClick = () => {
    setVisible(true);
    if (onClick) {
      onClick();
    }
  };

  const handleResetCart = () => {
    resetCart();
    // Optionally close the dialog after reset
    // setVisible(false);
  };

  const calculateTotal = () => {
    return cartProducts
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2);
  };

  return (
    <>
      <div
        className={`relative flex items-center justify-center ${className}`}
        onClick={handleIconClick}
      >
        <ShoppingBasket />
        {showBadge && itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
      </div>

      <Dialog
        header="Shopping Cart"
        visible={visible}
        style={{ width: "60vw", maxWidth: "600px" }}
        onHide={() => setVisible(false)}
        footer={
          <div className="flex justify-between items-center">
            <Button
              label="Reset Cart"
              icon="pi pi-trash"
              onClick={handleResetCart}
              className="p-button-danger p-button-outlined"
              disabled={cartProducts.length === 0}
            />
            <div className="flex gap-2">
              <Button
                label="Checkout"
                icon="pi pi-check"
                onClick={() => setVisible(false)}
                disabled={cartProducts.length === 0}
              />
            </div>
          </div>
        }
      >
        <div className="m-0">
          {cartProducts.length > 0 ? (
            <div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-3">
                  Cart Items ({cartProducts.length})
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {cartProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-medium text-sm">
                            {product.name}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {product.brand}
                          </p>
                          <p className="text-sm font-semibold">
                            ${product.price}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ChangeQtyButton productId={product.id} />
                        <Button
                          icon="pi pi-trash"
                          className="p-button-rounded p-button-text p-button-danger p-button-sm"
                          onClick={() => removeProduct(product.id)}
                          title="Remove from cart"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-xl font-bold text-green-600">
                      ${calculateTotal()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <ShoppingBasket
                size={48}
                className="mx-auto mb-3 text-gray-400"
              />
              <p className="text-gray-600">Your cart is empty</p>
              <p className="text-sm text-gray-500 mt-2">
                Add some products to get started!
              </p>
            </div>
          )}
        </div>
      </Dialog>
    </>
  );
};
