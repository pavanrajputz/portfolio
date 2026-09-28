package com.pavanrajputz.portfolio.exception;

public class DuplicateResource extends RuntimeException {
    public DuplicateResource(String message) {
        super(message);
    }
}
