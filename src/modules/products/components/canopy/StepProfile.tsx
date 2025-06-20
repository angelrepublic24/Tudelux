import { getProfile } from "@/api/HubspotAPi";
import { StepTitle } from "@/shared/components/ui/StepTitle/StepTitle";
import { MaterialItemTable, ProfileVariant, RenderState } from "@/shared/types";
import { generateMaterialsFromDimensions } from "@/shared/utils/generateMaterialsFromDimensions";
import { groupProfilesByName } from "@/shared/utils/groupProfile";
import { useQuery } from "@tanstack/react-query";

type Props = {
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  renderState: RenderState;
  setMaterialsData: React.Dispatch<React.SetStateAction<MaterialItemTable[]>>;
  onContinue: () => void;
  setIsRenderOpen?: (open: boolean) => void;
};

export const StepProfile = ({
  setRenderState,
  renderState,
  setMaterialsData,
  onContinue,
  setIsRenderOpen,
}: Props) => {
  const {
    data: profiles,
    isLoading,
    isError,
  } = useQuery({
    queryFn: getProfile,
    queryKey: ["profiles"],
  });
  if (isLoading) return "Loading....";
  if (isError) return "Error loading";

  const groupedProfiles = groupProfilesByName(profiles);
  return (
    <section>
      <StepTitle step={8} title={"What's the fascia size"} />
      <div className="grid grid-cols-3 gap-5">
        {groupedProfiles.map((profile) => {
          const variant = profile.variants[0]; // tomamos el primer color por defecto

          return (
            <button
              key={variant.id}
              onClick={() => {
                const updatedState = {
                  ...renderState,
                  profile: variant.name,
                  color: variant.color,
                  cutPrice: variant.cutPrice,
                  profileAddedProjection: variant.addedProjection,
                };

                setRenderState(updatedState);
                setMaterialsData((prev) => {
                  const preservedAddOns = prev.filter((item) =>
                    item.name.includes(" - ")
                  );
                  const newBaseStructure =
                    generateMaterialsFromDimensions(updatedState);
                  return [...preservedAddOns, ...newBaseStructure]; // <-- mantiene estructura arriba y addons abajo
                });
              onContinue()
              }}
              className="bg-gray-100 border border-transparent hover:bg-gray-200 focus:border-black focus:border-dotted text-center w-full font-semibold text-xl rounded-xl py-4"
            >
              {variant.name}
            </button>
          );
        })}
      </div>
    </section>
  );
};
