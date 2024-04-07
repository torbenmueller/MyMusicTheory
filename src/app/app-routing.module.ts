import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { ImprintComponent } from './imprint/imprint.component';
import { SentenceFormComponent } from './sentence-form/sentence-form.component';
import { PeriodFormComponent } from './period-form/period-form.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', component: SentenceFormComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'period-form', component: PeriodFormComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
