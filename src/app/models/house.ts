export class House {
    id: Number;
    name: String;
    typeHouse: String;
    typeRoom: String;
    address: String;
    numberOfBathrooms: Number;
    numberOfBedrooms: Number;
    describe: String;
    priceByNight: String;
    priceByMonth: String;
    status: String;
    image: String;
    area: String

    constructor(name: String, typeHouse: String, typeRoom: String,
        numberOfBathrooms: Number, numberOfBedrooms: Number,
        address: String, describe: String, priceByNight: String,
        priceByMonth: String, status: String, image: String, area: String) {

        this.name = name;
        this.typeHouse = typeHouse;
        this.typeRoom = typeRoom;
        this.numberOfBathrooms = numberOfBathrooms;
        this.numberOfBedrooms = numberOfBedrooms;
        this.address = address;
        this.describe = describe;
        this.priceByNight = priceByNight;
        this.priceByMonth = priceByMonth;
        this.status = status;
        this.image = image;
        this.area = area;
    }
}

