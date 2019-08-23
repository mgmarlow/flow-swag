# Open API Flow Type Generator

Generate Flow types from the Open API spec.

## Installation

```
yarn global add flow-swag
```

## Usage

```
flow-swag ./pet_store.yaml -c ./.prettierrc
```

Outputs:

```js
// @flow
export type Order = {
  id: number,
  petId: number,
  quantity: number,
  shipDate: string,
  status: 'placed' | 'approved' | 'delivered',
  complete: boolean,
}

export type Category = {
  id: number,
  name: string,
}

export type User = {
  id: number,
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phone: string,
  userStatus: number,
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

export type ApiResponse = {
  code: number,
  type: string,
  message: string,
}
```

## API

The source file can be YAML or JSON.

```
$ flow-swag -h

Usage: flow-swag [options] <source>

Options:
  -c, --config <.prettierrc>  prettier configuration file
  -h, --help                  output usage information
```