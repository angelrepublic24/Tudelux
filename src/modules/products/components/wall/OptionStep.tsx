"use client";

import { MaterialItemTable, RenderState } from "@/shared/types";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { StepTitle } from "@/shared/components/ui/StepTitle/StepTitle";
import { useQuery } from "@tanstack/react-query";
import { getOptions } from "@/api/HubspotAPi";

type Props = {
  setMaterialsData: React.Dispatch<React.SetStateAction<MaterialItemTable[]>>;
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  onContinue: () => void;
  setIsRenderOpen?: (open: boolean) => void;
};

export const OptionStep = ({setMaterialsData, setRenderState, onContinue }: Props) => {
  const [sensor, setSensor] = useState<string | null>(null);
  const [automation, setAutomation] = useState<string | null>(null);
  const [additionalRemote, setAdditionalRemote] = useState<string | null>(null);

  const automationRef = useRef<HTMLDivElement>(null);
  const remoteRef = useRef<HTMLDivElement>(null);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const {
    data: options,
    isLoading,
    isError,
  } = useQuery({
    queryFn: getOptions,
    queryKey: ["options"],
  });

  if (isLoading) return "Loading....";
  if (isError) return "Error loading options";

  const cleanOptions = options.map((option: any) => {
    const vals = option.values;
    return {
      name: vals[1]?.replace("Mute ", "").trim(),
      description: vals[2],
      price: vals[3],
      image: vals[4]?.url,
    };
  });

  const sensorOption = cleanOptions.find((o) => o.name === "Sensors Package");
  const automationOption = cleanOptions.find((o) => o.name === "Automation");
  const remoteOption = cleanOptions.find((o) => o.name === "Switch");

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
                setTimeout(() => scrollToRef(automationRef), 300);
              }}
              className={`border rounded-lg p-2 w-[250px] hover:shadow-md ${
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
                  setTimeout(() => scrollToRef(remoteRef), 300);
                }}
                className={`border rounded-lg p-2 w-[250px] hover:shadow-md ${
                  automation === "yes" ? "border-orange-500" : "border-gray-300"
                }`}
              >
                <Image
                  src={automationOption.image}
                  alt="Automation"
                  width={150}
                  height={100}
                  className="rounded-md object-contain mx-auto"
                />
                <p className="text-center text-sm mt-2">Add Automation</p>
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
    onClick={() => setAdditionalRemote("yes")}
    className={`border rounded-lg p-2 w-[250px] hover:shadow-md ${
      additionalRemote === "yes" ? "border-orange-500" : "border-gray-300"
    }`}
  >
    {remoteOption.image ? (
      <Image
        src={remoteOption.image}
        alt="Remote"
        width={150}
        height={100}
        className="rounded-md object-contain mx-auto"
      />
    ) : (
      <div className="w-[150px] h-[100px] bg-gray-100 flex items-center justify-center text-xs text-gray-400 rounded-md">
        No image
      </div>
    )}
    <p className="text-center text-sm mt-2">Add Remote</p>
  </button>
)}
            <button
              onClick={() => setAdditionalRemote("no")}
              className={`border rounded-lg p-6 w-[250px] text-center ${
                additionalRemote === "no" ? "border-orange-500" : "border-gray-300"
              }`}
            >
              None
            </button>
          </div>
        </div>
      )}

      {/* Continue */}
      {additionalRemote && (
        <div className="pt-10">
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white"
            onClick={() => {
              setRenderState((prev) => ({
                ...prev,
                sensor,
                automation,
                additionalRemote,
              }));
              onContinue();
            }}
          >
            Continue
          </Button>
        </div>
      )}
    </section>
  );
};
