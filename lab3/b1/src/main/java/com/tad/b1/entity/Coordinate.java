package com.tad.b1.entity;

import com.tad.b1.dto.entityDto.CoordinateDTO;
import jakarta.persistence.*;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Data;

import java.io.Serializable;

/**
 *
 * @author Dau Cong Tuan Anh
 */

@Data
@Entity
@Table(name = "coordinate")
@XmlRootElement(name = "Coordinate")
public class Coordinate implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private long id;
    
    @Column(name="x")
    private Integer x;
    
    @Column(name="y")
    private float y;
    
    @XmlElement(name = "id")
    public void setId(long id) {
        this.id = id;
    }
    
    @XmlElement(name = "x")
    public void setX(Integer x) {
        this.x = x;
    }
    
    @XmlElement(name = "y")
    public void setY(float y) {
        this.y = y;
    }
    
    public void update(Integer x, float y) {
        this.x = x;
        this.y = y;
    }
    
    public Coordinate() {
        
    }
    
    public Coordinate(Integer x, float y) {
        this.x = x;
        this.y = y;
    }
    
    public Coordinate(long id, Integer x, float y) {
        this.id = id;
        this.x = x;
        this.y = y;
    }
    
    public static Coordinate fromDto(CoordinateDTO dto) {
        return new Coordinate(dto.getX(), dto.getY());
    }
}
