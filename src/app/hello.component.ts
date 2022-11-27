import { Component, Input, SimpleChanges } from '@angular/core';
import { Chart, Highcharts } from 'angular-highcharts';
import { GridsterItem } from 'angular-gridster2';

@Component({
  selector: 'hello',
  templateUrl: './hello.component.html',
  styleUrls: [ './hello.component.css' ]
})
export class HelloComponent  {
  @Input() public unitHeight: number;
  @Input() public item: GridsterItem;
  public chart: Chart;
  public highChartsOptions: Highcharts.Options;   
  public loaded: boolean;

  constructor() {
      this.loaded = false;
      this.highChartsOptions = {
        chart: {
            type: "bar"
        },
        title: {
            text: "Basic drilldown"
        },
        legend: {
            enabled: false
        },

        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [
          {
            name: "random series",
            data: [[0,2],[1,2],[2,3],[4,4],[4,5]]
          }
        ]
      };
      this.chart = new Chart(this.highChartsOptions);
  }
  
  public ngOnChanges(changes: SimpleChanges) {
    if (this.loaded) {
      this.resizeChart();
    }
  }

  public ngAfterViewInit(): void {
      this.loaded = true;
  }

  public resizeChart(): void {
      console.log("resizeChart");
      this.highChartsOptions.chart.height = this.item.rows * (this.unitHeight - 10) + ((this.item.rows - 4) * 10);
      this.highChartsOptions.chart.width = this.item.cols * (this.unitHeight - 10) + ((this.item.cols - 4) * 10);

    if (this.chart.ref) {
        this.chart.ref.setSize(this.highChartsOptions.chart.width, this.highChartsOptions.chart.height, false);
    }
  }
}
