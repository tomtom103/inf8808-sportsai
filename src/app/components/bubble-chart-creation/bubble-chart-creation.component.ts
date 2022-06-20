import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { legendSize } from 'd3-svg-legend';

@Component({
    selector: 'app-bubble-chart-creation',
    templateUrl: './bubble-chart-creation.component.html',
    styleUrls: ['./bubble-chart-creation.component.scss'],
})
export class BubbleChartCreationComponent implements OnInit {
    private data = [
        { player: 'Mané', KP: 36, PPA: 54, GCA: 13 },
        { player: 'Benzema', KP: 61, PPA: 84, GCA: 21 },
        { player: 'Leao', KP: 45, PPA: 51, GCA: 21 },
        { player: 'Salah', KP: 61, PPA: 61, GCA: 25 },
        { player: 'Mbappé', KP: 70, PPA: 60, GCA: 38 },
        { player: 'Nkunku', KP: 63, PPA: 58, GCA: 28 },
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

        let gca = this.data.map((d) => d.GCA);
        const radius = d3
            .scaleLinear()
            .domain([d3.min(gca as any[]), d3.max(gca as any[])])
            .range([5, 15]);

        const dots = this.svg.append('g');
        dots.selectAll('dot')
            .data(this.data)
            .enter()
            .append('circle')
            .attr('cx', (d) => x(d.KP))
            .attr('cy', (d) => y(d.PPA))
            .attr('r', (d) => radius(d.GCA))
            .style('opacity', 0.9)
            .style('fill', (d) => '#21A179');

        dots.selectAll('text')
            .data(this.data)
            .enter()
            .append('text')
            .text((d) => d.player)
            .attr('x', (d) => x(d.KP) - 10)
            .attr('y', (d) => y(d.PPA) - 10)
            .style('font-size', 12);

        //axis
        this.svg.append('text').text('PPA').attr('class', 'y axis-text').attr('transform', 'rotate(-90)').attr('font-size', 12);

        this.svg.append('text').text('KP (Key passes)').attr('class', 'x axis-text').attr('font-size', 12);

        this.svg.selectAll('.x.axis-text').attr('transform', `translate(${this.width / 2 - 40}, ${this.height + 40})`);

        this.svg.selectAll('.y.axis-text').attr('transform', `translate(-40, ${this.height / 2}) rotate(-90)`);

        //legend size
        this.svg.append('g').attr('class', 'radius').attr('transform', 'translate(700, 10)');

        var legend = legendSize().shape('circle').shapePadding(15).labelOffset(20).orient('vertical').scale(radius);

        this.svg.select('.radius').style('fill', '#21A179').style('font-size', 11).call(legend);
    }
}
