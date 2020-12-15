import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { CandidateDetailComponent } from './components/candidate-detail/candidate-detail.component';
import { Routes } from './app.routing.module';
import { CandidateService } from './services/candidate.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CandidateListComponent,
    CandidateDetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Routes),
    FormsModule
  ],
  providers: [CandidateService],
  bootstrap: [AppComponent],
  exports:[RouterModule]
})
export class AppModule { }
