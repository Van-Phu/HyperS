export class DTOStatus {
    Code: number;
    Status: string;
    Icon: string;
    IsChecked: boolean
}

export const listStatus: DTOStatus[] = [
    {
        Code: 1,
        Status: "Chờ xác nhận",
        Icon: "fa-eye",
        IsChecked: false
    },
    {
        Code: 2,
        Status: "Đang đóng gói",
        Icon: "fa-share",
        IsChecked: false
    },
    {
        Code: 3,
        Status: "Đang vận chuyển",
        Icon: "fa-cart-flatbed",
        IsChecked: false
    },
    {
        Code: 4,
        Status: "Giao hàng thành công",
        Icon: "fa-circle-check",
        IsChecked: false
    },
    {
        Code: 5,
        Status: "Giao hàng thất bại",
        Icon: "fa-circle-xmark",
        IsChecked: false
    }
]

export const listStatusActive: DTOStatus[] = [
    {
        Code: 0,
        Status: "Hoạt động",
        Icon: "",
        IsChecked: true
    },
    {
        Code: 1,
        Status: "Vô hiệu hóa",
        Icon: "",
        IsChecked: false
    }
]