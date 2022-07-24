import {EmergencyContact} from "../../emergencyContact/emergencyContact.entity";

export class CreateUserDto {
    name: string;
    phone: string;
    email: string;
    password: string;
    address: string;
    birthDate: Date;
    userType: string;
    licenseId: number;
    emergencyContact: EmergencyContact;
    isActive: boolean;
}