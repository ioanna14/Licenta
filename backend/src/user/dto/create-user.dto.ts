import { EmergencyContact } from '../../emergencyContact/emergencyContact.entity';
import { License } from '../../license/license.entity';
import { Parachute } from '../../parachute/parachute.entity';

export class CreateUserDto {
  constructor(
    email: string,
    password: string,
    name?: string,
    phone?: string,
    address?: string,
    birthDate?: Date,
    userType?: string,
    license?: License,
    emergencyContact?: EmergencyContact,
    parachute?: Parachute,
  ) {
    this.email = email;
    this.password = password;
    this.isActive = true;
    this.name = name ? name : null;
    this.phone = phone ? phone : null;
    this.address = address ? address : null;
    this.birthDate = birthDate ? birthDate : null;
    this.userType = userType ? userType : null;
    this.license = license ? license : null;
    this.emergencyContact = emergencyContact ? emergencyContact : null;
    this.parachute = parachute ? parachute : null;
  }

  name?: string;
  phone?: string;
  email: string;
  password: string;
  address?: string;
  birthDate?: Date;
  userType?: string;
  license?: License;
  emergencyContact?: EmergencyContact;
  parachute?: Parachute;
  isActive: boolean;
}
