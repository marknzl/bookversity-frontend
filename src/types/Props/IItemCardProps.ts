import IItem from "../../shared/IItem";

interface IItemCardProps {
    item: IItem,
    updateFunc: () => void;
}

export default IItemCardProps;