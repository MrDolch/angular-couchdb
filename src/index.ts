import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { CouchdbService, CouchdbDocComponent, CouchdbListEntryComponent, CouchdbViewEntryComponent } from './couchdb.service';

export * from './couchdb.service';

@NgModule({
  imports: [
    CommonModule, HttpModule
  ],
  declarations: [
    CouchdbDocComponent,
    CouchdbListEntryComponent,
    CouchdbViewEntryComponent,
  ],
  exports: [
    CouchdbDocComponent,
    CouchdbListEntryComponent,
    CouchdbViewEntryComponent,
  ]
})

export class CouchdbModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CouchdbModule,
      providers: [ CouchdbService ]
    };
  }
}
