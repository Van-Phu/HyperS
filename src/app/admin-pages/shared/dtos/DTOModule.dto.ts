export class DTOModule{
    RouteLink: string
    ModuleName: string
    Icon?: string
    SubModule?: DTOModule[]
}

export const listModule: DTOModule[] = [
    {
        RouteLink: '/admin',
        ModuleName: 'Quản lý tài khoản',
        Icon: 'fa-user',
        SubModule: [
            {
                RouteLink: '/admin/manage-user',
                ModuleName: 'Thông tin người dùng',
            },
            {
                RouteLink: '/admin/manage-staff',
                ModuleName: 'Thông tin nhân viên',
            }
        ]
    },
    {
        RouteLink: '/admin',
        ModuleName: 'Quản lý tài khoản',
        Icon: 'fa-list-ul',
        SubModule: [
            {
                RouteLink: '/admin/manage-user',
                ModuleName: 'Thông tin người dùng',
                SubModule: []
            },
            {
                RouteLink: '/admin/manage-staff',
                ModuleName: 'Thông tin nhân viên',
                SubModule: []
            }
        ]
    }
]
