import { Component, OnInit } from '@angular/core';
import { mahasiswa } from '../_shared/models/Mahasiswa';
import { PelayanApiService } from '../_shared/services/pelayan-api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mahasiswa-list',
  templateUrl: './mahasiswa-list.component.html',
  styleUrls: ['./mahasiswa-list.component.css']
})

export class MahasiswaListComponent implements OnInit {
  public mahasiswa: mahasiswa = null;
  public user;

  constructor(private pelayanApi: PelayanApiService, public http: HttpClient) { }

  ngOnInit() {
    let result: any;
    this.pelayanApi.getAllMahasiswa().subscribe( res => {
      this.mahasiswa = res;
    }, 
    err => console.log(err));

    var tokenSekarang = localStorage.getItem('access_token');
    this.pelayanApi.verifikasi(tokenSekarang).subscribe(res => {
      console.log(res);
      this.user = res;
    },
      err => console.log(err));
  }

  addToFav(nim: string) {
    var tokenSekarang = localStorage.getItem('access_token');
    var formFavorite = {
      'type': 'mahasiswa',
      'id_kode_nim_isbn_favorited': nim,
      'token': tokenSekarang
    }
    return this.http.post(`https://umn-pti2019.herokuapp.com/api/add-favorites`, formFavorite).subscribe(res => console.log(res), err => console.log(err));

  }

}
