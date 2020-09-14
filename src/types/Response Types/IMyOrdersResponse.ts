import IResponse from "../../shared/IResponse";
import IOrder from "../IOrder";

interface IMyOrdersResponse extends IResponse {
    myOrders: IOrder[] | null;
}

export default IMyOrdersResponse;