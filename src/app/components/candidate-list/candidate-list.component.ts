import { Candidate, Department } from './../../modal/candidate-info';
import { CandidateService } from './../../services/candidate.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {

  constructor(private candidateService: CandidateService,
    private router: Router) { }
  
  candidateList: any[];
  sortName: string;
  sortDate: string;
  candidateName: string;
  responseData: any[];
  selectedDepartment: string;
  departmentList: string[];
  departmentTable: Department;
  enableFilterDepartment: boolean = false;

  ngOnInit() {
    this.candidateService.getCandidateInfo().subscribe(res=>{
      this.responseData = res;
      this.candidateList = this.responseData;
      this.departmentList = this.candidateList.reduce((acc,el)=> { 
        return acc.includes(el.department) ? acc: [...acc,el.department];
      },[])
      this.sortName = 'normal';
      this.sortDate = 'normal';
    })
  }

  openDetails(candidate: Candidate) {
    this.router.navigate(['candidates-detail', candidate.id]);
  }

  sort(value: string) {
    if(value === 'name') {
      this.sortName = this.setSortOrder(this.sortName);
      this.sortDate = 'normal';
      let sortedArr = []
      if(this.sortName === 'sort-asc') {
        sortedArr = this.candidateList.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        sortedArr = this.candidateList.sort((a, b) => b.name.localeCompare(a.name));
      }
      this.candidateList = [...sortedArr];
      
    } else {
      this.sortDate = this.setSortOrder(this.sortDate);
      this.sortName = 'normal';
      let sortedArr = [];
      if(this.sortDate === 'sort-asc') {
        sortedArr = this.candidateList.sort((a, b) => {
          let dateA = (this.convertDate(a.joining_date));
          let dateB = (this.convertDate(b.joining_date));
          return +dateA - +dateB;
        });
     } else {
        sortedArr = this.candidateList.sort((a, b) => {
          let dateA = (this.convertDate(a.joining_date));
          let dateB = (this.convertDate(b.joining_date));
          return +dateB - +dateA;
        });
     }
      this.candidateList = [...sortedArr];
      
    }
  }

  setSortOrder(str) {
    if(str === 'normal') {
      return 'sort-asc';
    } else if(str === 'sort-asc') {
      return 'sort-desc';
    } else {
      return 'sort-asc';
    }
  }
  convertDate(dateStr: string) {
    let dateParts = dateStr.split("/");
    return new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]); 
  }
  search() {
    let searchedItem = [];
    this.candidateList = [...this.responseData];
    searchedItem =  this.candidateList.filter(o => o.name.toLowerCase().indexOf(this.candidateName.toLowerCase()) == 0);
    this.candidateList = [...searchedItem];
  }
  clear() {
    this.candidateName = '';
    this.candidateList = [...this.responseData];
  }

  filter() {
    let deptObj = new Department();
    this.candidateList.forEach(e=> {
      if(e.department === this.selectedDepartment) {
        deptObj.name = this.selectedDepartment;
        deptObj.count +=1;
      }
    })
    this.departmentTable = deptObj;
    
  }
  checkDepartMent() {
    this.enableFilterDepartment = !this.enableFilterDepartment;
  }
  removeDept(dept: string) {
    let filterDept = this.candidateList.filter(el=> el.department !== dept);
    this.candidateList = [...filterDept];
  }
  showAll() {
    this.candidateList = [...this.responseData];
  }
  getOlderCandidate() {
    let today = new Date();
    let filterDept = this.candidateList.filter(el=> { 
      let date = this.convertDate(el.joining_date);
      let diffTime = Math.abs(+today - +date);
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 365*2;
    });
    this.candidateList = [...filterDept];
  }
}
