"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash, Plus, Minus, Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

// Mock cart data
const initialCartItems = [
  {
    id: "1",
    name: "Nike Vomero 18 SE",
    description: "Men's Road Running Shoes",
    color: "Multi-Colour/White/Sail/Black",
    size: "12",
    price: 14195.0,
    quantity: 1,
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Nike Vomero 18",
    description: "Men's Road Running Shoes",
    color: "Black/Coconut Milk/Light Iron Ore/Summit White",
    size: "7",
    price: 13295.0,
    quantity: 10,
    image: "/placeholder.svg",
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item removed from bag");
  };

  const handleAddToFavorites = () => {
    toast.success("Item added to favorites");

  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = 1250.0;
  const total = subtotal + deliveryFee;

  if (initialCartItems)
    return (
      <>
        <div className="flex h-screen items-center justify-center">
          <p className="text-2xl font-medium">Checkout</p>
          <Loader2 className="h-6 w-6" />
        </div>
      </>
    );

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Cart Items Section */}
        <div className="lg:col-span-2">
          <h1 className="mb-6 text-2xl font-medium">Bag</h1>

          <div className="space-y-8">
            {cartItems.map((item) => (
              <div key={item.id} className="border-b pb-8">
                <div className="flex flex-col gap-4 sm:flex-row">
                  {/* Product Image */}
                  <div className="h-40 w-full bg-gray-100 sm:w-40">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-grow flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium">{item.name}</h3>
                          <p className="text-gray-600">{item.description}</p>
                          <p className="text-gray-600">{item.color}</p>
                          <p className="flex items-center gap-2">
                            <span className="text-gray-600">Size</span>
                            <span className="font-medium">{item.size}</span>
                          </p>
                        </div>
                        <div className="font-medium">
                          MRP : ₹{" "}
                          {item.price.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center rounded-full border">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          className="p-2"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          className="p-2"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Remove and Favorite buttons */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border"
                        aria-label="Remove item"
                      >
                        <Trash className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => handleAddToFavorites()}
                        className="flex h-8 w-8 items-center justify-center rounded-full border"
                        aria-label="Add to favorites"
                      >
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {item.id === "1" && (
                  <div className="mt-4 flex items-center text-amber-600">
                    <span className="mr-2 flex h-5 w-5 items-center justify-center">
                      ⏱
                    </span>
                    <p>Just a few left. Order soon.</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="mb-4 text-xl font-medium">Favorites</h2>
            {/* Favorites content would go here */}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 border p-6">
            <h2 className="mb-6 text-2xl font-medium">Summary</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span>Subtotal</span>
                  <span
                    className="cursor-help text-gray-500"
                    title="Total before tax and shipping"
                  >
                    ⓘ
                  </span>
                </div>
                <span>
                  ₹{" "}
                  {subtotal.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Estimated Delivery & Handling</span>
                <span>
                  ₹{" "}
                  {deliveryFee.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div className="mt-4 border-t pt-4">
                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span>
                    ₹{" "}
                    {total.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <Button
                  variant="default"
                  className="h-auto w-full rounded-full bg-black py-6 text-white"
                  // onClick={() => navigate("/checkout")}
                >
                  Guest Checkout
                </Button>

                <Button
                  variant="default"
                  className="h-auto w-full rounded-full bg-black py-6 text-white"
                  // onClick={() => navigate("/login?checkout=true")}
                >
                  Member Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
