import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ChatsPageComponent } from './chats-page.component';

@NgModule({
  imports: [IonicModule, RouterModule.forChild([{ path: '', component: ChatsPageComponent }])],
  declarations: [ChatsPageComponent],
  exports: [ChatsPageComponent],
})
export class ChatsPageModule {}