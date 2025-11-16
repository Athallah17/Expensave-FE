import { ShoppingBag, Coffee, Car, Film, Home, Utensils } from "lucide-react";

export const categoryMap: any = {
  Shopping: {
    icon: ShoppingBag,
    color: "bg-pink-100 text-pink-600",
  },
  Food: {
    icon: Utensils,
    color: "bg-orange-100 text-orange-600",
  },
  Transport: {
    icon: Car,
    color: "bg-blue-100 text-blue-600",
  },
  Entertainment: {
    icon: Film,
    color: "bg-purple-100 text-purple-600",
  },
  Housing: {
    icon: Home,
    color: "bg-teal-100 text-teal-600",
  },
  Default: {
    icon: ShoppingBag,
    color: "bg-gray-100 text-gray-600",
  }
};
