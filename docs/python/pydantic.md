## Pydantic

### Schema Example

```python

class RegisterUser(BaseModel):
    user_name: str
    base64_input: Union[str, List[str]]
    is_video: bool

    @validator("register_id")
    def validate_register_id(cls, register_id):
        try:
            validate_register_id(register_id=register_id)
            return register_id
        except Exception as e:
            error_message = "Error while register id check"
            raise SIMAException(response_code=-1, response_message=error_message)

    class Config:
        schema_extra = {
            "example": {
                "domain": "test-domain",
                "register_id": "1",
                "base64_input": "<base64 input>",
                "is_video": True,
            }
        }


```