import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatCurrency } from "@/shared/utils/formatCurency";
import { formatPhoneNumber } from "@/shared/utils/formatPhoneNumber";

export const DealDetailsSidebar = ({ quoteDetail }) => {
  return (
    <div className="flex flex-col min-h-full justify-between text-sm px-2">
      <div className="space-y-8">
        {/* Quote Info por cada item */}
        {quoteDetail.items.map((product, index) => (
          <div key={index} className="border-b pb-4">
            <h2 className="text-lg font-bold mb-4 text-primary">
              Quote Info {quoteDetail.items.length > 1 ? `#${index + 1}` : ""}
            </h2>
            <div className="space-y-1">
              <p>
                <span className="font-semibold text-gray-700">Product:</span>{" "}
                {product?.product}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Type:</span>{" "}
                {product?.product_type}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Shape:</span>{" "}
                {product?.shape}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Quantity:</span>{" "}
                {product?.quantity}
              </p>
              {product?.dimensions && (
                <div className="space-y-1 mt-2">
                  <span className="font-semibold text-gray-700">
                    Dimensions:
                  </span>
                  <ul className="ml-4 list-disc text-gray-800 text-sm">
                    {product.dimensions.width && (
                      <li>Width: {product.dimensions.width} ft</li>
                    )}
                    {product.dimensions.projection && (
                      <li>Projection: {product.dimensions.projection} ft</li>
                    )}
                    {product.dimensions.height && (
                      <li>Height: {product.dimensions.height} ft</li>
                    )}
                    {product.dimensions.frontWidth && (
                      <li>Front Width: {product.dimensions.frontWidth} ft</li>
                    )}
                    {product.dimensions.backWidth && (
                      <li>Back Width: {product.dimensions.backWidth} ft</li>
                    )}
                    {product.dimensions.corners && (
                      <li>Corners: {product.dimensions.corners}</li>
                    )}

                    {product.dimensions.widthInches && (
                      <li>Width: {product.dimensions.widthInches}"</li>
                    )}
                    {product.dimensions.projectionInches && (
                      <li>
                        Projection: {product.dimensions.projectionInches}"
                      </li>
                    )}
                    {product.dimensions.frontWidthInches && (
                      <li>
                        Front Width: {product.dimensions.frontWidthInches}"
                      </li>
                    )}
                    {product.dimensions.backWidthInches && (
                      <li>Back Width: {product.dimensions.backWidthInches}"</li>
                    )}
                    {product.dimensions.cornersInches && (
                      <li>Corners: {product.dimensions.cornersInches}"</li>
                    )}
                    {product.dimensions.middleProjectionInches && (
                      <li>
                        Middle Projection:{" "}
                        {product.dimensions.middleProjectionInches}"
                      </li>
                    )}
                    {product.dimensions.middleWidthInches && (
                      <li>
                        Middle Width: {product.dimensions.middleWidthInches}"
                      </li>
                    )}
                    {product.dimensions.leftProjectionInches && (
                      <li>
                        Left Projection:{" "}
                        {product.dimensions.leftProjectionInches}"
                      </li>
                    )}
                    {product.dimensions.rightProjectionInches && (
                      <li>
                        Right Projection:{" "}
                        {product.dimensions.rightProjectionInches}"
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Materials Accordion */}
            {product.materials && product.materials.length > 0 && (
              <Accordion type="single" collapsible className="w-full mt-4">
                <AccordionItem value={`materials-${index}`}>
                  <AccordionTrigger className="text-base font-semibold text-primary">
                    <div className="flex items-center gap-2">
                      <span>Materials</span>
                      <span className="text-xs text-muted-foreground">
                        ({product.materials.length})
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="mt-2">
                    <ul className="space-y-3">
                      {product.materials.map((m, i) => (
                        <li
                          key={i}
                          className="border rounded-lg p-3 bg-muted/50 backdrop-blur-sm"
                        >
                          <div className="flex justify-between items-center font-semibold">
                            <span>{m.material}</span>
                            <span className="text-sm text-muted-foreground">{" "}
                              {formatCurrency(m.price)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Color:{" "}
                            <span className="font-medium text-gray-800">
                              {m.color}
                            </span>
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Size:{" "}
                            <span className="font-medium text-gray-800">
                              {m.size}
                            </span>{" "}
                            | Qty:{" "}
                            <span className="font-medium text-gray-800">
                              {m.qty}
                            </span>
                          </p>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {/* Totals */}
            <div className="mt-4 space-y-1 text-sm">
              <p>
                <span className="font-semibold text-gray-700">Subtotal:</span>
                {" "}
                {formatCurrency(product?.subtotal)}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Total:</span>{" "}
                {formatCurrency(product?.total)}
              </p>
            </div>
          </div>
        ))}

        {/* Status */}
        <div>
          <h2 className="text-lg font-bold mb-2 text-primary">Status</h2>
          <p className="capitalize text-sm">{quoteDetail.status}</p>
          <p className="text-muted-foreground text-xs">
            Created: {new Date(quoteDetail.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Sales Rep */}
      <div className="border-t pt-4 mt-6 text-sm">
        <h2 className="text-lg font-bold mb-2 text-primary">Sales Rep</h2>
        <p className="font-medium">
          {quoteDetail.assignedTo?.name} {quoteDetail.assignedTo?.lName}
        </p>
        <p className="text-muted-foreground">{quoteDetail.assignedTo?.email}</p>
        <p className="text-muted-foreground">{formatPhoneNumber(quoteDetail.assignedTo?.phone)}</p>
      </div>
    </div>
  );
};
