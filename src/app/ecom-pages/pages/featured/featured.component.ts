import { Component } from '@angular/core';
import { DataSecondContent } from '../../shared/component/header/data/dataSecondPages';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent {
  dataContentSecond = DataSecondContent
}
