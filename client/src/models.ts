export interface TAF {
    name: string;
    locations: string[];
    logo?: string;
}

export interface UE extends TAF {
    slots: string[];
}

export interface FullUE extends UE {
    teachers: {name: string}[],
    students: {name: string}[]
}