import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs-compat';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor() {}

  private subscription: Subscription;
  ngOnInit() {
    // this.subscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });
    const customInterval = Observable.create((observer) => {
      let count = 0;

      setInterval(() => {
        observer.next(count);
        if (count > 3) {
          observer.error(new Error('Count is greater than 3'));
        } else if (count === 2) {
          observer.complete();
        }
        count++;
      }, 1000);
    });
    this.subscription = customInterval.subscribe(
      (data) => console.log(data),
      (error) => {
        console.log(error);
        alert(error);
      },
      () => console.log(`Completed`)
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
