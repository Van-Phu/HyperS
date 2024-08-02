import { AfterViewInit, Component, ElementRef } from '@angular/core';

interface Position {
  id: number;
  name: string;
}

interface Location {
  id: number;
  name: string;
  positions: Position[];
}

interface Department {
  id: number;
  name: string;
  locations: Location[];
}

@Component({
  selector: 'app-list-master-detail',
  templateUrl: './list-master-detail.component.html',
  styleUrls: ['./list-master-detail.component.scss']
})

export class ListMasterDetailComponent {
  initiallyExpanded: boolean = true;
  public data: Department[] = [
    {
      id: 1,
      name: 'Department A',
      locations: [
        {
          id: 1,
          name: 'Location A1',
          positions: [
            { id: 1, name: 'Position A1-1' },
            { id: 2, name: 'Position A1-2' }
          ]
        },
        {
          id: 2,
          name: 'Location A2',
          positions: [
            { id: 3, name: 'Position A2-1' }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Department B',
      locations: [
        {
          id: 3,
          name: 'Location B1',
          positions: [
            { id: 4, name: 'Position B1-1' },
            { id: 5, name: 'Position B1-2' },
            { id: 6, name: 'Position B1-3' }
          ]
        }
      ]
    }
  ];

  // Fetch data ra list
  fetchChildren = (item?: any): any[] => {
    if (!item) {
      return this.data || [];
    }

    const children: any[] = [];
    const fields = ['locations', 'positions'];

    fields.forEach(field => {
      if (this.hasListValue(item[field])) {
        children.push(...item[field]);
      }
    });

    return children;
  }

  // Kiểm tra xem item đó có item con hay không
  hasChildren = (item: any): boolean => {
    const children = this.fetchChildren(item);
    return children && children.length > 0;
  };

  // Hàm kiểm tra xem danh sách có giá trị hay không
  hasListValue = (list: any[]): boolean => {
    return Array.isArray(list) && list.length > 0;
  };
}
