export class Candidate {
    id: number;
    name: string;
    department: string;
    joining_date: string;
}

export class Department {
    name: string;
    count: number = 0;
}