export interface TAF {
    name: string;
    locations: string[];
    logo?: string;
}

export interface UE extends TAF {
    slots: string[];
}

export interface Person {
    name: string,
    courses: FullUE[]
}

interface Participants {
    teachers: {name: string}[],
    students: {name: string}[]
}

export interface FullUE extends UE, Participants {}

export interface FullTAF extends TAF, Participants {}