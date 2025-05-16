import { getProfile } from "@/api/HubspotAPi";
import { StepTitle } from "@/components/ui/StepTitle/StepTitle";
import { RenderState } from "@/types";
import { groupProfilesByName } from "@/utils/groupProfile";
import { useQuery } from "@tanstack/react-query";

type Props = {
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  onContinue: () => void;
  setIsRenderOpen?: (open: boolean) => void;
};

export const StepProfile = ({
  setRenderState,
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
        {groupedProfiles.map((profile, i) => (
          <button
            onClick={() => {
              setRenderState((prev) => ({
                ...prev,
                profile: profile.name,
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
        <button className="bg-[#ff5100] text-lg px-10 py-5 border rounded-2xl text-amber-300 hover:bg-white hover:border-[#ff5100]" onClick={onContinue}>Continue</button>
      </div>
    </section>
  );
};
