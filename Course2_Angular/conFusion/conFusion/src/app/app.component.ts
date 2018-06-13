import { Component } from '@angular/core';

// component decorator, takes a javascript
// object as parameters
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works';
}
