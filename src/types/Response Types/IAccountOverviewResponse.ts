import IResponse from "../../shared/IResponse";
import IAccountOverview from "../IAccountOverview";

interface IAccountOverviewResponse extends IResponse {
    accountOverview: IAccountOverview | null;
}

export default IAccountOverviewResponse;