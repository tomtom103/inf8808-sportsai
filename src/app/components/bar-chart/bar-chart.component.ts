import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
    private data = [
        { framework: 'Vue', stars: 166443, released: 2014 },
        { framework: 'React', stars: 150793, released: 2013 },
        { framework: 'Angular', stars: 62342, released: 2016 },
        { framework: 'Backbone', stars: 27647, released: 2010 },
        { framework: 'Ember', stars: 21471, released: 2011 },
    ];
    private svg!: any;
    private margin: number = 50;
    private width: number = 750 - this.margin * 2;
    private height: number = 400 - this.margin * 2;

    ngOnInit(): void {
        this.createSvg();
        d3.csv('assets/frameworks.csv').then((data) => this.drawBars(data));
    }

    private createSvg(): void {
        this.svg = d3
            .select('figure#bar')
            .append('svg')
            .attr('width', this.width + this.margin * 2)
            .attr('height', this.height + this.margin * 2)
            .append('g')
            .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
    }

    private drawBars(data: any[]): void {
        // Create the X-axis band scale
        const x = d3
            .scaleBand()
            .range([0, this.width])
            .domain(data.map((d) => d.framework))
            .padding(0.2);

        // Draw the X-axis on the DOM
        this.svg
            .append('g')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3.axisBottom(x))
            .selectAll('text')
            .attr('transform', 'translate(-10,0)rotate(-45)')
            .style('text-anchor', 'end');

        // Create the Y-axis band scale
        const y = d3.scaleLinear().domain([0, 200000]).range([this.height, 0]);

        // Draw the Y-axis on the DOM
        this.svg.append('g').call(d3.axisLeft(y));

        // Create and fill the bars
        this.svg
            .selectAll('bars')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', (d) => x(d.framework))
            .attr('y', (d) => y(d.stars))
            .attr('width', x.bandwidth())
            .attr('height', (d) => this.height - y(d.stars))
            .attr('fill', '#d04a35');
    }
}
