import { Component, OnInit } from '@angular/core';
import { PostserviceService } from '../../services/postservice.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Ipost } from '../../const/interface';
import { PostFormComponent } from '../post-form/post-form.component';
import { DialogConfig } from '@angular/cdk/dialog';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {

  postarr!: Ipost[]
  constructor(private _posser: PostserviceService,
    private _matdialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._posser.fetchproducts()
      .subscribe((res => {
        this.postarr = res
        console.log(this.postarr);

      }))
      this._posser.postobjobj$
      .subscribe((res=>{
        this.postarr.push(res)
      }))
  }
  addpost() {
    let dilaogconfig = new MatDialogConfig()
    dilaogconfig.width = "800px"

    let matdialop = this._matdialog.open(PostFormComponent,dilaogconfig)
  }
}
