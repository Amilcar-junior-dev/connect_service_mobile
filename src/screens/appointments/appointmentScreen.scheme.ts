import { CustomSelectOption } from "~/components/inputs/selectInput/customSelectDropdown.scheme";

export interface AppointmentFormValues {
    client: CustomSelectOption | null;
    services: CustomSelectOption[];
    date: string | null;
    time: string | null;
    reminder: CustomSelectOption | null;
    repeat: CustomSelectOption | null;
    notes?: string;
}

export interface ServiceTime {
    hours: number;
    minutes: number;
}