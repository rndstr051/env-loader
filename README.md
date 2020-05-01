# Env-Loader

## Description

This is a loader to use environment variables from the build pc in Angular websites.

## Usage

### Install the loader

```shell
npm install https://github.com/rndstr051/env-loader.git
```

### Create a *.d.ts file

example-env.d.ts
```typescript
declare module "env-loader!*" {
  export module env {
    const PATH:string;
    const LANG:string;
  }
}
```

### Import the file

example-app.component.ts
```typescript
import { env } from 'env-loader!./example-env.d.ts';
```

### Use the environments variables

example-app.component.ts
```typescript
console.log(env.PATH);
console.log(env.LANG);
```

## Supported Types
* string
* number
* boolean


## Limitations
* If multiple env files are needed, the path has to be passed to `declare module`.
It is relative to the outer file.

* The regular expression used to parse the module is very simple.
Thus, comments etc. are not supported.