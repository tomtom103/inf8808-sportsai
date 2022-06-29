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
            .attr('height', this.height + this.margin * 3)
            .append('g')
            .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
    }

    private drawPlot() {
        //Get scales
        let scales = this.getScales();
        let x = scales.x;
        let y = scales.y;
        let radius = scales.radius;

        // Add X axis
        this.svg
            .append('g')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3.axisBottom(x).tickFormat(d3.format('d')));

        // Add Y axis
        this.svg.append('g').call(d3.axisLeft(y));

        this.drawBubbles(x, y, radius);

        this.formatAxisLabels();

        this.drawLegend(radius);
    }

    private getScales() {
        let x = d3.scaleLinear().domain([35, 75]).range([0, this.width]);
        let y = d3.scaleLinear().domain([45, 90]).range([this.height, 0]);
        let gca = this.data.map((d) => d.GCA);
        let radius = d3
            .scaleLinear()
            .domain([d3.min(gca as any[]), d3.max(gca as any[])])
            .range([5, 15]);

        return { x, y, radius };
    }

    private drawBubbles(x: any, y: any, radius: any) {
        const dots = this.svg.append('g');
        dots.selectAll('dot')
            .data(this.data)
            .enter()
            .append('circle')
            .attr('cx', (d) => x(d.KP))
            .attr('cy', (d) => y(d.PPA))
            .attr('r', (d) => radius(d.GCA))
            .style('fill', (d) => '#ABA9A9');

        dots.selectAll('text')
            .data(this.data)
            .enter()
            .append('text')
            .text((d) => d.player)
            .attr('x', (d) => x(d.KP) - 10)
            .attr('y', (d) => y(d.PPA) - 15)
            .style('font-size', 14)
            .style('font-weight', 550);
    }

    private formatAxisLabels() {
        this.svg.append('text').text('PPA').attr('class', 'y axis-text').attr('transform', 'rotate(-90)').attr('font-size', 12);

        this.svg.append('text').text('KP (Key passes)').attr('class', 'x axis-text').attr('font-size', 12);

        this.svg.selectAll('.x.axis-text').attr('transform', `translate(${this.width / 2 - 40}, ${this.height + 40})`);

        this.svg.selectAll('.y.axis-text').attr('transform', `translate(-40, ${this.height / 2}) rotate(-90)`);
    }

    private drawLegend(radius: any) {
        this.svg.append('g').attr('class', 'radius').attr('transform', 'translate(700, 10)');

        var legend = legendSize().shape('circle').shapePadding(15).labelOffset(20).orient('vertical').title('GCA').scale(radius);

        this.svg.select('.radius').style('font-size', 14).call(legend);
    }
}
