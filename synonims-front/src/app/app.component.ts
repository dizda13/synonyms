import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'synonyms-front';

  openGithub() {
    window.open("https://github.com/dizda13/synonyms");
  }
}