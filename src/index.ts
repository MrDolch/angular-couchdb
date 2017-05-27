import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { SampleComponent } from './sample.component';
import { SampleDirective } from './sample.directive';
import { SamplePipe } from './sample.pipe';
import { SampleService } from './sample.service';
import { CouchdbService, CouchdbDoc, CouchdbListEntry } from './couchdb.service';

export * from './sample.component';
export * from './sample.directive';
export * from './sample.pipe';
export * from './sample.service';
export * from './couchdb.service';

@NgModule({
  imports: [
    CommonModule, HttpModule
  ],
  declarations: [
    CouchdbDoc, CouchdbListEntry,
    SampleComponent,
    SampleDirective,
    SamplePipe
  ],
  exports: [
    CouchdbDoc, CouchdbListEntry,
    SampleComponent,
    SampleDirective,
    SamplePipe
  ]
})
export class SampleModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SampleModule,
      providers: [SampleService, CouchdbService]
    };
  }
}
