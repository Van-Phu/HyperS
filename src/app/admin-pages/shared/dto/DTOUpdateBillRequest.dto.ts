import { DTOBillInfo } from "./DTOBillInfo.dto";

export class DTOUpdateBillRequest {
    CodeBill: number = 0;
    Status: number;
    ListOfBillInfo: DTOBillInfo[];
    Note: string;
}