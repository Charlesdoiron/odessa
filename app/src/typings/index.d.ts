declare module "history";

type PENDING = { label: "En attente"; value: "pending" };
type ACCEPTED = { label: "En cours"; value: "accepted" };
type CANCELED = { label: "Annulé"; value: "canceled" };
type COMPLETED = { label: "Chargée !"; value: "completed" };

export interface Geometry {
  type: string;
  coordinates: number[];
  _id: string;
}

export type CollectType = {
  _id: string;
  title: string;
  pickupName: string;
  pickupGeometry: Geometry;
  departure: Date;
  availableVolume: number;
  status: PENDING | ACCEPTED | CANCELED | COMPLETED;
  needs: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  whatsappLink: string;
  __v: number;
};

export interface ConvoyType {
  _id: string;
  title: string;
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
