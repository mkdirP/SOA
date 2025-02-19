
package com.tad.b1.dto.entityDto;

import jakarta.validation.constraints.NotNull;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author Dau Cong Tuan Anh
 */
@Data
@XmlRootElement(name = "CoordinateDTO")
@NoArgsConstructor
public class CoordinateDTO {
    @NotNull
    private Integer x; //Поле не может быть null
    private float y;
    
    public CoordinateDTO(Integer x, float y) {
        this.x = x;
        this.y = y;
    }
}
