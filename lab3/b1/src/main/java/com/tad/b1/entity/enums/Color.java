
package com.tad.b1.entity.enums;

import jakarta.xml.bind.annotation.XmlEnum;
import jakarta.xml.bind.annotation.XmlType;

/**
 *
 * @author Dau Cong Tuan Anh
 */
@XmlType(name = "Color")
@XmlEnum
public enum Color {
    GREEN, 
    RED, 
    BLACK, 
    BLUE, 
    YELLOW, 
    ORANGE, 
    WHITE, 
    BROWN;
    
    public String value() {
        return name();
    }
    
    public static Color fromValue(String v) {
        return valueOf(v);
    }
}
