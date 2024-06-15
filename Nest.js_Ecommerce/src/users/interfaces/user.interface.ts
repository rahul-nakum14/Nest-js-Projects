import { Role } from '../enums/role.enum';

export interface userInterface {
  email: string;
  password: string;
  role?: Role;
}
