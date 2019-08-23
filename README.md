# Open API Flow Type Generator

Generate Flow types from the Open API spec.

## Installation

```
yarn global add flow-swag
```

## Usage

```
flow-swag ./pet_store.yaml -p ./.prettierrc -o types.js
```

Outputs:

```js
// @flow
export type Category = {
  id: number,
  name: string,
}

export type Tag = {
  id: number,
  name: string,
}

export type Pet = {
  id: number,
  category: Category,
  name: string,
  photoUrls: string[],
  tags: Tag[],
  status: 'available' | 'pending' | 'sold',
}

// ...
```

## API

The source file can be YAML or JSON.

```
$ flow-swag -h

Usage: flow-swag [options] <source>

Options:
  -o, --output <file>                 output file (default: "types.js")
  -p, --prettierConfig <.prettierrc>  prettier configuration file
  -c, --camelizeKeys                  camelCase property names
  -h, --help                          output usage information
```