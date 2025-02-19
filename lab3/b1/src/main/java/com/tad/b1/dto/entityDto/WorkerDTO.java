
package com.tad.b1.dto.entityDto;

import com.tad.b1.controller.LocalDateAdapter;
import com.tad.b1.entity.enums.Status;
import com.tad.b1.entity.enums.WorkerParameter;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.xml.bind.annotation.XmlRootElement;
import jakarta.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Dau Cong Tuan Anh
 */

@Getter
@Setter
@XmlRootElement(name = "WorkerDTO")
public class WorkerDTO {
    
    @NotNull
    @Positive
    private Integer id; //Поле не может быть null, Значение поля должно быть больше 0, Значение этого поля должно быть уникальным, Значение этого поля должно генерироваться автоматически
    
    @NotNull
    @NotBlank
    private String name; //Поле не может быть null, Строка не может быть пустой
    
    @NotNull
    private CoordinateDTO coordinates; //Поле не может быть null
    
    @NotNull
    private ZonedDateTime creationDate; //Поле не может быть null, Значение этого поля должно генерироваться автоматически
    
    @Positive
    private int salary; //Значение поля должно быть больше 0
    
    @NotNull
    private LocalDate startDate; //Поле не может быть null
    
    @Nullable
    private LocalDate endDate; //Поле может быть null
    
    @NotNull
    private Status status; //Поле не может быть null
    
    @Nullable
    private PersonDTO person; //Поле может быть null
    
    public WorkerDTO() {
        this.creationDate = ZonedDateTime.now();
    }
    
    public WorkerDTO(Integer id, 
            String name, 
            CoordinateDTO coordinates, 
            int salary, 
            LocalDate startDate, 
            LocalDate endDate,
            Status status,
            PersonDTO person) {
        this.id = id;
        this.name = name;
        this.coordinates = coordinates;
        this.creationDate = ZonedDateTime.now();
        this.salary = salary;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.person = person;
    }
    

    
    public WorkerDTO(
            String name, 
            CoordinateDTO coordinates, 
            int salary, 
            LocalDate startDate, 
            LocalDate endDate,
            Status status,
            PersonDTO person) {
        this.name = name;
        this.coordinates = coordinates;
        this.creationDate = ZonedDateTime.now();
        this.salary = salary;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.person = person;
    }
    @XmlJavaTypeAdapter(LocalDateAdapter.class)
    public LocalDate getStartDate() {
        return this.startDate;
    }
    
    @XmlJavaTypeAdapter(LocalDateAdapter.class)
    public LocalDate getEndDate() {
        return this.endDate;
    }
    
    @Override
    public String toString() {
        return  "Name: "
                + this.name 
                + " X: " 
                + this.coordinates.getX() 
                + " Y: " 
                + this.coordinates.getY()
                + " creationDate: " 
                + this.creationDate
                + " salary: " 
                + this.salary
                + " startDate: "
                + this.startDate
                + " endDate: " 
                + this.endDate
                + " status: "
                + this.status
                + " Weight: "
                + this.person.getWeight()
                + " PassportID: "
                + this.person.getPassportID()
                + " EyeColor: "
                + this.person.getEyeColor()
                + " HairColor: "
                + this.person.getHairColor();
                
    }
    
    public List<WorkerParameter> handleValidate() {
        List<WorkerParameter> res = new ArrayList<>();
        
        if(id < 0 || id == null) res.add(WorkerParameter.ID);
        
        if(name == null || name.isBlank()) res.add(WorkerParameter.NAME);
        
        if(coordinates == null) res.add(WorkerParameter.COORDINATES);
        
        if(coordinates.getX() == null ) res.add(WorkerParameter.X);
        
        if(creationDate == null) res.add(WorkerParameter.CREATION_DATE);
        
        if( salary < 0) res.add(WorkerParameter.SALARY);
        
        if(startDate == null) res.add(WorkerParameter.START_DATE);
        
        if(status == null) res.add(WorkerParameter.STATUS);
        
        if(person.getWeight() != null && person.getWeight() <= 0) res.add(WorkerParameter.WEIGHT);
        
        if(person.getPassportID() == null) res.add(WorkerParameter.PASSPORT_ID);
        
        if(person.getEyeColor() == null) res.add(WorkerParameter.EYE_COLOR);
        
        if(person.getHairColor() == null) res.add(WorkerParameter.HAIR_COLOR);
        
        return res; 
    }
}
