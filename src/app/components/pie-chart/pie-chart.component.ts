import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
    private data = [
        { framework: 'Vue', stars: 166443, released: 2014 },
        { framework: 'React', stars: 150793, released: 2013 },
        { framework: 'Angular', stars: 62342, released: 2016 },
        { framework: 'Backbone', stars: 27647, released: 2010 },
        { framework: 'Ember', stars: 21471, released: 2011 },
    ];
    private svg: any;
    private margin = 50;
    private width = 750;
    private height = 600;
    // The radius of the pie chart is half the smallest side
    private radius: number = Math.min(this.width, this.height) / 2 - this.margin;
    private colors: any;

    ngOnInit(): void {
        this.createSvg();
        this.createColors();
        this.drawChart();
    }

    private createSvg(): void {
        this.svg = d3
            .select('figure#pie')
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .append('g')
            .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
    }

    private createColors(): void {
        this.colors = d3
            .scaleOrdinal()
            .domain(this.data.map((d) => d.stars.toString()))
            .range(['#c7d3ec', '#a5b8db', '#879cc4', '#677795', '#5a6782']);
    }

    private drawChart(): void {
        // Compute the position of each group on the pie:
        const pie = d3.pie<any>().value((d: any) => Number(d.stars));

        // Build the pie chart
        this.svg
            .selectAll('pieces')
            .data(pie(this.data))
            .enter()
            .append('path')
            .attr('d', d3.arc().innerRadius(0).outerRadius(this.radius))
            .attr('fill', (_d: any, i: number) => this.colors(i))
            .attr('stroke', '#121926')
            .style('stroke-width', '1px');

        // Add labels
        const labelLocation = d3.arc().innerRadius(100).outerRadius(this.radius);

        this.svg
            .selectAll('pieces')
            .data(pie(this.data))
            .enter()
            .append('text')
            .text((d) => d.data.framework)
            .attr('transform', (d) => 'translate(' + labelLocation.centroid(d) + ')')
            .style('text-anchor', 'middle')
            .style('font-size', 15);
    }
}