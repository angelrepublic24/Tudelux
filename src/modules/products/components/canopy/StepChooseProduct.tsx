"use client";
import { StepTitle } from "@/shared/components/ui/StepTitle/StepTitle";
import React, { useState } from "react";
import { ChooseProductGrid } from "../grid/ChooseProductGrid";
import { useGetProducts } from "../../services/product.service";
import { ProductFormType } from "../../schema/product.schema";

type Props = {
  onSelect: (product: ProductFormType & {id: number}) => void;
};

export const StepChooseProduct = ({ onSelect }: Props) => {
  const [selectedName, setSelectedName] = useState<string>("");
  const { data: products = [], isLoading } = useGetProducts();

  return (
    <section className="py-16">
      <StepTitle step={2} title={"Choose a product "} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-4">
        {products.map((product, index) => (
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
