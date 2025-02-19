
package com.tad.b1.entity;

import com.tad.b1.controller.LocalDateAdapter;
import com.tad.b1.controller.ZonedDateTimeAdapter;
import com.tad.b1.dto.entityDto.CoordinateDTO;
import com.tad.b1.dto.entityDto.PersonDTO;
import com.tad.b1.dto.entityDto.WorkerDTO;
import com.tad.b1.entity.enums.Status;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import jakarta.xml.bind.annotation.XmlType;
import java.io.Serializable;
import java.sql.Date;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import jakarta.persistence.*;
import jakarta.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import lombok.Data;

/**
 *
 * @author Dau Cong Tuan Anh
 */
@Entity
@Table(name = "worker")
@Data
@XmlRootElement(name = "Worker")
public class Worker implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private long id;

    @Column(name="name")
    private String name;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="coordinate_id",referencedColumnName = "id" )
    private Coordinate coordinate;

    @Column(name = "creationDate")
    private ZonedDateTime creationDate;

    @Column(name="salary")
    private int salary;

    @Column(name="startDate")
    private LocalDate startDate;

    @Column(name="endDate")
    private LocalDate endDate;

    @Column(name="status")
    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name = "organization_id")
    private long organization;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="person_id",referencedColumnName = "id" )
    private Person person;

    public void update(
            String name,
            Coordinate coordinate,
            ZonedDateTime creationDate,
            int salary,
            LocalDate startDate,
            LocalDate endDate,
            Status status,
            Person person ) {
        this.name = name;
        this.coordinate.update(coordinate.getX(), coordinate.getY());
        this.creationDate = creationDate;
        this.salary = salary;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.person.update(
                person.getWeight(),
                person.getPassportId(),
                person.getEyeColor(),
                person.getHairColor());
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCoordinate(Coordinate coor) {
        this.coordinate  = coor;
    }

    public void setCreationDate(ZonedDateTime date) {
        this.creationDate = date;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }

    public void setStartDate(LocalDate date) {
        this.startDate = date;
    }

    public void setEndDate(LocalDate date) {
        this.endDate = date;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Worker(){}

    public Worker(
            String name,
            Coordinate coordinate,
            ZonedDateTime creationDate,
            int salary,
            LocalDate startDate,
            LocalDate endDate,
            Status status,
            Person person ) {
        this.name = name;
        this.coordinate = new Coordinate(coordinate.getX(), coordinate.getY());
        this.creationDate = creationDate;
        this.salary = salary;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.person = new Person(
                person.getWeight(),
                person.getPassportId(),
                person.getEyeColor(),
                person.getHairColor());
    }

    public Worker(
            long id,
            String name,
            Coordinate coordinate,
            ZonedDateTime creationDate,
            int salary,
            LocalDate startDate,
            LocalDate endDate,
            Status status,
            Person person ) {
        this.id = id;
        this.name = name;
        this.coordinate = new Coordinate(coordinate.getX(), coordinate.getY());
        this.creationDate = creationDate;
        this.salary = salary;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.person = new Person(
                person.getWeight(),
                person.getPassportId(),
                person.getEyeColor(),
                person.getHairColor());
    }

    public static Worker fromDTO(WorkerDTO dto) {
        return new Worker(dto.getName(),
                new Coordinate(
                        dto.getCoordinates().getX(),
                        dto.getCoordinates().getY()),
                dto.getCreationDate(),
                dto.getSalary(),
                dto.getStartDate(),
                dto.getEndDate(),
                dto.getStatus(),
                new Person(
                        dto.getPerson().getWeight(),
                        dto.getPerson().getPassportID(),
                        dto.getPerson().getEyeColor(),
                        dto.getPerson().getHairColor()));


    }

    public static WorkerDTO toDTO(Worker worker) {
        return new WorkerDTO(
                (int) worker.getId(),
                worker.getName(),
                new CoordinateDTO(
                        worker.getCoordinate().getX(),
                        worker.getCoordinate().getY()),
                worker.getSalary(),
                worker.getStartDate(),
                worker.getEndDate(),
                worker.getStatus(),
                new PersonDTO(
                        worker.getPerson().getWeight(),
                        worker.getPerson().getPassportId(),
                        worker.getPerson().getEyeColor(),
                        worker.getPerson().getHairColor()));
    }

    @XmlJavaTypeAdapter(LocalDateAdapter.class)
    public LocalDate getStartDate() {
        return this.startDate;
    }

    @XmlJavaTypeAdapter(LocalDateAdapter.class)
    public LocalDate getEndDate() {
        return this.endDate;
    }

    @XmlJavaTypeAdapter(ZonedDateTimeAdapter.class)
    public ZonedDateTime getCreationDate() {
        return this.creationDate;
    }


}