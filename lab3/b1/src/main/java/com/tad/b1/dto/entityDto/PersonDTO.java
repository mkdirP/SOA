
package com.tad.b1.dto.entityDto;

import com.tad.b1.entity.enums.Color;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author Dau Cong Tuan Anh
 */
@Data
@XmlRootElement(name = "PersonDTO")
@NoArgsConstructor
public class PersonDTO {
    @NotNull
    @Positive
    private Long weight; //Поле может быть null, Значение поля должно быть больше 0
    
    @NotNull
    private String passportID; //Поле не может быть null
    
    @NotNull
    private Color eyeColor; //Поле не может быть null
    
    @NotNull
    private Color hairColor; //Поле не может быть null
    
    public PersonDTO(Long weight, 
                    String passportID, 
                    Color eyeColor, 
                    Color hairColor) {
        this.weight = weight;
        this.passportID = passportID;
        this.eyeColor = eyeColor;
        this.hairColor = hairColor;
    }
}
