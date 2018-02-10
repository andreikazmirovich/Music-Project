import { Component } from '@angular/core';

import { SpinnerService } from './shared/components/spinner/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private spinner: SpinnerService) {}

}
