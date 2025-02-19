package com.tad.b1.entity;

import com.tad.b1.dto.entityDto.PersonDTO;
import com.tad.b1.entity.enums.Color;
import jakarta.persistence.*;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Getter;

import java.io.Serializable;

/**
 *
 * @author Dau Cong Tuan Anh
 */
@Entity
@Table(name = "person")
@Getter
@XmlRootElement(name = "Person")
public class Person implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private long id;
    
    @Column(name="weight")
    private Long weight;  
    
    @Column(name="passportId")
    private String passportId;    
    
    @Column(name="eyeColor")
    @Enumerated(EnumType.STRING)
    private Color eyeColor;
    
    @Column(name="hairColor")
    @Enumerated(EnumType.STRING)
    private Color hairColor;
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public void setWeight(Long weight) {
        this.weight = weight;
    }
    
    public void setPassportId(String passportId) {
        this.passportId = passportId;
    }
    
    public void setEyeColor(Color eyeColor) {
        this.eyeColor = eyeColor;
    }
    
    public void setHairColor(Color hairColor) {
        this.hairColor = hairColor;
    }
    
    public void update(
            long weight, 
            String passportId, 
            Color eyeColor, 
            Color hairColor) {
        this.weight = weight;
        this.passportId = passportId;
        this.eyeColor = eyeColor;
        this.hairColor = hairColor;
    }
    
    public Person(){}
    
    public Person(Long weight, 
            String passportId, 
            Color eyeColor, 
            Color hairColor) {
        this.weight = weight;
        this.passportId = passportId;
        this.eyeColor = eyeColor;
        this.hairColor = hairColor;
    }
    
    public Person(long id,
            long weight, 
            String passportId, 
            Color eyeColor, 
            Color hairColor) {
        this.id = id;
        this.weight = weight;
        this.passportId = passportId;
        this.eyeColor = eyeColor;
        this.hairColor = hairColor;
    }
    
    public static Person fromDTO(PersonDTO dto) {
        return new Person(
                dto.getWeight(),
                dto.getPassportID(), 
                dto.getEyeColor(), 
                dto.getHairColor());
    }
    
    @Override
    public String toString() {
        return "weight: " + this.getWeight() 
                + ", passport id: " + this.getPassportId() 
                + ", eye color: " + this.getEyeColor() 
                + ", hair color: " + this.getHairColor();
    }
    
}
