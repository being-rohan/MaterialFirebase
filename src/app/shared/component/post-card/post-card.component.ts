import { Component, Input, OnInit } from '@angular/core';
import { Ipost } from '../../const/interface';
import { PostserviceService } from '../../services/postservice.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PostFormComponent } from '../post-form/post-form.component';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() postobj!: Ipost
  constructor(
    private _matdialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onedit() {
    let dilaogconfig = new MatDialogConfig()
    dilaogconfig.width = "800px";
    dilaogconfig.data = this.postobj


    let matdialop = this._matdialog.open(PostFormComponent, dilaogconfig)
  }
}
