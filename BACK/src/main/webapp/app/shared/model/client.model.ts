import { ICommandLine } from 'app/shared/model/command-line.model';

export interface IClient {
  id?: number;
  phone?: string;
  userId?: number;
  carts?: ICommandLine[];
  addressId?: number;
}

export const defaultValue: Readonly<IClient> = {};
