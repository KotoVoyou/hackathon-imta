export interface UE {
    name: string;
    slots: string[];
    locations: string[];
    logo?: string;
}

export interface FullUE extends UE {
    teachers: string[],
    students: string[]
}