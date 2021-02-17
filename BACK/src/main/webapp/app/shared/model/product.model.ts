export interface IProduct {
  id?: number;
  name?: string;
  price?: number;
  description?: any;
  typeId?: number;
}

export const defaultValue: Readonly<IProduct> = {};
