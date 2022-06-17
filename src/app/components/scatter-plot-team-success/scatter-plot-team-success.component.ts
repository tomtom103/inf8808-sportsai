import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import d3Legend from 'd3-svg-legend';
import d3Tip from 'd3-tip';

@Component({
    selector: 'app-scatter-plot-team-success',
    templateUrl: './scatter-plot-team-success.component.html',
    styleUrls: ['./scatter-plot-team-success.component.scss'],
})
export class ScatterPlotTeamSuccessComponent implements OnInit {
    private data = [
        { player: 'Sadio Mané', plusMinus: 52, PPM: 2.35, onG: 76, onGA: 24 },
        { player: 'Karim Benzema', plusMinus: 41, PPM: 2.44, onG: 64, onGA: 23 },
        { player: 'Rafael Leao', plusMinus: 34, PPM: 2.32, onG: 54, onGA: 20 },
        { player: 'Mohamed Salah', plusMinus: 55, PPM: 2.37, onG: 77, onGA: 22 },
        { player: 'Kylian Mbappé', plusMinus: 56, PPM: 2.34, onG: 86, onGA: 30 },
        { player: 'Christopher Nkunku', plusMinus: 31, PPM: 1.71, onG: 65, onGA: 34 },
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
            .select('figure#teamsuccess')
            .append('svg')
            .attr('width', this.width + this.margin * 2)
            .attr('height', this.height + this.margin * 2)
            .append('g')
            .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
    }

    private drawPlot(): void {
        //set up tip
        let tip = d3Tip()
            .attr('class', 'd3-tip')
            .html((d) => {
                return this.getTipContent(d);
            });
        this.svg.call(tip);

        // Add X axis
        const x = d3.scaleLinear().domain([30, 60]).range([0, this.width]);
        this.svg
            .append('g')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3.axisBottom(x).tickFormat(d3.format('d')));

        // Add Y axis
        const y = d3.scaleLinear().domain([1.5, 2.5]).range([this.height, 0]);
        this.svg.append('g').call(d3.axisLeft(y));
        console.log(this.data.map((d) => d.player));
        // Add color scale
        const color = d3
            .scaleOrdinal()
            .domain(this.data.map((d) => d.player))
            .range(d3.schemeCategory10);

        // Add dots
        const dots = this.svg.append('g');
        dots.selectAll('dot')
            .data(this.data)
            .enter()
            .append('circle')
            .attr('cx', (d) => x(d.plusMinus))
            .attr('cy', (d) => y(d.PPM))
            .attr('r', 5)
            .style('opacity', 0.5)
            .style('fill', (d) => color(d.player))
            .on('mouseover', function (_event, d) {
                let e = dots
                    .selectAll('circle')
                    .filter(function (_, i, nodes) {
                        return d3.select(nodes[i]).datum() === d;
                    })
                    .style('opacity', 1);
                tip.show(d, e.node());
            })
            .on('mouseout', (_event, d) => {
                let e = dots
                    .selectAll('circle')
                    .filter(function (_, i, nodes) {
                        return d3.select(nodes[i]).datum() === d;
                    })
                    .style('opacity', 0.5);
                tip.hide(d, e.node());
            });

        this.svg.append('text').text('PPM (point per matches)').attr('class', 'y axis-text').attr('transform', 'rotate(-90)').attr('font-size', 12);

        this.svg.append('text').text('+/-').attr('class', 'x axis-text').attr('font-size', 12);

        this.svg.selectAll('.x.axis-text').attr('transform', `translate(${this.width / 2}, ${this.height + 40})`);

        this.svg.selectAll('.y.axis-text').attr('transform', `translate(-40, ${this.height / 2 + 65}) rotate(-90)`);

        let legend = d3Legend.legendColor().shape('path', d3.symbol().type(d3.symbolCircle).size(300)()).scale(color);

        this.svg.append('g').attr('class', 'legend').attr('transform', `translate(${this.width}, -20)`).call(legend);
    }

    private getTipContent(d): string {
        return `
      <span> onG : <span class="tooltip-value">${d.onG}</span></span>
      <br>
      <span> onGa : <span class="tooltip-value">${d.onGA}</span></span>
    `;
    }
}
