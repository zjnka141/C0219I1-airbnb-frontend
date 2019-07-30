export class Booking {
    id: number;
    fullName: String;
    birthday: Date;
    gender: String;
    phone: String;
    relationship: String;
    checkIn: Date;
    checkOut: Date;
    amount: number;
    desciptionBookingHouse: String;
    constructor(fullName: String, birthday: Date, gender: String, phone: String, relationship: String, checkIn: Date, checkOut: Date, amount: number, descriptionBookingHouse: String) {
        this.fullName = fullName,
            this.birthday = birthday,
            this.gender = gender,
            this.phone = phone,
            this.relationship = relationship,
            this.checkIn = checkIn,
            this.checkOut = checkOut,
            this.amount = amount,
            this.desciptionBookingHouse = descriptionBookingHouse;
    }
}