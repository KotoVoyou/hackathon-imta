export interface TAF {
    name: string;
    locations: string[];
    logo?: string;
}

export interface UE extends TAF {
    slots: string[];
}

interface Participants {
    teachers: {name: string}[],
    students: {name: string}[]
}

export interface FullUE extends UE, Participants {}

export interface FullTAF extends TAF, Participants {}