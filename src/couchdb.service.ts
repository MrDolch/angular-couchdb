import { Headers, Http } from '@angular/http';
import { Observable }    from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

export class CouchdbDoc {
  _id: string;
  _rev: string;
  class: string;
}

export class CouchdbListEntry {
  id: string;
  key: string;
  doc: CouchdbDoc;
}

export class CouchdbService<T extends CouchdbDoc> {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
      private http: Http, 
      private dbname: string){}

  getAll(): Promise<T[]> {
    return this.http
      .get(`/${this.dbname}/_all_docs?include_docs=true`)
      .toPromise()
      .then(res => (res.json().rows as CouchdbListEntry[]).map(r => r.doc ) as T[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  get(id: string): Promise<T> {
    return this.http
      .get(`/${this.dbname}/${id}`)
      .toPromise()
      .then(res => res.json() as T)
      .catch(this.handleError);
  }

  update(doc: T): Promise<T> {
    return this.http
      .put(`/${this.dbname}/${doc._id}`, JSON.stringify(doc), {headers: this.headers})
      .toPromise()
      .then(() => doc)
      .catch(this.handleError);
  }

  create(doc: T): Promise<T> {
    doc.class = doc.constructor.name;
    return this.http
      .post(`/${this.dbname}`, JSON.stringify(doc), {headers: this.headers})
      .toPromise()
      .then(res => {
        let r = res.json();
        doc._id  = r.id;
        doc._rev = r.rev;
        return doc;
      })
      .catch(this.handleError);
  }

  delete(id: string, rev: string): Promise<void> {
    return this.http
      .delete(`/${this.dbname}/${id}?rev=${rev}`, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
  
  search(field: string, term: string): Observable<T[]> {
    return this.http
      .get(`/${this.dbname}/_all_docs?include_docs=true`)
      .map(res => (res.json().rows as CouchdbListEntry[])
           .map(r => r.doc as T) 
           .filter(t => t[field].indexOf(term) !== -1) );
  }
}

