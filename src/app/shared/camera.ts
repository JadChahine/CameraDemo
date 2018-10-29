export class Camera{
    id: String;
    name: String;
    description: String;
    type: String;
    price: String;
    owner: String;

    constructor(
        name: String,
        description: String,
        type: String,
        price: String,
        owner: String) {
            this.name = name;
            this.description = description;
            this.type = type;
            this.price = price;
            this.owner = owner;
    }

    static fromJson({name, description, type, price, owner}) {
        return new Camera(name, description, type, price, owner);
    }

    static fromJsonArray(json : any[]) : Camera[] {
        return json.map(Camera.fromJson);
    }
}
