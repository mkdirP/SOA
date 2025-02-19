
package com.tad.b1.dto.entityDto;

import jakarta.xml.bind.annotation.XmlRootElement;
import jakarta.xml.bind.annotation.XmlType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author Dau Cong Tuan Anh
 */

@XmlRootElement(name = "GroupName")
@XmlType(propOrder = { "name", "count" })
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroupName {
    String name;
    Long count;
    
}
