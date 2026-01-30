import HousingImage from "#models/housing_image";

export default class HousingImageDto {
    constructor(private model: HousingImage) {}

    toJson() {
        return {
            id: this.model.id,
            image: this.model.image.toString()
        };
    }
}
