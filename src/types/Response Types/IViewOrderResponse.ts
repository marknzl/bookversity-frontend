import IResponse from "../../shared/IResponse";
import IOrder from "../IOrder";

interface IViewOrderResponse extends IResponse {
    order: IOrder | null;
}

export default IViewOrderResponse;