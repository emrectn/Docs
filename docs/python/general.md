# Python Genel

## Custom Exception

```bash

class Error(Exception):

    # Raised when an operation attempts a state
    # transition that's not allowed.
    def __init__(self, message, errors=None):
        # Error message thrown is saved in msg
        self.message = message
        self.errors = errors

    def __str__(self):
        return repr(self.message)


class ValueTooSmallError(Error):
    pass

```

## Fstring

Fixed digits after decimal with f-strings
````bash
f'{a:.2f}'

````