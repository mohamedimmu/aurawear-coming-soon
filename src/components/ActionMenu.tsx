import React from "react";
import { Button } from "./ui/button";
import { Search, ShoppingCart, User } from "lucide-react";

export default function ActionMenu() {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Search"
        className="hidden cursor-pointer hover:!bg-transparent md:block"
      >
        <Search className="navbar-icon" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        aria-label="Shopping Cart"
        className="cursor-pointer hover:!bg-transparent"
      >
        <ShoppingCart className="navbar-icon" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        aria-label="Account"
        className="hidden cursor-pointer hover:!bg-transparent md:block"
      >
        <User className="navbar-icon" />
      </Button>
    </div>
  );
}
