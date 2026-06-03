export class ReadUserDto {
  uid!: string;
  name!: string;
  email!: string;
  dob!: string;
  phone!: string;

  constructor(uid: string, name: string, email: string, dob: string, phone: string) {
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.dob = dob;
    this.phone = phone;
  }
}
