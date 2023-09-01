export class CreateIncidentDto {
  type: string;
  description: string;
  dropzone: string;
  date: Date;
  image: string;
  userId: number;
}
