export type action = {
  id: number | string;
  title: string;
  actionType: "Collecte" | "Convoi";
  availableSeat: string;
  city: string;
  fillingLevel: number;
};

export const actions: action[] = [
  {
    id: 1,
    title: "Départ de Rennes - 28 Mars - 18h",
    actionType: "Convoi",
    city: "Rennes",
    availableSeat: "3 places",
    fillingLevel: 20,
  },
  {
    id: 2,
    title: "Départ de Rennes - 30 Mars - 18h",
    actionType: "Convoi",
    city: "Rennes",
    availableSeat: "1 place",
    fillingLevel: 20,
  },
  {
    id: 3,
    title: "Départ de Saint-Malo - 1 Mai - 9h",
    actionType: "Convoi",
    city: "Rennes",
    availableSeat: "complet",
    fillingLevel: 20,
  },
  {
    id: 4,
    title: "Collecte à Saint-Malo - 3 Mai - 9h",
    actionType: "Collecte",
    city: "Rennes",
    availableSeat: "complet",
    fillingLevel: 20,
  },
];
