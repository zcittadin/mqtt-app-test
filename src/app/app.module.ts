import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { IMqttMessage, MqttModule, IMqttServiceOptions } from 'ngx-mqtt';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

export const MQTT_CONFIG: IMqttServiceOptions = {
  hostname: 'test.mosquitto.org',
  port: 8081,
  protocol: "wss",
  path: '/mqtt'
};

//const MQTT_CONFIG: IMqttServiceOptions = { connectOnCreate: false };

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, MqttModule.forRoot(MQTT_CONFIG)],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
