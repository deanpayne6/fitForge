
export class User {

  email: string;
  username: string;
  password: string | null;
  first_name: string;
  last_name: string;
  age: number;

  constructor(email, username, first_name, last_name, age) {
    this.email = email,
    this.username = username,
    this.first_name = first_name,
    this.last_name = last_name,
    this.age = age
  }
}
