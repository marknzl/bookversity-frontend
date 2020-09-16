import IItemPurchase from "./IItemPurchase";

interface IOrder {
    id: number;
    userId: string
    total: number;
    transactionDate: string;
    itemsPurchased: IItemPurchase[];
}

export default IOrder;