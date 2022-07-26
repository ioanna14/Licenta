import {Folding} from "../../folding/folding.entity";

export class CreateParachuteDto {
    type: string;
    foldings: Folding[];
    reserveParachuteId: string;
}