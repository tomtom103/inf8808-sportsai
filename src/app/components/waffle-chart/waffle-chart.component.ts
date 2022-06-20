import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-waffle-chart',
    templateUrl: './waffle-chart.component.html',
    styleUrls: ['./waffle-chart.component.scss'],
})
export class WaffleChartComponent implements OnInit {
    private className: string = 'waffle-chart';
    private data: any[] = [];
    private svg: any;

    plotSize: number = 750;

    constructor() {}

    ngOnInit(): void {
        this.createSvg();
    }

    private createSvg(): void {
        this.svg = d3
            .select('figure#offensive-danger')
            .append('svg')
            .attr('class', this.className)
            .attr('width', this.plotSize)
            .attr('height', this.plotSize);
    }
}
