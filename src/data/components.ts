type ComponentData = {
  id: string;
  label: string;
  file: string;
  position: [number, number, number]; 
};

export const availableComponents: ComponentData[] = [
  // 🟠 Estructura principal del frame
  {
    id: "frame-front",
    label: "Front Frame",
    file: "frameSize.glb",
    position: [0, 0, 2],
  },
  {
    id: "frame-back",
    label: "Back Frame",
    file: "frameSize.glb",
    position: [0, 0, -2],
  },
  {
    id: "frame-left",
    label: "Left Frame",
    file: "frameSize.glb",
    position: [-2, 0, 0],
  },
  {
    id: "frame-right",
    label: "Right Frame",
    file: "frameSize.glb",
    position: [2, 0, 0],
  },

  // 🔵 Esquinas
  {
    id: "corner-front-left",
    label: "Front Left Corner",
    file: "leftCorner.glb",
    position: [-2, 0, 2],
  },
  {
    id: "corner-front-right",
    label: "Front Right Corner",
    file: "rightCorner.glb",
    position: [2, 0, 2],
  },
  {
    id: "corner-back-left",
    label: "Back Left Corner",
    file: "leftCorner.glb",
    position: [-2, 0, -2],
  },
  {
    id: "corner-back-right",
    label: "Back Right Corner",
    file: "rightCorner.glb",
    position: [2, 0, -2],
  },

  // 🟡 Techo superior (si lo deseas usar luego)
  {
    id: "roof-top",
    label: "Top Frame (Optional Roof)",
    file: "slot.glb",
    position: [0, 2, 0],
  },
];


export const lightingData = [
  {
        id: 1,
        name: "Skylight lighting",
        description:"Tudelü: Closure is the easiest way to beautify your space while creating the calm, focused environment you need for any task.",
        image: "",
        render: "https://24116371.fs1.hubspotusercontent-na1.net/hubfs/24116371/Modulux%20C8SR00.glb",
        about: {
          text: "Skylight lighting is:",
          benefits: [
            "Retractable",
            "Occlusive",
            "Remote-controlled",
            "Single sided decor finish",
          ],
        },
        cta: "Skylight lighting"
    },
    {
        id: 2,
        name: "Spotlights",
        description:"Tudelü: Closure is the easiest way to beautify your space while creating the calm, focused environment you need for any task.",
        image: "",
        render: "https://24116371.fs1.hubspotusercontent-na1.net/hubfs/24116371/Modulux%20C8SR00.glb",
        about: {
          text: "Spotlights lighting is:",
          benefits: [
            "Retractable",
            "Occlusive",
            "Remote-controlled",
            "Single sided decor finish",
          ],
        },
        cta: "Spotlights"
    },
    {
        id: 3,
        name: "Louver lighting",
        description:"Tudelü: Closure is the easiest way to beautify your space while creating the calm, focused environment you need for any task.",
        image: "",
        render: "https://24116371.fs1.hubspotusercontent-na1.net/hubfs/24116371/Modulux%20C8SR00.glb",
        about: {
          text: "Louver lighting is:",
          benefits: [
            "Retractable",
            "Occlusive",
            "Remote-controlled",
            "Single sided decor finish",
          ],
        },
        cta: "Louver lighting"
    },
    {
        id: 4,
        name: "Canopy lighting",
        description:"Tudelü: Closure is the easiest way to beautify your space while creating the calm, focused environment you need for any task.",
        image: "",
        render: "https://24116371.fs1.hubspotusercontent-na1.net/hubfs/24116371/Modulux%20C8SR00.glb",
        about: {
          text: "Canopy lighting is:",
          benefits: [
            "Retractable",
            "Occlusive",
            "Remote-controlled",
            "Single sided decor finish",
          ],
        },
        cta: "Canopy lighting"
    },
    {
        id: 5,
        name: "Support lighting",
        description:"Tudelü: Closure is the easiest way to beautify your space while creating the calm, focused environment you need for any task.",
        image: "",
        render: "https://24116371.fs1.hubspotusercontent-na1.net/hubfs/24116371/Modulux%20C8SR00.glb",
        about: {
          text: "Support lighting is:",
          benefits: [
            "Retractable",
            "Occlusive",
            "Remote-controlled",
            "Single sided decor finish",
          ],
        },
        cta: "Support lighting"
    },
     {
        id: 6,
        name: "Custom lighting",
        description:"Tudelü: Closure is the easiest way to beautify your space while creating the calm, focused environment you need for any task.",
        image: "",
        render: "https://24116371.fs1.hubspotusercontent-na1.net/hubfs/24116371/Modulux%20C8SR00.glb",
        about: {
          text: "Custom lighting is:",
          benefits: [
            "Retractable",
            "Occlusive",
            "Remote-controlled",
            "Single sided decor finish",
          ],
        },
        cta: "Custom lighting"
    },
]