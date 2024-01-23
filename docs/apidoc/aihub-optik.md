# Aihub Optik

## PreRequest
Before using this API, subscribe to the service and complete authentication. For details, see {AıHubDocumentationURL-Subscription/ } and {AıHubDocumentationURL-Authentication}


## Request

- HTTP Method: `PUT`
- Content Type: `application/json`
- URL: `http://example.com/users/{id}`

## Parameters

| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| ``name`` | String | false | The name of the user. |
| ``age`` | Number | false | The age of the user. |

## Request example

``` js
fetch('http://example.com/users/1', {
  method: 'PUT',
  body: JSON.stringify({
    name: 'John Doe',
    age: 27,
  }),
  headers: {
    'Content-type': 'application/json',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
```

## Response Parameters

| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| ``name`` | String | false | The name of the user. |
| ``Status`` | Number | false | 200 |


## Response example

``` JSON
{
  "id": 1,
  "name": "John Doe",
  "age": 27
}
```