import { candidate_data } from './../mock-data/candidate-info';
import { Injectable } from "@angular/core";
import { of } from 'rxjs';

@Injectable()
export class CandidateService {
    getCandidateInfo() {
        return of(candidate_data);
    }
}