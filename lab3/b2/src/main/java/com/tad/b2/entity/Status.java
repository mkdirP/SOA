
package com.tad.b2.entity;

/**
 *
 * @author Dau Cong Tuan Anh
 */
public enum Status {
    FIRED, 
    HIRED, 
    RECOMMENDED_FOR_PROMOTION, 
    REGULAR, 
    PROBATION;
    
    public String value() {
        return name();
    }
    
    public static Status fromValue(String v) {
        return valueOf(v);
    }
}
