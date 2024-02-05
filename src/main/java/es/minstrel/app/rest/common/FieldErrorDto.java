package es.minstrel.app.rest.common;

public class FieldErrorDto {

    private String fieldName;

    private String message;

    public FieldErrorDto(String fieldName, String message) {

        setFieldName(fieldName);
        setMessage(message);

    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
