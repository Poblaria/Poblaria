import HousingV2 from "#models/housing_v2";

export default class HousingV2Dto {
    constructor(private model: HousingV2) {}

    toJson() {
        return {
            id: this.model.id,
            title: this.model.title,
            subtitle: this.model.subtitle,
            url: this.model.url,
            thumbnail: this.model.thumbnail,
            numPhotos: this.model.numPhotos,
            floor: this.model.floor,
            price: {
                amount: this.model.price,
                currencySuffix: this.model.currencySuffix,
                priceByArea: this.model.priceByArea,
                drop: {
                    formerPrice: this.model.priceDropFormerPrice,
                    value: this.model.priceDropValue,
                    percentage: this.model.priceDropPercentage
                }
            },
            type: {
                propertyType: this.model.propertyType,
                operation: this.model.operation,
                typology: this.model.typology,
                subTypology: this.model.subTypology
            },
            characteristics: {
                size: this.model.size,
                exterior: this.model.exterior,
                rooms: this.model.rooms,
                bathrooms: this.model.bathrooms
            },
            location: {
                address: this.model.address,
                province: this.model.province,
                municipality: this.model.municipality,
                district: this.model.district,
                neighborhood: this.model.neighborhood,
                region: this.model.region,
                subregion: this.model.subregion,
                country: this.model.country,
                latitude: this.model.latitude,
                longitude: this.model.longitude
            },
            description: this.model.description,
            status: this.model.status,
            features: {
                hasVideo: this.model.hasVideo,
                hasPlan: this.model.hasPlan,
                has3DTour: this.model.has3DTour,
                has360: this.model.has360,
                hasStaging: this.model.hasStaging,
                hasLift: this.model.hasLift
            },
            parkingSpace: {
                hasParkingSpace: this.model.hasParkingSpace,
                isParkingSpaceIncludedInPrice: this.model.isParkingSpaceIncludedInPrice,
                parkingSpacePrice: this.model.parkingSpacePrice
            },
            highlight: this.model.highlightGroupDescription
                ? { groupDescription: this.model.highlightGroupDescription }
                : null,
            isAvailable: this.model.isAvailable,
            createdAt: this.model.createdAt,
            updatedAt: this.model.updatedAt
        };
    }
}
