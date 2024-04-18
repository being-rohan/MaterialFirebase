import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostserviceService } from '../../services/postservice.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ipost } from '../../const/interface';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  postform!: FormGroup;
  postobj!: Ipost;
  iseditmode: boolean = false
  constructor(private _postser: PostserviceService,
    private _matdialogref: MatDialogRef<PostFormComponent>,
    @Inject(MAT_DIALOG_DATA) getdata: any




  ) {
    this.cretaeform()
    this.postobj = getdata
    if (getdata) {
      this.iseditmode = true
      this.postform.patchValue(getdata)
    }
  }

  ngOnInit(): void {

  }
  cretaeform() {
    this.postform = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      body: new FormControl(null, [Validators.required]),
      userId: new FormControl(null, [Validators.required])
    })
  }

  onpostadd() {
    if (this.postform.valid) {
      let post = { ... this.postform.value }
      this._postser.cretaepost(post)
        .subscribe(res => {
          this._postser.sendnext(post)
          console.log(post);
          this.postform.reset();
          this._matdialogref.close()

        })

    }
  }
  onupdate() {
    if (this.postform.valid) {
      let post = { ... this.postform.value, id: this.postobj.id }
      this._postser.onupdateser(post)
        .subscribe((res => {
          this.postobj = res
          console.log(res);
          this._matdialogref.close()

        }))
    }
  }
}
