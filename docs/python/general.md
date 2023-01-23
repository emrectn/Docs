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