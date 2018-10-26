export class Camera{
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

    }

    static fromJson({name, description, type, price, owner}) {
        return new Camera(name, description, type, price, owner);
    }


    static fromJsonArray(json : any[]) : Camera[] {
        return json.map(Camera.fromJson);
    }
}
