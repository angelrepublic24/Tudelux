"use client";
import { chooseProduct } from "@/utils/chooseProduct";
import React, { useState } from "react";
import { ChooseProductGrid } from "../ChooseProductGrid";

type Props = {
  onSelect: (product: (typeof chooseProduct)[0]) => void;
};

export const StepChooseProduct = ({ onSelect }: Props) => {
    const [selectedName, setSelectedName] = useState<string>("");

  return (
    <section className="py-16">
      <div className="flex items-center gap-4 my-10">
        <h4 className="text-[#ff5100] font-semibold text-4xl  whitespace-nowrap">
          <span className="bg-[#ece83a] py-3 px-4 rounded-4xl mr-2">2</span>
          Choose a product
        </h4>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-4">
        {chooseProduct.map((product, index) => (
          <ChooseProductGrid
            key={index}
            product={product}
            onSelect={(product) => {
              setSelectedName(product.name);
              onSelect(product); // Esto sigue enviando al padre
            }}
            isSelected={product.name === selectedName}
          />
        ))}
      </div>
    </section>
  );
};
