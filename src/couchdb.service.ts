import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Component } from '@angular/core';

@Component({
  selector: 'couchdb-doc',
  template: `<h1>{{class}}#{{_id}}</h1>`
})
export class CouchdbDocComponent {
  _id: string;
  _rev: string;
  class: string;
}

@Component({
  selector: 'couchdb-list-entry',
  template: `<h1>{{doc.class}}#{{id}}</h1>`
})
export class CouchdbListEntryComponent {
  id: string;
  key: string;
  doc: CouchdbDocComponent;
}

@Component({
  selector: 'couchdb-view-entry',
  template: `<h1>{{value.class}}#{{value._id}}</h1>`
})
export class CouchdbViewEntryComponent {
  value: CouchdbDocComponent;
}

const JSON_HEADERS = new Headers({ 'Content-Type': 'application/json' });

export class CouchdbService<T extends CouchdbDocComponent> {


  constructor(
    protected http: Http,
    protected dbName: string,
    protected viewName: string) { }

  /** @returns all stored objects of class T */
  getAll(): Promise<T[]> {
    return this.http
      .get(`/${this.dbName}/_all_docs?include_docs=true`)
      .toPromise()
      .then((res: Response) => (res.json().rows as CouchdbListEntryComponent[]).map(r => r.doc) as T[])
      .catch(this.handleError);
  }

  /** @returns  all stored objects of class T matching keys */
  getAllFor(...keys: string[]): Promise<T[]> {
    return this.http.get(this.getViewUrl(keys)).toPromise()
      .then((res: Response) => (res.json().rows as CouchdbViewEntryComponent[])
        .map(r => r.value) as T[])
      .catch(this.handleError);
  }

  /**
   * Handles Exception during requests to couchdb.
   * Override this method for your own handler.
   */
  protected handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    console.error('Error!\nMessage: ' + error.message);
    return Promise.reject(error.message || error);
  }

  get(id: string): Promise<T> {
    return this.http
      .get(`/${this.dbName}/${id}`)
      .toPromise()
      .then((res: Response) => res.json() as T)
      .catch(this.handleError);
  }

  update(doc: T): Promise<T> {
    return this.http
      .put(`/${this.dbName}/${doc._id}`
      , JSON.stringify(doc, (key, value) => (key === 'transient' ? undefined : value))
      , { headers: JSON_HEADERS }
      )
      .toPromise()
      .then((res: Response) => {
        let r = res.json();
        doc._id = r.id;
        doc._rev = r.rev;
        return doc;
      })
      .catch(this.handleError);
  }

  create(doc: T): Promise<T> {
    doc.class = doc.constructor.name;
    return this.http
      .post(`/${this.dbName}`, JSON.stringify(doc), { headers: JSON_HEADERS })
      .toPromise()
      .then((res: Response) => {
        let r = res.json();
        doc._id = r.id;
        doc._rev = r.rev;
        return doc;
      })
      .catch(this.handleError);
  }

  delete(id: string, rev: string): Promise<void> {
    return this.http
      .delete(`/${this.dbName}/${id}?rev=${rev}`, { headers: JSON_HEADERS })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  search(field: string, term: string): Observable<T[]> {
    return this.http
      .get(`/${this.dbName}/_all_docs?include_docs=true`)
      .map(res => (res.json().rows as CouchdbListEntryComponent[])
        .map(r => r.doc as T)
        .filter(t => t[field].indexOf(term) !== -1));
  }

  getViewUrl(keys: string[]) {
    console.log('RestParameter: ' + JSON.stringify(keys) + keys.length);
    let url = `/${this.dbName}/_design/couchapp/_view/${this.viewName}`;
    if (keys.length === 1 && keys[0].trim()) {
      url += `?key="${keys[0]}"`;
    } else if (keys.length > 1) {
      url += `?key="${JSON.stringify(keys)}"`;
    }
    console.log(url);
    return url;
  }

}

