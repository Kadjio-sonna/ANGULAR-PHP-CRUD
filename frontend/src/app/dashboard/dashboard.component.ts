import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Policy } from '../policy';
declare var $: any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  policies:  Policy[];
  selectedPolicy:  Policy  = { id :  null , number:null, amount:  null};

  constructor(private apiService :ApiService) { }

  ngOnInit(): void {
    this.apiService.readPolicies().subscribe((policies: Policy[])=>{
      this.policies = policies;
      console.log(this.policies);
    })
  }

  refreshData() {
    this.apiService.readPolicies().subscribe((policies: Policy[])=>{
      this.policies = policies;
    })
  }

  // Methode Create and Update
  createOrUpdatePolicy(form){
    if(this.selectedPolicy && this.selectedPolicy.id){
      form.value.id = this.selectedPolicy.id;
      this.apiService.updatePolicy(form.value).subscribe((policy: Policy)=>{
        console.log("Policy updated" , policy);

        this.refreshData();
      });   
    }
    else{

      this.apiService.createPolicy(form.value).subscribe((policy: Policy)=>{
        console.log("Policy created, ", policy);

        this.refreshData();
      });
    }
  }

  selectPolicy(policy: Policy){
    this.selectedPolicy = policy;
    $("#exampleModal").modal("show")
  }

  // Methode Delete
  deletePolicy(id){
    this.apiService.deletePolicy(id).subscribe((policy: Policy)=>{
      console.log("Policy deleted, ", policy);

      this.refreshData();
    });
  }

}
