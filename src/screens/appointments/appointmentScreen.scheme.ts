import { CustomSelectOption } from "~/components/inputs/selectInput/customSelectDropdown.scheme";

export interface AppointmentFormValues {
    client: CustomSelectOption | null;
    services: CustomSelectOption[];
}

export interface ServiceTime {
    hours: number;
    minutes: number;
}