/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-scatter',
    templateUrl: './scatter.component.html',
    styleUrls: ['./scatter.component.scss'],
})
export class ScatterComponent implements OnInit {
    private data = [
        { framework: 'Vue', stars: 166443, released: 2014 },
        { framework: 'React', stars: 150793, released: 2013 },
        { framework: 'Angular', stars: 62342, released: 2016 },
        { framework: 'Backbone', stars: 27647, released: 2010 },
        { framework: 'Ember', stars: 21471, released: 2011 },
    ];
    private svg!: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>;
    private margin: number = 50;
    private width: number = 750 - this.margin * 2;
    private height: number = 400 - this.margin * 2;

    ngOnInit(): void {
        this.createSvg();
        this.drawPlot();
    }

    private createSvg(): void {
        this.svg = d3
            .select('figure#scatter')
            .append('svg')
            .attr('width', this.width + this.margin * 2)
            .attr('height', this.height + this.margin * 2)
            .append('g')
            .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
    }

    private drawPlot(): void {
        // Add X axis
        const x = d3.scaleLinear().domain([2009, 2017]).range([0, this.width]);
        this.svg
            .append('g')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3.axisBottom(x).tickFormat(d3.format('d')));

        // Add Y axis
        const y = d3.scaleLinear().domain([0, 200000]).range([this.height, 0]);
        this.svg.append('g').call(d3.axisLeft(y));

        // Add dots
        const dots = this.svg.append('g');
        dots.selectAll('dot')
            .data(this.data)
            .enter()
            .append('circle')
            .attr('cx', (d) => x(d.released))
            .attr('cy', (d) => y(d.stars))
            .attr('r', 7)
            .style('opacity', 0.5)
            .style('fill', '#69b3a2');

        // Add labels
        dots.selectAll('text')
            .data(this.data)
            .enter()
            .append('text')
            .text((d) => d.framework)
            .attr('x', (d) => x(d.released))
            .attr('y', (d) => y(d.stars));
    }
}
