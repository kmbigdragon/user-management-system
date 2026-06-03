export type role = 'member' | 'admin' | 'root';

export type status = 'active' | 'pending' | 'rejected' | 'deleted';

export class UserEntity {
  uid: string;
  name: string;
  password: string;
  email: string;
  role: role = 'member';
  status: status = 'pending';
  dob: Date;
  phone!: string;
  constructor(uid: string, name: string, password: string, email: string, dob: Date, phone: string) {
    this.uid = uid;
    this.name = name;
    this.password = password;
    this.email = email;
    this.dob = dob;
    this.phone = phone;
  }
}
