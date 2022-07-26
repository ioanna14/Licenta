import {EmergencyContact} from "../../emergencyContact/emergencyContact.entity";
import {License} from "../../license/license.entity";
import {Parachute} from "../../parachute/parachute.entity";

export class CreateUserDto {
    name: string;
    phone: string;
    email: string;
    password: string;
    address: string;
    birthDate: Date;
    userType: string;
    license: License;
    emergencyContact: EmergencyContact;
    parachute: Parachute;
    isActive: boolean;
}