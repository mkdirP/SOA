
package com.tad.b1.entity.response;

/**
 *
 * @author Dau Cong Tuan Anh
 */
public enum ServiceResponseStatus {
    SUCCESS(200), 
    INTERNAL_ERROR(500), 
    INVALID_PARAMETER(400), 
    METHOD_NOT_SUPPORTED(405), 
    FAIL(503);
    
    private int code;
    
    ServiceResponseStatus(int code) {
        this.code = code;
    }
    public int getCode() {
        return code;
    }
}
