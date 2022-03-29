declare module "history";

export type CollectType = {
  availableSeat: number;
  availableVolume: number;
  createdAt: Date;
  email: string;
  name: string;
  needs: string;
  phone: string;
  pickupGeometry: { type: string; coordinates: string[]; _id: string };
  pickupName: string;
  updatedAt: Date;
};

export interface Geometry {
  type: string;
  coordinates: number[];
  _id: string;
}

//  { label: "En attente", value: "pending" },
//                             { label: "En cours", value: "accepted" },
//                             { label: "Annulée", value: "declined" },
//                             { label: "Sur la route", value: "delivering" },
//                             { label: "Livrée !", value: "completed" },

type PENDING = { label: "En attente"; value: "pending" };
type ACCEPTED = { label: "En cours"; value: "accepted" };

export interface ConvoyType {
  _id: string;
  pickupName: string;
  pickupGeometry: Geometry;
  dropOffName: string;
  dropOffGeometry: Geometry;
  departure: Date;
  availableVolume: number;
  needDrivers?: boolean;
  availableSeat?: number;
  needCollects?: boolean;
  status: PENDING | ACCEPTED;
  needs: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  whatsappLink: string;
  __v: number;
}
