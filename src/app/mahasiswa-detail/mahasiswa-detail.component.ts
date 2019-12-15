import { Component, OnInit } from '@angular/core';
import { mahasiswa } from '../_shared/models/Mahasiswa';
import { PelayanApiService } from '../_shared/services/pelayan-api.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-mahasiswa-detail',
  templateUrl: './mahasiswa-detail.component.html',
  styleUrls: ['./mahasiswa-detail.component.css']
})
export class MahasiswaDetailComponent implements OnInit {
  public mahasiswa: mahasiswa = null;
  public buffer;
  public identitas;
  constructor(public pelayan: PelayanApiService, public router: ActivatedRoute ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.buffer = params.nim;
    })
    this.pelayan.getMahasiswaById(this.buffer).subscribe(res => this.identitas = res, err => console.log(err));
  }

}
