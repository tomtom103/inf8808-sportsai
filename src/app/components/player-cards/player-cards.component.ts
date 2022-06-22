import { Component } from '@angular/core';
import {
    benzemaBack,
    benzemaFront,
    leaoBack,
    leaoFront,
    maneBack,
    maneFront,
    mbappeBack,
    mbappeFront,
    nkunkuBack,
    nkunkuFront,
    salahBack,
    salahFront,
} from '@app/interfaces/base64';

@Component({
    selector: 'app-player-cards',
    templateUrl: './player-cards.component.html',
    styleUrls: ['./player-cards.component.scss'],
})
export class PlayerCardsComponent {
    public mbappeFrt: any = mbappeFront;
    public mbappeBck: any = mbappeBack;
    public benzemaFrt: any = benzemaFront;
    public benzemaBck: any = benzemaBack;
    public nkunkuFrt: any = nkunkuFront;
    public nkunkuBck: any = nkunkuBack;
    public maneFrt: any = maneFront;
    public maneBck: any = maneBack;
    public salahFrt: any = salahFront;
    public salahBck: any = salahBack;
    public leaoFrt: any = leaoFront;
    public leaoBck: any = leaoBack;

    constructor() {}
}
