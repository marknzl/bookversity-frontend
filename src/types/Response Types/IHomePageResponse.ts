import IResponse from "../../shared/IResponse";
import IItem from "../../shared/IItem";

interface IHomePageResponse extends IResponse {
    items: IItem[] | null
}

export default IHomePageResponse;