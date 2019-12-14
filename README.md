<h1 align="center">
  migrations-engine
  <a href="https://www.npmjs.org/package/migrations-engine"><img src="https://img.shields.io/npm/v/migrations-engine.svg?style=flat" alt="npm"></a>
  <a href="https://travis-ci.org/OrKoN/migrations-engine"><img src="https://travis-ci.org/OrKoN/migrations-engine.svg?branch=master" alt="travis"></a>
</h1>

Simple library to manage database migrations in-memory:

- migration must have a name
- migrations are applied in order, by name (using String.localeCompare to order)

```
npm i migrations-engine --save
```

```ts
import { up, down } from 'migrations-engine';

const all = [
  // these are all available migrations
  {
    name: 'A',
  },
  {
    name: 'B',
  },
];

const applied = [
  // these are all applied migrations so far
  {
    name: 'A',
  },
];

const migrationsToApply = up(applied, all); // [{ name: 'B' }]

// apply migrations
```

The storage and applying of migrations is up to you.
