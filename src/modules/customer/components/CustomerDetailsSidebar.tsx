import React, { useState } from "react";
import { CustomerDetailsType } from "../schema/customer.schema";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductTypeEnum } from "@/modules/products/types/product-type.enum";
import { useUpdateCustomer } from "../services/customer.service";
import { toast } from "react-toastify";
import { formatCurrency } from "@/shared/utils/formatCurency";

interface Props {
  customerDetail: any;
}

export const CustomerDetailSidebar = ({ customerDetail }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState<CustomerDetailsType>({
    budget: customerDetail?.details?.budget ?? undefined,
    productType: customerDetail?.details?.productType ?? undefined,
    objective: customerDetail?.details?.objective ?? "",
    timeline: customerDetail?.details?.timeline ?? "",
    notes: customerDetail?.details?.notes ?? "",
  });

  const updateCustomer = useUpdateCustomer();

  const handleChange = (field: keyof CustomerDetailsType, value: any) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    updateCustomer.mutate(
      { customerId: customerDetail.id, data: { details } },
      {
        onSuccess: (data) => {
          toast.success(data.message);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
    setIsEditing(false);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md w-full max-w-xl mx-auto border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Customer Details
        </h2>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <Textarea
            value={details.objective}
            onChange={(e) => handleChange("objective", e.target.value)}
            placeholder="Objective"
          />
          <Input
            value={details.timeline}
            onChange={(e) => handleChange("timeline", e.target.value)}
            placeholder="Timeline"
          />
          <Input
            type="number"
            value={details.budget || ""}
            onChange={(e) => handleChange("budget", Number(e.target.value))}
            placeholder="Budget"
          />

          <Select
            value={details.productType || ""}
            onValueChange={(value) =>
              handleChange("productType", value as ProductTypeEnum)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select product type" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(ProductTypeEnum).map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Textarea
            value={details.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            placeholder="Notes"
            className="resize-none"
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button onClick={handleSubmit}>Save</Button>
            <Button variant="ghost" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 text-gray-700">
          <DetailLine label="Objective" value={details.objective} />
          <DetailLine label="Timeline" value={details.timeline} />
          <DetailLine
            label="Budget"
            value={details.budget ? `$${details.budget}` : ""}
          />
          <DetailLine label="Product Type" value={details.productType} />
          <DetailLine label="Notes" value={details.notes} />
        </div>
      )}
    </div>
  );
};

const DetailLine = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex flex-col">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-base font-medium">{value || "N/A"}</span>
  </div>
);
