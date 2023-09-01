import { Folding } from '../../folding/folding.entity';

export class CreateParachuteDto {
  constructor(
    type: string,
    series: string,
    userId: number,
    foldings?: Folding[],
    isReserve?: boolean,
  ) {
    this.type = type;
    this.series = series;
    this.foldings = foldings ? foldings : null;
    this.isReserve = typeof isReserve === 'boolean' ? isReserve : false;
    this.userId = userId;
  }
  type: string;
  series: string;
  foldings: Folding[];
  isReserve: boolean;
  userId: number;
}
