import { Role, Status } from '../entities/user.entity';

export class ReadUserDto {
  uid!: string;
  name!: string;
  email!: string;
  dob!: string;
  phone!: string;
  status!: Status;
  role!: Role;

  constructor(uid: string, name: string, email: string, dob: string, phone: string, status: Status, role: Role) {
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.dob = dob;
    this.phone = phone;
    this.status = status;
    this.role = role;
  }
}
