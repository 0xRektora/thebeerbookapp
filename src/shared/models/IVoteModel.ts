import { IBeerModel } from './IBeerModel';

export interface IBeerVoteModel {
    beerId: string;
    count: { beerId: number };
    beer: IBeerModel;
}
