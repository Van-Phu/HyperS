export class DTOModule{
    RouteLink?: string
    ModuleName?: string
    SubModule?: DTOModule[]
}

export const listModule: DTOModule[] = [
    {
        RouteLink: '/admin',
        ModuleName: 'Quản lý tài khoản',
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