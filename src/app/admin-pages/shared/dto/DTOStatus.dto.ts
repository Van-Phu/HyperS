export class DTOStatus {
    Code: number;
    Status: string;
    Icon: string;
}

export const listStatus: DTOStatus[] = [
    {
        Code: 1,
        Status: "Chờ xác nhận",
        Icon: "fa-eye",
    },
    {
        Code: 2,
        Status: "Đang đóng gói",
        Icon: "fa-share",
    },
    {
        Code: 3,
        Status: "Đang vận chuyển",
        Icon: "fa-cart-flatbed",
    },
    {
        Code: 4,
        Status: "Thành công",
        Icon: "fa-circle-check",
    },
    {
        Code: 5,
        Status: "Thất bại",
        Icon: "fa-circle-xmark",
    }
]

export const listStatusActive: DTOStatus[] = [
    {
        Code: 0,
        Status: "Hoạt động",
        Icon: "",
    },
    {
        Code: 1,
        Status: "Vô hiệu hóa",
        Icon: "",
    }
]