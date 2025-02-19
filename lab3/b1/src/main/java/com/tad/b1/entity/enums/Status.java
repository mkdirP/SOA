
package com.tad.b1.entity.enums;

import jakarta.xml.bind.annotation.XmlEnum;
import jakarta.xml.bind.annotation.XmlType;

/**
 *
 * @author Dau Cong Tuan Anh
 */
@XmlType(name = "Status")
@XmlEnum
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
