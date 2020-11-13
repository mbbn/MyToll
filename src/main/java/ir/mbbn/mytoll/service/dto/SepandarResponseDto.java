package ir.mbbn.mytoll.service.dto;

import java.io.Serializable;

public class SepandarResponseDto<DataType> implements Serializable {

    private boolean success;
    private String message;
    private DataType result;
    private String errorCode;
    private String time;

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public DataType getResult() {
        return result;
    }

    public void setResult(DataType result) {
        this.result = result;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
