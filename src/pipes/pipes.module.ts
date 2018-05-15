import { NgModule } from '@angular/core';
import { AryPipe } from './ary/ary';
import { DurationPipe } from './duration/duration';
@NgModule({
	declarations: [AryPipe,
    DurationPipe],
	imports: [],
	exports: [AryPipe,
    DurationPipe]
})
export class PipesModule {}
