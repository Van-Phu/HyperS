export class DTOProvince{
    province_id: string = "";
    province_name: string = "";
    province_type: string = ""
}

export class DTODistrict{
    district_id: string = "";
    district_name: string = "";
    district_type: string = "";
    province_id: string = "";
    lat:string =  "";
    lng: string = ""
}

export class DTOWard{
    district_id: string = "";
    ward_id :string = "";
    ward_name: string = "";
    ward_type: string = ""
}