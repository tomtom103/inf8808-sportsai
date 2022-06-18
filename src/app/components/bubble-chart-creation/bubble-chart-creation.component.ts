import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-bubble-chart-creation',
    templateUrl: './bubble-chart-creation.component.html',
    styleUrls: ['./bubble-chart-creation.component.scss'],
})
export class BubbleChartCreationComponent implements OnInit {
    private data = [
        { player: 'Sadio Mané', KP: 36, PPA: 54, GCA: 13 },
        { player: 'Karim Benzema', KP: 61, PPA: 84, GCA: 21 },
        { player: 'Rafael Leao', KP: 45, PPA: 51, GCA: 21 },
        { player: 'Mohamed Salah', KP: 61, PPA: 61, GCA: 25 },
        { player: 'Kylian Mbappé', KP: 70, PPA: 60, GCA: 38 },
        { player: 'Christopher Nkunku', KP: 63, PPA: 58, GCA: 28 },
    ];

    private svg!: any;
    private margin: number = 50;
    private width: number = 750 - this.margin * 2;
    private height: number = 400 - this.margin * 2;

    ngOnInit(): void {
        this.createSvg();
        this.drawPlot();
    }

    private createSvg(): void {
        this.svg = d3
            .select('figure#bubble')
            .append('svg')
            .attr('width', this.width + this.margin * 5)
            .attr('height', this.height + this.margin * 5)
            .append('g')
            .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
    }

    private drawPlot() {
        const x = d3.scaleLinear().domain([35, 75]).range([0, this.width]);
        this.svg
            .append('g')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3.axisBottom(x).tickFormat(d3.format('d')));

        // Add Y axis
        const y = d3.scaleLinear().domain([45, 90]).range([this.height, 0]);
        this.svg.append('g').call(d3.axisLeft(y));

        // Add color scale
        const color = d3
            .scaleOrdinal()
            .domain(this.data.map((d) => d.player))
            .range(d3.schemeCategory10);

        const radius = d3
            .scaleLinear()
            .domain(this.data.map((d) => d.GCA))
            .range([5, 10]);

        const dots = this.svg.append('g');
        dots.selectAll('dot')
            .data(this.data)
            .enter()
            .append('circle')
            .attr('cx', (d) => x(d.KP))
            .attr('cy', (d) => y(d.PPA))
            .attr('r', (d) => radius(d.GCA))
            .style('opacity', 0.5)
            .style('fill', (d) => color(d.player));
    }
}
