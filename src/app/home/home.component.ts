import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs/operators';
import { CommonService } from '../commons/common.service';
import FastAverageColor from 'fast-average-color';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchControl = new FormControl("");
  isLoading: boolean = false;
  selectedImage: string;
  palette: any;
  fac = new FastAverageColor();
  colorList: Color[] = [];
  isNotFound: boolean = false;
  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(1000),
      filter(searchText => searchText.length > 2),
    ).subscribe((value) => {
      this.isLoading = true;
      this.getImage(value);
    });
  }

  getImage(value) {
    this.commonService.getImageFromWord(value).subscribe((images) => {
      this.selectedImage = images[0]?.largeImageURL
      this.colorList = [];
      this.isNotFound = false;
      this.isLoading = false;
      if (images.length > 0) {
        this.getColorOnSimpleAlgorithm();
        this.getColorOnSqrtAlgorithm();
        this.getColorOnDominantAlgorithm();
        this.isNotFound = false;
      }
      else {
        this.isNotFound = true;
      }
    })
  }

  getColorOnSimpleAlgorithm() {
    this.isLoading = true;
    this.fac.getColorAsync(this.selectedImage, { algorithm: 'simple' })
      .then(color => {
        this.colorList.push({ hex: color?.hex, size: "4em" });
        this.isLoading = false;
      })
      .catch(e => {
        console.log(e);
      });
  }

  getColorOnSqrtAlgorithm() {
    this.isLoading = true;
    this.fac.getColorAsync(this.selectedImage, { algorithm: 'sqrt' })
      .then(color => {
        this.colorList.push({ hex: color?.hex, size: "4.5em" });
        this.isLoading = false;
      })
      .catch(e => {
        console.log(e);
      });
  }

  getColorOnDominantAlgorithm() {
    this.isLoading = true;
    this.fac.getColorAsync(this.selectedImage, { algorithm: 'dominant' })
      .then(color => {
        this.colorList.push({ hex: color?.hex, size: "3.5em" });
        this.isLoading = false;
      })
      .catch(e => {
        console.log(e);
      });
  }

}

class Color {
  hex: string;
  size: string;
}
