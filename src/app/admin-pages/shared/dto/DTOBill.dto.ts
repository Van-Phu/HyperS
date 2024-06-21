export class DTOBill {
    Code: number = 0;
    CustomerName: string;
    PhoneNumber: string;
    ShippingAddress: string;
    CreateAt: Date;
    PaymentMethod: string;
    Status: string;
    TotalBill: number;
}

export const listBill: DTOBill[] = [
    {
        Code: 1,
        CustomerName: 'Đỗ Quốc Thành',
        PhoneNumber: '0913126754',
        ShippingAddress: '69/68 Đ. Đặng Thuỳ Trâm, Phường 13, Bình Thạnh, Hồ Chí Minh',
        CreateAt: new Date('2024-06-20'),
        PaymentMethod: 'Momo',
        Status: 'Chờ xác nhận',
        TotalBill: 2252000,
    },
    {
        Code: 2,
        CustomerName: 'Đỗ Quốc Thành',
        PhoneNumber: '0913126754',
        ShippingAddress: '69/68 Đ. Đặng Thuỳ Trâm, Phường 13, Bình Thạnh, Hồ Chí Minh',
        CreateAt: new Date('2024-06-20'),
        PaymentMethod: 'Momo',
        Status: 'Đang đóng gói',
        TotalBill: 2252000,
    },
    {
        Code: 3,
        CustomerName: 'Đỗ Quốc Thành',
        PhoneNumber: '0913126754',
        ShippingAddress: '69/68 Đ. Đặng Thuỳ Trâm, Phường 13, Bình Thạnh, Hồ Chí Minh',
        CreateAt: new Date('2024-06-20'),
        PaymentMethod: 'Momo',
        Status: 'Đang vận chuyển',
        TotalBill: 2252000,
    },
    {
        Code: 4,
        CustomerName: 'Đỗ Quốc Thành',
        PhoneNumber: '0913126754',
        ShippingAddress: '69/68 Đ. Đặng Thuỳ Trâm, Phường 13, Bình Thạnh, Hồ Chí Minh',
        CreateAt: new Date('2024-06-20'),
        PaymentMethod: 'Momo',
        Status: 'Thành công',
        TotalBill: 2252000,
    },
]