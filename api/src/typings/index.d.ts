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

export interface ConvoyType {
  _id: string;
  pickupName: string;
  pickupGeometry: Geometry;
  deliveryName: string;
  deliveryGeometry: Geometry;
  departure: Date;
  availableVolume: number;
  needDrivers?: boolean;
  availableSeat?: number;
  needCollects?: boolean;
  needs: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
