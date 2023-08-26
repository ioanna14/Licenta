import { User } from '../../user/user.entity';

export class CreateEventDto {
  constructor(
    title: string,
    image: string,
    date: Date,
    description: string,
    price: number,
    location: string,
    participants?: User[],
  ) {
    this.title = title ? title : null;
    this.image = image ? image : null;
    this.date = date ? date : null;
    this.description = description ? description : null;
    this.price = price ? price : null;
    this.location = location ? location : null;
    this.participants = participants ? participants : null;
  }

  title: string;
  image: string;
  date: Date;
  description: string;
  price: number;
  location: string;
  participants: User[];
}
