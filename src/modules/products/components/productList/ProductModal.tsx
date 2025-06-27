"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormType } from "../../schema/product.schema";
import { toast } from "react-toastify";
import {
  useCreateProduct,
  useUpdateProduct,
} from "../../services/product.service";
import { X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: ProductFormType & { id?: number };
  isEditing?: boolean;
  isReadOnly?: boolean;
}

export const ProductModal = ({
  isOpen,
  onClose,
  defaultValues,
  isEditing,
  isReadOnly,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ProductFormType>({
    resolver: zodResolver(productSchema),
  });

  const { fields, append, remove } = useFieldArray({
    name: "variants",
    control,
  });

  useEffect(() => {
    if (isOpen && defaultValues) {
      reset({
        name: defaultValues.name || "",
        description: defaultValues.description || "",
        benefits: defaultValues.benefits || [],
        variants: defaultValues.variants || [],
        video: defaultValues.video || "",
      });
    }
  }, [isOpen, defaultValues?.id]);

  const queryClient = useQueryClient();
  const { mutateAsync: createProduct, isPending: creating } =
    useCreateProduct();
  const { mutateAsync: updateProduct, isPending: updating } =
    useUpdateProduct();

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: ProductFormType) => {
    console.log(data);
    try {
      if (isEditing && defaultValues?.id) {
        await updateProduct({ id: defaultValues.id, data });
        toast.success("Material updated successfully");
      } else {
        await createProduct(data);
        toast.success("Material created successfully");
      }
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      handleClose();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Error saving material");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isReadOnly
              ? "View Product"
              : isEditing
              ? "Edit Product"
              : "Create New Product"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            placeholder="Product name"
            {...register("name")}
            disabled={isReadOnly}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}

          <Textarea
            placeholder="Description (optional)"
            {...register("description")}
            disabled={isReadOnly}
          />
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Video URL
            </label>
            <Input
              placeholder="Paste video URL (optional)"
              {...register("video")}
              disabled={isReadOnly}
            />

            {/* <label className="text-sm font-medium text-gray-700">
              Or upload a video
            </label>
            <Input
              type="file"
              accept="video/*"
              disabled={isReadOnly}
              {...register("video")}
            /> */}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Benefits
            </label>
            <Controller
              name="benefits"
              control={control}
              defaultValue={[]}
              render={({ field }) => {
                const [inputValue, setInputValue] = useState("");

                const handleKeyDown = (
                  e: React.KeyboardEvent<HTMLInputElement>
                ) => {
                  if (e.key === "Enter" && inputValue.trim() !== "") {
                    e.preventDefault();
                    const newItem = inputValue.trim();
                    if (!field.value.includes(newItem)) {
                      field.onChange([...field.value, newItem]);
                    }
                    setInputValue("");
                  }
                };

                const handleRemove = (index: number) => {
                  const updated = [...field.value];
                  updated.splice(index, 1);
                  field.onChange(updated);
                };

                return (
                  <div className="space-y-2">
                    <Input
                      placeholder="Type a benefit and press Enter"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={isReadOnly}
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {field.value.map((item: string, index: number) => (
                        <span
                          key={index}
                          className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-2"
                        >
                          {item}
                          {!isReadOnly && (
                            <button
                              type="button"
                              onClick={() => handleRemove(index)}
                            >
                              <X className="w-3 h-3 text-gray-600" />
                            </button>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              }}
            />
          </div>

          <div className="space-y-4">
            <p className="font-semibold">Variants</p>
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-2 border p-4 rounded-md">
                <div className="flex flex-col gap-2">
                  <Input
                    placeholder="Name"
                    {...register(`variants.${index}.name`)}
                    disabled={isReadOnly}
                  />
                  <Textarea
                    placeholder="Description"
                    {...register(`variants.${index}.description`)}
                    disabled={isReadOnly}
                  />
                  <Input
                    placeholder="Image URL"
                    {...register(`variants.${index}.image`)}
                    disabled={isReadOnly}
                  />
                </div>

                {/* Benefits para esta variant */}
                <Controller
                  name={`variants.${index}.benefits`}
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => {
                    const [inputValue, setInputValue] = useState("");

                    const handleKeyDown = (
                      e: React.KeyboardEvent<HTMLInputElement>
                    ) => {
                      if (e.key === "Enter" && inputValue.trim() !== "") {
                        e.preventDefault();
                        const newItem = inputValue.trim();
                        if (!field.value.includes(newItem)) {
                          field.onChange([...field.value, newItem]);
                        }
                        setInputValue("");
                      }
                    };

                    const handleRemove = (i: number) => {
                      const updated = [...field.value];
                      updated.splice(i, 1);
                      field.onChange(updated);
                    };

                    return (
                      <div className="space-y-1">
                        <Input
                          placeholder="Type a benefit and press Enter"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={handleKeyDown}
                          disabled={isReadOnly}
                        />
                        <div className="flex flex-wrap gap-2">
                          {field.value.map((benefit: string, i: number) => (
                            <span
                              key={i}
                              className="bg-gray-100 text-sm px-3 py-1 rounded-full flex items-center gap-2"
                            >
                              {benefit}
                              {!isReadOnly && (
                                <button
                                  type="button"
                                  onClick={() => handleRemove(i)}
                                >
                                  <X className="w-3 h-3 text-gray-600" />
                                </button>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  }}
                />
                {!isReadOnly && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}

            {!isReadOnly && (
              <Button
                type="button"
                onClick={() =>
                  append({
                    name: "",
                    description: "",
                    image: "",
                    benefits: [],
                  })
                }
              >
                + Add Variant
              </Button>
            )}
          </div>

          {!isReadOnly && (
            <DialogFooter>
              <Button type="submit">{isEditing ? "Update" : "Create"}</Button>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};
