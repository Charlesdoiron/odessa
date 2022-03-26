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

export interface PickupGeometry {
  type: string;
  coordinates: number[];
  _id: string;
}

export interface ConvoyType {
  _id: string;
  pickupName: string;
  pickupGeometry: PickupGeometry;
  availableSeat: number;
  availableVolume: string;
  needs: string;
  email: string;
  phone: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
