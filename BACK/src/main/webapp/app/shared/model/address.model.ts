export interface IAddress {
  id?: number;
  number?: string;
  road?: string;
  town?: string;
  zipCode?: string;
}

export const defaultValue: Readonly<IAddress> = {};
