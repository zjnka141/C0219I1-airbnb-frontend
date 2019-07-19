export class House {
    id: Number;
    name: String;
    typeOfHouse: String;
    typeOfRoom: String;
    address: String;
    bathroom: Number;
    bedroom: Number;
    description: String;
    priceByNight: String;
    priceByMonth: String;
    status: String;
    image: String;
    area: String

    constructor(name: String, typeOfHouse: String, typeOfRoom: String,
        bathroom: Number, bedroom: Number,
        address: String, description: String, priceByNight: String,
        priceByMonth: String, status: String, image: String, area: String) {

        this.name = name;
        this.typeOfHouse = typeOfHouse;
        this.typeOfRoom = typeOfRoom;
        this.bathroom = bathroom;
        this.bedroom = bedroom;
        this.address = address;
        this.description = description;
        this.priceByNight = priceByNight;
        this.priceByMonth = priceByMonth;
        this.status = status;
        this.image = image;
        this.area = area;
    }
}
