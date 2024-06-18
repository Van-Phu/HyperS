export class DTOModule {
    RouteLink: string
    ModuleName: string
    ClassIconFontAwesome?: string
    SubModule?: DTOModule[]
    IsChild: boolean
    IsSelected: boolean
}

export const listModule: DTOModule[] = [
    {
        RouteLink: '/admin',
        ModuleName: 'Quản lý tài khoản',
        ClassIconFontAwesome: 'fa-user',
        SubModule: [
            {
                RouteLink: '/admin/manage-user',
                ModuleName: 'Thông tin người dùng',
                IsChild: true,
                IsSelected: true
            },
            {
                RouteLink: '/admin/manage-staff',
                ModuleName: 'Thông tin nhân viên',
                IsChild: true,
                IsSelected: false
            }
        ],
        IsChild: false,
        IsSelected: true
    },
    {
        RouteLink: '/admin/manage-sub-module',
        ModuleName: 'Quản lý danh mục',
        ClassIconFontAwesome: 'fa-rectangle-list',
        IsChild: false,
        IsSelected: false
    },
    {
        RouteLink: '/admin/manage-dashboard',
        ModuleName: 'Dashboard',
        ClassIconFontAwesome: 'fa-chart-column',
        IsChild: false,
        IsSelected: false
    },
    {
        RouteLink: '/admin/manage-coupon',
        ModuleName: 'Quản lý khuyến mãi',
        ClassIconFontAwesome: 'fa-ticket',
        IsChild: false,
        IsSelected: false
    },
    {
        RouteLink: '/admin/manage-banner',
        ModuleName: 'Quản lý BANNER',
        ClassIconFontAwesome: 'fa-pager',
        IsChild: false,
        IsSelected: false
    },
    {
        RouteLink: '/admin/manage-cart',
        ModuleName: 'Đơn hàng',
        ClassIconFontAwesome: 'fa-cart-shopping',
        IsChild: false,
        IsSelected: false
    },
    {
        RouteLink: '/admin/manage-work-schedule',
        ModuleName: 'Quản lý lịch làm việc',
        ClassIconFontAwesome: 'fa-calendar-days',
        IsChild: false,
        IsSelected: false
    },
    {
        RouteLink: '/admin/manage-salary',
        ModuleName: 'Tính lương',
        ClassIconFontAwesome: 'fa-money-check-dollar',
        IsChild: false,
        IsSelected: false
    }
]
