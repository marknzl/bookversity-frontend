interface IItem {
    id: string,
    sellerId: string,
    itemName: string,
    itemDescription: string,
    price: number,
    timeCreated: string,
    itemImageUrl: string,
    imageFileName: string,
    inUserCart: boolean,
    sold: boolean,
    inCart: boolean
}

export default IItem;