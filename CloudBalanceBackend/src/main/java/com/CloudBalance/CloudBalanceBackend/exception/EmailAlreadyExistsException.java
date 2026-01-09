package com.CloudBalance.CloudBalanceBackend.exception;

public class EmailAlreadyExistsException extends  RuntimeException{
    public EmailAlreadyExistsException(String message){
        super(message);
    }
}
