
package com.tad.b1.entity.enums;

/**
 *
 * @author Dau Cong Tuan Anh
 */
public enum WorkerParameter {
    ID,
    NAME, 
    COORDINATES,
    X,
    Y,
    CREATION_DATE, 
    SALARY, 
    START_DATE, 
    END_DATE, 
    STATUS, 
    PERSON,
    WEIGHT,
    PASSPORT_ID,
    EYE_COLOR,
    HAIR_COLOR;
    
    public String value() {
        return name();
    }
    
    public static WorkerParameter fromValue(String v) {
        return valueOf(v);
    }
    
    public static WorkerParameter convert(String v) {
        switch(v) {
            case "id" :
                return WorkerParameter.ID;
            case "name":
                return WorkerParameter.NAME;
            case "creationDate":
                return WorkerParameter.CREATION_DATE;
            case "salary":
                return WorkerParameter.SALARY;
            case "startDate":
                return WorkerParameter.START_DATE;
            case "endDate":
                return WorkerParameter.END_DATE;
            case "status":
                return WorkerParameter.STATUS;
            default:
                return null;
        }
    }
    
    public static String toColumnName(WorkerParameter param) {
        switch(param) {
            case CREATION_DATE:
                return "creationdate";
            case START_DATE:
                return "startdate";
            case END_DATE:
                return "enddate";
            default:
                return param.value().toLowerCase();
        }
    }
}
