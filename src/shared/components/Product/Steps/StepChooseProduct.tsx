"use client";
import { chooseProduct } from "@/shared/utils/chooseProduct";
import React, { useState } from "react";
import { ChooseProductGrid } from "../ChooseProductGrid";
import { StepTitle } from "@/components/ui/StepTitle/StepTitle";

type Props = {
  onSelect: (product: (typeof chooseProduct)[0]) => void;
};

export const StepChooseProduct = ({ onSelect }: Props) => {
    const [selectedName, setSelectedName] = useState<string>("");

  return (
    <section className="py-16">
      <StepTitle step={2} title={'Choose a product '} />
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
