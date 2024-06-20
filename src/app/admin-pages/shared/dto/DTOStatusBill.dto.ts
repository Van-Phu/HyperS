export class DTOStatusBill {
    Code: number = 0;
    Status: string;
}

export const listStatusBill: DTOStatusBill[] = [
    {
        Code: 1,
        Status: "Chờ xác nhận"
    },
    {
        Code: 2,
        Status: "Đang đóng gói"
    },
    {
        Code: 3,
        Status: "Đang vận chuyển"
    },
    {
        Code: 4,
        Status: "Thành công"
    },
    {
        Code: 5,
        Status: "Thất bại"
    },
]