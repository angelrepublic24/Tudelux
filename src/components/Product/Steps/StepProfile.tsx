import { getProfile } from "@/api/HubspotAPi";
import { StepTitle } from "@/components/ui/StepTitle/StepTitle";
import { MaterialItemTable, RenderState } from "@/types";
import { groupProfilesByName } from "@/utils/groupProfile";
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

  const handleProfilePrice = (
    profileName: string,
    color: string,
    profiles: any[],
    widthInches: number,
    projectionInches: number
  ) => {
    const matched = profiles.find(
      (p) => p.values[1] === profileName && p.values[2] === color
    );

    if (!matched) return [];

    const pricePerInch = parseFloat(matched.values[3]) || 0;

    return [
      {
        name: `width ${profileName}`,
        color,
        inches: widthInches,
        quantity: 2,
        pricePerInch,
        total: parseFloat((widthInches * pricePerInch * 2).toFixed(2)),
      },
      {
        name: `projection ${profileName}`,
        color,
        inches: projectionInches,
        quantity: 2,
        pricePerInch,
        total: parseFloat((projectionInches * pricePerInch * 2).toFixed(2)),
      },
    ];
  };

  const groupedProfiles = groupProfilesByName(profiles);
  return (
    <section>
      <StepTitle step={8} title={"What's the fascia size"} />
      <div className="grid grid-cols-3 gap-5">
        {groupedProfiles.map((profile, i) => (
          <button
            onClick={() => {
              const selectedProfile = profile.name;
              const color = "Anodized Black";
              const widthInches = renderState.dimensions?.widthInches || 0;
              const projectionInches =
                renderState.dimensions?.projectionInches || 0;

              const newMaterials = handleProfilePrice(
                selectedProfile,
                color,
                profiles,
                widthInches,
                projectionInches
              );

              setMaterialsData((prev) => [...prev, ...newMaterials]);
              console.log(newMaterials);

              setRenderState((prev) => ({
                ...prev,
                profile: selectedProfile,
              }));
              
            }}
            value={profile.name}
            className="bg-gray-100 border border-transparent hover:bg-gray-200 focus:border-black focus:border-dotted text-center w-full font-semibold text-xl rounded-xl py-4"
          >
            {profile.name}
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          className="bg-[#ff5100] text-lg px-10 py-5 border rounded-2xl text-amber-300 hover:bg-white hover:border-[#ff5100]"
          onClick={onContinue}
        >
          Continue
        </button>
      </div>
    </section>
  );
};
