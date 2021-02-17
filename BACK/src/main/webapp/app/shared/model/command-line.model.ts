export interface ICommandLine {
  id?: number;
  quantity?: number;
  productId?: number;
  clientId?: number;
}

export const defaultValue: Readonly<ICommandLine> = {};
