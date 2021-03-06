# couchdb-connector

## Installation

To install this library, run:

```bash
npm install couchdb-connector --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
npm install couchdb-connector
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { CouchdbModule } from 'couchdb-connector';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    CouchdbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

And add to systemjs.config.js:

```typescript
    packages: {
      'couchdb-connector': { main: 'index.js', defaultExtension: 'js' },
      traceur:{        main: 'traceur' }
    }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>
<sampleComponent></sampleComponent>
```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
npm run build
```

To lint all `*.ts` files:

```bash
npm run lint
```

## License

MIT © Mr. Dolch / dolch at nice-technologies.com
