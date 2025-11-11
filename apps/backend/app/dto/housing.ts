import Housing from "#models/housing";

export default class HousingDto {
    constructor(private model: Housing) {}

    toJson() {
        return {
            id: this.model.id,
            title: this.model.title,
            description: this.model.description,
            imageId: this.model.imageId,
            price: this.model.price,
            typeId: this.model.typeId,
            offerTypeId: this.model.offerTypeId,
            conditionId: this.model.conditionId,
            rooms: this.model.rooms,
            bathrooms: this.model.bathrooms,
            area: this.model.area,
            landArea: this.model.landArea,
            address: this.model.address,
            latitude: this.model.latitude,
            longitude: this.model.longitude,
            isAvailable: this.model.isAvailable,
            createdAt: this.model.createdAt,
            updatedAt: this.model.updatedAt
        };
    }
}
