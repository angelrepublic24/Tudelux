"use client";

import { useEffect } from "react";
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
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { materialSchema, MaterialFormType } from "../schemas/materials.schema";
import { toast } from "react-toastify";
import {
  useCreateMaterial,
  useUpdateMaterial,
} from "../services/material.service";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: MaterialFormType & { id?: number };
  isEditing?: boolean;
  isReadOnly?: boolean;
}

export const MaterialModal = ({
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
  } = useForm<MaterialFormType>({
    resolver: zodResolver(materialSchema),
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const { fields, append, remove } = useFieldArray({
    name: "variants",
    control,
  });

  const { mutateAsync: createMaterial, isPending: creating } =
    useCreateMaterial();
  const { mutateAsync: updateMaterial, isPending: updating } =
    useUpdateMaterial();

  useEffect(() => {
    if (isOpen && defaultValues) {
      reset(defaultValues);
    }
  }, [isOpen, defaultValues, reset]);

  const onSubmit = async (data: MaterialFormType) => {
    try {
      if (isEditing && defaultValues?.id) {
        await updateMaterial({ id: defaultValues.id, data });
        toast.success("Material updated successfully");
        handleClose();
      } else {
        await createMaterial(data);
        toast.success("Material created successfully");
        handleClose();
      }
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
              ? "View Material"
              : isEditing
              ? "Edit Material"
              : "Create New Material"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            placeholder="Material name"
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

          <select
            multiple
            {...register("compatibleWith")}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
            disabled={isReadOnly}
          >
            <option value="Canopies">Canopies</option>
            <option value="Partitions">Partitions</option>
            <option value="Pergolas">Pergolas</option>
          </select>
          {errors.compatibleWith && (
            <p className="text-sm text-red-500">
              {errors.compatibleWith.message as string}
            </p>
          )}

          <div className="space-y-4">
            <p className="font-semibold">Variants</p>
            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-5 gap-4 items-end">
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1">Color</label>
                  <Input
                    {...register(`variants.${index}.color`)}
                    placeholder="e.g. Black"
                    disabled={isReadOnly}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1">Size</label>
                  <Input
                    {...register(`variants.${index}.unit`)}
                    placeholder="in / ft"
                    disabled={isReadOnly}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1">Stock</label>
                  <Input
                    type="number"
                    {...register(`variants.${index}.stock`, {
                      valueAsNumber: true,
                    })}
                    placeholder="0"
                    disabled={isReadOnly}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="text-xs text-gray-500 mb-1">
                    Unit ($)
                  </label>
                  <Input
                  className="w-32"
                    type="number"
                    {...register(`variants.${index}.pricePerUnit`, {
                      valueAsNumber: true,
                    })}
                    placeholder="0"
                    disabled={isReadOnly}
                  />
                </div>
                {!isReadOnly && (
                  <div className="flex flex-col justify-end">
                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      variant="destructive"
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            ))}

            {!isReadOnly && (
              <Button
                type="button"
                onClick={() =>
                  append({
                    color: "",
                    unit: "in",
                    stock: 0,
                    pricePerUnit: 0,
                  })
                }
              >
                + Add Variant
              </Button>
            )}
          </div>

          {!isReadOnly && (
            <DialogFooter>
              <Button type="submit" disabled={creating || updating}>
                {isEditing ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};
