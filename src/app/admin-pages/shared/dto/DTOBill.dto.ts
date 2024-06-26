import { DTOBillInfo } from "./DTOBillInfo.dto";

export class DTOBill {
    Code: number = 0;
    CustomerName: string;
    PhoneNumber: string;
    ShippingAddress: string;
    CreateAt: Date;
    PaymentMethod: string;
    Status: string;
    ListBillInfo:DTOBillInfo[];
    // Voucher: string = "Không có";
    TotalDiscount: number;
    TotalBill: number;
}



export const listBill: DTOBill[] = [
    {
        Code: 1,
        CustomerName: 'Đỗ Quốc Thành',
        PhoneNumber: '0855280747',
        ShippingAddress: '69/68 Đ. Đặng Thuỳ Trâm, Phường 13, Bình Thạnh, Hồ Chí Minh',
        CreateAt: new Date('2024-06-20'),
        PaymentMethod: 'Momo',
        Status: 'Chờ xác nhận',
        ListBillInfo: [
            {
                Code: 1,
                IDProduct: 'NIKEAZP38',
                Name: 'Nike Air Zoom Pegasus 38',
                ImageUrl: '...',
                Size: '42',
                Price: 500000,
                Quantity: 2,
                TotalCost: 900000
            },
            {
                Code: 2,
                IDProduct: 'NIKEAW10N',
                Name: 'Nike Air Winflo 10 Nam',
                ImageUrl: '...',
                Size: '42',
                Price: 500000,
                Quantity: 1,
                TotalCost: 400000
            }
            ,
            {
                Code: 3,
                IDProduct: 'NIKEAZP38',
                Name: 'Nike Air Zoom Pegasus 38',
                ImageUrl: '...',
                Size: '43',
                Price: 500000,
                Quantity: 1,
                TotalCost: 400000
            }
        ],
        TotalDiscount: 0,
        TotalBill: 0,
    },
    {
        Code: 2,
        CustomerName: 'Đỗ Quốc Thành',
        PhoneNumber: '0913126754',
        ShippingAddress: '69/68 Đ. Đặng Thuỳ Trâm, Phường 13, Bình Thạnh, Hồ Chí Minh',
        CreateAt: new Date('2024-06-20'),
        PaymentMethod: 'Momo',
        Status: 'Đang đóng gói',
        ListBillInfo: [
            {
                Code: 1,
                IDProduct: 'NIKEAZP38',
                Name: 'Nike Air Zoom Pegasus 38',
                ImageUrl: '...',
                Size: '42',
                Price: 500000,
                Quantity: 2,
                TotalCost: 900000
            },
            {
                Code: 2,
                IDProduct: 'NIKEAW10N',
                Name: 'Nike Air Winflo 10 Nam',
                ImageUrl: '...',
                Size: '42',
                Price: 500000,
                Quantity: 1,
                TotalCost: 400000
            }
            ,
            {
                Code: 3,
                IDProduct: 'NIKEAZP38',
                Name: 'Nike Air Zoom Pegasus 38',
                ImageUrl: '...',
                Size: '43',
                Price: 500000,
                Quantity: 1,
                TotalCost: 400000
            }
        ],
        TotalDiscount: 0,
        TotalBill: 0,
    },
    {
        Code: 3,
        CustomerName: 'Đỗ Quốc Thành',
        PhoneNumber: '0913126754',
        ShippingAddress: '69/68 Đ. Đặng Thuỳ Trâm, Phường 13, Bình Thạnh, Hồ Chí Minh',
        CreateAt: new Date('2024-06-20'),
        PaymentMethod: 'Momo',
        Status: 'Đang vận chuyển',
        ListBillInfo: [
            {
                Code: 1,
                IDProduct: 'NIKEAZP38',
                Name: 'Nike Air Zoom Pegasus 38',
                ImageUrl: '...',
                Size: '42',
                Price: 500000,
                Quantity: 2,
                TotalCost: 900000
            },
            {
                Code: 2,
                IDProduct: 'NIKEAW10N',
                Name: 'Nike Air Winflo 10 Nam',
                ImageUrl: '...',
                Size: '42',
                Price: 500000,
                Quantity: 1,
                TotalCost: 400000
            }
            ,
            {
                Code: 3,
                IDProduct: 'NIKEAZP38',
                Name: 'Nike Air Zoom Pegasus 38',
                ImageUrl: '...',
                Size: '43',
                Price: 500000,
                Quantity: 1,
                TotalCost: 400000
            }
        ],
        TotalDiscount: 0,
        TotalBill: 0,
    },
    {
        Code: 4,
        CustomerName: 'Đỗ Quốc Thành',
        PhoneNumber: '0913126754',
        ShippingAddress: '69/68 Đ. Đặng Thuỳ Trâm, Phường 13, Bình Thạnh, Hồ Chí Minh',
        CreateAt: new Date('2024-06-20'),
        PaymentMethod: 'Momo',
        Status: 'Thành công',
        ListBillInfo: [
            {
                Code: 1,
                IDProduct: 'NIKEAZP38',
                Name: 'Nike Air Zoom Pegasus 38',
                ImageUrl: '...',
                Size: '42',
                Price: 500000,
                Quantity: 2,
                TotalCost: 900000
            },
            {
                Code: 2,
                IDProduct: 'NIKEAW10N',
                Name: 'Nike Air Winflo 10 Nam',
                ImageUrl: '...',
                Size: '42',
                Price: 500000,
                Quantity: 1,
                TotalCost: 400000
            }
            ,
            {
                Code: 3,
                IDProduct: 'NIKEAZP38',
                Name: 'Nike Air Zoom Pegasus 38',
                ImageUrl: '...',
                Size: '43',
                Price: 500000,
                Quantity: 1,
                TotalCost: 400000
            }
        ],
        TotalDiscount: 100,
        TotalBill: 2252000,
    },
]

