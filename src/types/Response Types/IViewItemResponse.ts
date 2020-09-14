import IResponse from "../../shared/IResponse";
import IItem from "../../shared/IItem";

interface IViewItemResponse extends IResponse {
    item: IItem | null;
}

export default IViewItemResponse;