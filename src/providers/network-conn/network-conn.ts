import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { ToastController } from 'ionic-angular'; 
import { Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

@Injectable()
export class NetworkConnProvider {

  connected: Subscription;
  disconnected: Subscription;

  constructor(public network: Network, public toast: ToastController) {
  }

  displayNetworkUpdate(connectionState: string){  
  let networkType = this.network.type;
  this.toast.create({
    message: `You are now ${connectionState} via ${networkType}`,
    duration: 3000
  }).present();
  }


  // display network presence
  networkConnect(){

  	this.connected = this.network.onConnect().subscribe(data => {
    console.log(data)
    this.displayNetworkUpdate(data.type);
    }, error => console.error(error));

  this.disconnected = this.network.onDisconnect().subscribe(data => {
    console.log(data)
    this.displayNetworkUpdate(data.type);
  }, error => console.error(error));

  }


  // on leave connection
  networkDisconnect(){

  this.connected.unsubscribe();
  this.disconnected.unsubscribe();

  }


  

  }

  
