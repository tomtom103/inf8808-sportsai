import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-waffle-chart',
    templateUrl: './waffle-chart.component.html',
    styleUrls: ['./waffle-chart.component.scss'],
})
export class WaffleChartComponent implements OnInit {
    private className: string = 'waffle-chart';
    private svg: any;

    data: any[] = [
        { Player: 'Sadio Mané', Gls: 16, Sh: 99, SoT: 37 },
        { Player: 'Rafael Leão', Gls: 11, Sh: 97, SoT: 38 },
        { Player: 'Karim Benzema', Gls: 27, Sh: 118, SoT: 47 },
        { Player: 'Mohamed Salah', Gls: 23, Sh: 134, SoT: 49 },
        { Player: 'Kylian Mbappé', Gls: 28, Sh: 144, SoT: 60 },
        { Player: 'Christopher Nkunku', Gls: 20, Sh: 80, SoT: 39 },
    ];
    plotSize: number = 750;

    constructor() {}

    ngOnInit(): void {
        this.createSvg();
    }

    private createSvg(): void {
        this.svg = d3
            .select('figure#waffle-chart')
            .append('svg')
            .attr('class', this.className)
            .attr('width', this.plotSize)
            .attr('height', this.plotSize);
    }
}
