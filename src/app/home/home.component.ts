import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { CommonService } from '../commons/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchControl = new FormControl("");
  isLoading: boolean = false;
  selectedImage: string;
  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      filter(searchText => searchText.length > 2),
    ).subscribe((value) => {
      this.isLoading = true;
      this.getImage(value);
    })

  }

  getImage(value) {
    this.commonService.getImageFromWord(value).subscribe((images) => {
      console.log("response", images);
      this.selectedImage = images[0]?.largeImageURL
      this.isLoading = false;
    })
  }

}
