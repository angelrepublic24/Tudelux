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
