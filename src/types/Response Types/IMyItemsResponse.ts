import IResponse from "../../shared/IResponse";
import IItem from "../../shared/IItem";

interface IMyItemsResponse extends IResponse {
    myItems: IItem[] | null
}

export default IMyItemsResponse;