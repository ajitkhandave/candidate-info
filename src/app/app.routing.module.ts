import { CandidateDetailComponent } from './components/candidate-detail/candidate-detail.component';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';

export const Routes = [
    { path: '', redirectTo:'candidates', pathMatch: 'full' },
    {    
        path: 'candidates',
        component: CandidateListComponent,
    },
    {
        path: 'candidates-detail/:id',
        component: CandidateDetailComponent
    }
];

