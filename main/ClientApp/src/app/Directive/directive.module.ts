import { NgModule } from '@angular/core';
import { DropOpenDirective } from './DropOpenDirective';
import { BackButtonDirective } from './BackButtonDirective';
import { DisableControlDirective } from './disableControl';

@NgModule({
  declarations: [DropOpenDirective, BackButtonDirective,DisableControlDirective],
  exports: [DropOpenDirective, BackButtonDirective ,DisableControlDirective],
  imports: [],
})
export class DirectiveModule {}
