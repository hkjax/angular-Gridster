import { Component, SimpleChanges, ViewChild } from '@angular/core';
import { GridsterConfig, GridsterItem, GridsterItemComponent, GridsterItemComponentInterface } from 'angular-gridster2';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
      @ViewChild('gridsterItem') gridItem: GridsterItemComponent;

      public options: GridsterConfig;
      public unitHeight: number;
      public item: GridsterItem;

    constructor() {
        this.unitHeight = 0;
        this.item = {x: 0, y: 0, rows: 5, cols: 4};
        this.options = {
         itemResizeCallback: this.itemResize.bind(this),
         pushItems: true,
         minCols: 12,
         maxCols: 12,
         minRows: 5,
         fixedRowHeight: 120,
         setGridSize: true,
         gridType: 'scrollVertical',
         resizable: {
             enabled: true
         },
         draggable: {
             enabled: true
         }
       };
   }
   public itemResize(item: GridsterItem, itemComponent: GridsterItemComponentInterface): void {
       itemComponent.gridster.curRowHeight += (item.cols * 100 - item.rows) / 10000;
       console.log('item resize');
       if (itemComponent.gridster.curRowHeight > 1) {
           this.unitHeight = itemComponent.gridster.curRowHeight;
       }
   }

   public ngOnChanges(changes: SimpleChanges): void {
      if (this.options.api) {
          this.options.api.optionsChanged();
      }
      if (this.gridItem && this.gridItem.gridster.curRowHeight > 1) {
          this.unitHeight = this.gridItem.gridster.curRowHeight;
      }
   }
}
