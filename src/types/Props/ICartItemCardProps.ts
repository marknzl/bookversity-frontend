import IItem from "../../shared/IItem";

interface ICartItemCardProps {
    item: IItem;
    removeFromCartFunc: (e: any) => void;
}

export default ICartItemCardProps;