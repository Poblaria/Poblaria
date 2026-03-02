export default class ImageDto {
    constructor(private name: string) {}

    toJson() {
        return {
            name: this.name,
            src: "/images/" + this.name
        };
    }
}
