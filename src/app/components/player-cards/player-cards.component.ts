import { Component } from '@angular/core';
import { benzemaBack, benzemaFront, mbappeBack, mbappeFront, nkunkuBack, nkunkuFront } from '@app/interfaces/base64';

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

    constructor() {}
}
