"use client";

import {
  CartItem,
  MaterialItem,
  MaterialItemTable,
  RenderState,
} from "@/shared/types";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { StepTitle } from "@/shared/components/ui/StepTitle/StepTitle";
import { useQuery } from "@tanstack/react-query";
import { getOptions } from "@/api/HubspotAPi";
import { useGetMaterials } from "@/modules/materials/services/material.service";
import { ContinueButton } from "@/shared/components/ui/continueButton/ContinueButton";
import { useCartStore } from "@/shared/store/useCartStore";
import { useUIStore } from "@/shared/store/ui/ui-store";

type Props = {
  setMaterialsData: React.Dispatch<React.SetStateAction<MaterialItemTable[]>>;
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  onContinue: () => void;
  setIsRenderOpen?: (open: boolean) => void;
};

export const OptionStep = ({
  setMaterialsData,
  setRenderState,
  onContinue,
}: Props) => {
  const [sensor, setSensor] = useState<string | null>(null);
  const [automation, setAutomation] = useState<string | null>(null);
  const [additionalRemote, setAdditionalRemote] = useState<string | null>(null);
  const automationRef = useRef<HTMLDivElement>(null);
  const remoteRef = useRef<HTMLDivElement>(null);

  const [sensorAdded, setSensorAdded] = useState(false);
  const [automationAdded, setAutomationAdded] = useState(false);
  const [remoteAdded, setRemoteAdded] = useState(false);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const addItem = useCartStore.getState().addItem;
  const openCart = useUIStore.getState().openCart; // 👈 obtiene la función

  const addToCart = (
    option: any,
    setAddedFn: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (!option || !option.variants?.[0]) return;

    const variant = option.variants[0];

    const cart = useCartStore.getState().items;

    const alreadyExists = cart.some(
      (item) => item.id === option.id || item.name === option.name
    );
    if (alreadyExists) {
      console.log("Item already in cart, skipping...");
      return;
    }
    const item: CartItem = {
      id: option.id,
      name: option.name,
      product: option.name, // ✅ Esto es clave
      productType: "Component", // O puedes usar otro identificador si lo prefieres
      color: variant.color || "Default",
      quantity: 1,
      materials: [],
      price: variant.pricePerUnit || 0,
      hidePrice: true, // 👈 así evitas mostrar el precio
    };

    // Agregarlo al store global del carrito
    addItem(item);
    setAddedFn(true);
  };

  const { data: options, isLoading, isError } = useGetMaterials();

  if (isLoading) return "Loading....";
  if (isError) return "Error loading options";

  const sensorOption = options.find((o) => o.name === "Sensor");
  const automationOption = options.find((o) => o.name === "Automation");
  const remoteOption = options.find((o) => o.name === "Switch");

  return (
    <section className="w-[90%] px-4 py-10 space-y-12">
      <StepTitle step={6} title="Select your options" />

      {/* SENSOR */}
      <div>
        <p className="font-semibold text-xl mb-3">Add a Sensor?</p>
        <div className="flex justify-center gap-6">
          {sensorOption && (
            <button
              onClick={() => {
                setSensor("yes");
                addToCart(sensorOption, setSensorAdded);
                setTimeout(() => scrollToRef(automationRef), 300);
              }}
              className={`relative  border rounded-lg p-2 w-[250px] hover:shadow-md ${
                sensor === "yes" ? "border-orange-500" : "border-gray-300"
              }`}
            >
              <Image
                src="https://m.media-amazon.com/images/I/316j7LEEGSL._AC_SX679_.jpg"
                alt="Sensor"
                width={150}
                height={100}
                className="rounded-md object-contain mx-auto"
              />
              <p className="text-center text-sm mt-2">Add Sensor</p>
              {sensorAdded && (
                <span className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                  Already added
                </span>
              )}
            </button>
          )}
          <button
            onClick={() => {
              setSensor("no");
              setTimeout(() => scrollToRef(automationRef), 300);
            }}
            className={`border rounded-lg p-6 w-[250px] text-center ${
              sensor === "no" ? "border-orange-500" : "border-gray-300"
            }`}
          >
            None
          </button>
        </div>
      </div>

      {/* AUTOMATION */}
      {sensor && (
        <div ref={automationRef}>
          <p className="font-semibold text-xl mb-3">Add Automation?</p>
          <div className="flex justify-center gap-6">
            {automationOption && (
              <button
                onClick={() => {
                  setAutomation("yes");
                  addToCart(automationOption, setAutomationAdded);
                  setTimeout(() => scrollToRef(remoteRef), 300);
                }}
                className={`relative  border rounded-lg p-2 w-[250px] hover:shadow-md ${
                  automation === "yes" ? "border-orange-500" : "border-gray-300"
                }`}
              >
                <Image
                  src="https://22465736.fs1.hubspotusercontent-na1.net/hubfs/22465736/Sensors%2BAutomation.png?width=100"
                  alt="Automation"
                  width={150}
                  height={100}
                  className="rounded-md object-contain mx-auto"
                />
                <p className="text-center text-sm mt-2">Add Automation</p>
                {automationAdded && (
                  <span className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                    Already added
                  </span>
                )}
              </button>
            )}
            <button
              onClick={() => {
                setAutomation("no");
                setTimeout(() => scrollToRef(remoteRef), 300);
              }}
              className={`border rounded-lg p-6 w-[250px] text-center ${
                automation === "no" ? "border-orange-500" : "border-gray-300"
              }`}
            >
              None
            </button>
          </div>
        </div>
      )}

      {/* REMOTE SWITCH */}
      {automation && (
        <div ref={remoteRef}>
          <p className="font-semibold text-xl mb-3">
            One remote switch is included. Add an additional one?
          </p>
          <div className="flex justify-center gap-6">
            {remoteOption && (
              <button
                onClick={() => {
                  setAdditionalRemote("yes");
                  addToCart(remoteOption, setRemoteAdded);
                }}
                className={`relative  border rounded-lg p-2 w-[250px] hover:shadow-md ${
                  additionalRemote === "yes"
                    ? "border-orange-500"
                    : "border-gray-300"
                }`}
              >
                {" "}
                <Image
                  src="https://22465736.fs1.hubspotusercontent-na1.net/hubfs/22465736/MuteRemote.png?width=100"
                  alt="Remote"
                  width={150}
                  height={100}
                  className="rounded-md object-contain mx-auto"
                />
                <p className="text-center text-sm mt-2">Add Remote</p>
                {remoteAdded && (
                  <span className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                    Already added
                  </span>
                )}
              </button>
            )}
            <button
              onClick={() => setAdditionalRemote("no")}
              className={`border rounded-lg p-6 w-[250px] text-center ${
                additionalRemote === "no"
                  ? "border-orange-500"
                  : "border-gray-300"
              }`}
            >
              None
            </button>
          </div>
        </div>
      )}

      {/* Continue */}
      {additionalRemote && (
        <div className="pt-10 flex justify-end">
          <ContinueButton
            onHandle={() => {
              setRenderState((prev) => ({
                ...prev,
                sensor,
                automation,
                additionalRemote,
              }));
            }}
            onContinue={onContinue}
          />
        </div>
      )}
    </section>
  );
};
