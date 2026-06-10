export type Role = 'member' | 'admin' | 'root';

export type Status = 'active' | 'inactive' | 'pending' | 'rejected' | 'banned' | 'deleted';

export class UserEntity {
  id: bigint;
  uid: string;
  name: string;
  password: string;
  email: string;
  role: Role = 'member';
  status: Status = 'pending';
  dob: Date;
  phone!: string;
  constructor(id: bigint, uid: string, name: string, password: string, email: string, dob: Date, phone: string) {
    this.id = id;
    this.uid = uid;
    this.name = name;
    this.password = password;
    this.email = email;
    this.dob = dob;
    this.phone = phone;
  }
}
