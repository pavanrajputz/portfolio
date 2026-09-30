package com.pavanrajputz.portfolio.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log =
            LoggerFactory.getLogger(GlobalExceptionHandler.class);


    @ExceptionHandler(ResourceNotFound.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(
            ResourceNotFound ex
    ){

        log.warn("Resource not found: {}", ex.getMessage());

        ErrorResponse response = ErrorResponse
                .builder()
                .success(false)
                .message(ex.getMessage())
                .timestamp(LocalDateTime.now())
                .build();

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }

    @ExceptionHandler(DuplicateResource.class)
    public ResponseEntity<ErrorResponse> handleDuplicateResource(
            DuplicateResource ex
    ) {
        log.warn("Duplicate resource: {}", ex.getMessage());

        ErrorResponse response = ErrorResponse
                .builder()
                .success(false)
                .message(ex.getMessage())
                .timestamp(LocalDateTime.now())
                .build();

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(
            MethodArgumentNotValidException ex
    ){
        String message = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(
                        error ->
                                error.getField()+": "+error.getDefaultMessage()
                )
                .collect(Collectors.joining(", "));

        log.warn("Validation failed: {}", message);

        ErrorResponse response = ErrorResponse
                .builder()
                .success(false)
                .message(message)
                .timestamp(LocalDateTime.now())
                .build();

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(response);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(
            Exception ex
    ){

        log.warn("Illegal argument: {}", ex.getMessage());

        ErrorResponse response = ErrorResponse
                .builder()
                .success(false)
                .message(ex.getMessage())
                .timestamp(LocalDateTime.now())
                .build();

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneralException(
            Exception ex
    ){

        log.error("Unexpected application error", ex);

        ErrorResponse response = ErrorResponse
                .builder()
                .success(false)
                .message("An unexpected error occurred")
                .timestamp(LocalDateTime.now())
                .build();

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(response);
    }
}
