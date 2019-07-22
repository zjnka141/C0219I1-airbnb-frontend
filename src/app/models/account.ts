export class Account {
    id?: Number;
    fullName: String;
    username: String;
    age?: String;
    gender?: String;
    phone?: String;
    address?: String;
    email: String;
    password: String;

    constructor(fullName: String, username: String, age: String, gender: String, phone: String, address: String, email: String, password: String) {
        this.fullName = fullName,
            this.username = username,
            this.age = age,
            this.gender = gender,
            this.phone = phone,
            this.address = address,
            this.email = email,
            this.password = password
    }
}
