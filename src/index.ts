import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { CouchdbService, CouchdbDoc, CouchdbListEntry, CouchdbViewEntry } from './couchdb.service';

export * from './couchdb.service';

@NgModule({
  imports: [
    CommonModule, HttpModule
  ],
  declarations: [
    CouchdbDoc,
    CouchdbListEntry,
    CouchdbViewEntry,
  ],
  exports: [
    CouchdbDoc,
    CouchdbListEntry,
    CouchdbViewEntry,
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
