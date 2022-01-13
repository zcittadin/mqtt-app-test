import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {

  private readonly onDestroy = new Subject<void>();

  private subscription: Subscription;
  public temp: string = "00,0";
  public humid: string = "00,0";
  public press: string = "00,0";

  constructor(private mqtt: MqttService) {
    this.subscription = this.mqtt.observe('my_topic/humid').subscribe((message: IMqttMessage) => {
      this.humid = message.payload.toString();
      console.log(this.humid);
    });
    this.subscription = this.mqtt.observe('my_topic/temp').subscribe((message: IMqttMessage) => {
      this.temp = message.payload.toString();
      console.log(this.temp);
    });
    this.subscription = this.mqtt.observe('my_topic/press').subscribe((message: IMqttMessage) => {
      this.press = message.payload.toString();
      console.log(this.press);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.onDestroy.next();
    this.onDestroy.complete();
  }

}
