import IResponse from "../../shared/IResponse";
import IItem from "../../shared/IItem";

interface ICartResponse extends IResponse {
    cartItems: IItem[] | null
}

export default ICartResponse;