import { CandidateService } from './../../services/candidate.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.css']
})
export class CandidateDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private candidateService: CandidateService) { }
  
    candidateInfo: any;
  ngOnInit() {
    this.activatedRoute.params.subscribe(param=> {
      this.candidateService.getCandidateInfo().subscribe(res=>{
        this.candidateInfo = res.filter(e=> e.id == param.id);
      })
    })
  }

}
