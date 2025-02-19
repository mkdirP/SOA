
package com.tad.b1.entity.enums;

/**
 *
 * @author Dau Cong Tuan Anh
 */
public enum SortMode {
    ASC, DESC;
    
    public String value() {
        return name();
    }
    
    public static SortMode fromValue(String v) {
        return valueOf(v);
    }
    
}
