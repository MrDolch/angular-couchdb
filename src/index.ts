import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { CouchdbService, CouchdbDoc, CouchdbListEntry } from './couchdb.service';

export * from './couchdb.service';

@NgModule({
  imports: [
    CommonModule, HttpModule
  ],
  declarations: [
    CouchdbDoc,
    CouchdbListEntry,
  ],
  exports: [
    CouchdbDoc,
    CouchdbListEntry,
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
