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

## String Replace
as

## CalcExecutionTime

```bash

from sys import getsizeof
import json
import timeit

j = '''{
    "first_name": "Mazlum",
    "last_name": "Ağar"
}'''

# Memory

class ClassWithSlots():
    __slots__ = ('first_name', 'last_name')

    def __init__(self, first_name, last_name):
        self.first_name = first_name
        self.last_name = last_name

class ClassWithoutSlots():
    def __init__(self, first_name, last_name):
        self.first_name = first_name
        self.last_name = last_name

def get_size(instance):
    size_dict = 0

    try:
        size_dict = getsizeof(instance.__dict__)
    except AttributeError:
        pass

    return size_dict + getsizeof(instance)


NUM_INSTANCES = 1000000
with_slots = [
    get_size(ClassWithSlots(**json.loads(j)))
    for _ in range(NUM_INSTANCES)
]

size_with_slots = sum(with_slots) / 1000000
print(f"The total size is {size_with_slots} MB")
# Output => The total size is 56.0 MB
without_slots = [
    get_size(ClassWithoutSlots(**json.loads(j)))
    for _ in range(NUM_INSTANCES)
]

size_without_slots = sum(without_slots) / 1000000
print(f"The total size is {size_without_slots} MB")
# Output => The total size is 168.0 MB

# Time

code_without_slots = '''
class ClassWithoutSlots():
    def __init__(self, first_name, last_name):
        self.first_name = first_name
        self.last_name = last_name

without_slots = ClassWithoutSlots("Mazlum", "Ağar")
without_slots.first_name
'''
print(timeit.timeit(stmt=code_without_slots, number=1))
# Output => 1.4775999999999331e-05

code_with_slots = '''
class ClassWithSlots():
    __slots__ = ('first_name', 'last_name')

    def __init__(self, first_name, last_name):
        self.first_name = first_name
        self.last_name = last_name
with_slots = ClassWithSlots("Mazlum", "Ağar")
with_slots.first_name
'''
print(timeit.timeit(stmt=code_with_slots, number=1))
# Output => 1.8593000000000776e-05

```

## JupyterNotebook
```bash
jupyter notebook --no-browser --ip='*' --NotebookApp.token='' --NotebookApp.password=''
```

## Context Manager

````python3
class ContextManager():
    def __init__(self):
        print('init method called')
         
    def __enter__(self):
        print('enter method called')
        return self
     
    def __exit__(self, exc_type, exc_value, exc_traceback):
        print('exit method called')

with ContextManager() as manager:
    print("asdas")

````

```python
init method called
enter method called
asdas
exit method called
```

Python Requests - How to use system ca-certificates (debian/ubuntu)?
https://stackoverflow.com/questions/42982143/python-requests-how-to-use-system-ca-certificates-debian-ubuntu
export REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt

#### Debug=True

```bash
    if __name__ == "__main__":
        uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
```


#### Dataclass
```python
from dataclasses import dataclass


class BaseUserState:
    def __init__(self, _id: int, code: str, value: str):
        self.id = _id
        self.code = code
        self.value = value

    def __repr__(self):
        return f"id={self.id} code={self.code} value={self.value}"


@dataclass
class UserStates:
    registered: BaseUserState = BaseUserState(_id=1, code="REGISTERED", value="Registered")
    not_registered: BaseUserState = BaseUserState(
        _id=2, code="NOT_REGISTERED", value="Not Registered"
    )
    register_in_progress: BaseUserState = BaseUserState(
        _id=3, code="REGISTRATION_IN_PROGRESS", value="Registration In Progress"
    )
    delete_in_progress: BaseUserState = BaseUserState(
        _id=4, code="DELETE_IN_PROGRESS", value="Delete In Progress"
    )
    update_in_progress: BaseUserState = BaseUserState(
        _id=5, code="UPDATE_IN_PROGRESS", value="Update In Progress"
    )

    def __iter__(self):
        for s in [
            self.registered,
            self.not_registered,
            self.register_in_progress,
            self.delete_in_progress,
            self.update_in_progress,
        ]:
            yield s

    def get_by_id(self, _id: int):
        for s in self:
            if s.id == _id:
                return s


user_states = UserStates()
```