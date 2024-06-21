export class DTOStatus {
    Code: number = 0;
    Status: string;
}

export const listStatus: DTOStatus[] = [
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
    }
]

export const listStatusAccount: DTOStatus[] = [
    {
        Code: 6,
        Status: "Hoạt động"
    },
    {
        Code: 7,
        Status: "Vô hiệu hóa"
    }
]