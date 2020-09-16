import IItem from "../shared/IItem";

interface IItemPurchase {
    id: number;
    itemId: number;
    item: IItem;
    orderId: number;
}

export default IItemPurchase;