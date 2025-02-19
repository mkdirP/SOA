
package com.tad.b1.service;

import com.tad.b1.dto.Wrapper.GroupNameWrapper;
import com.tad.b1.dto.data.ServiceResponse;
import com.tad.b1.dto.entityDto.GroupName;
import com.tad.b1.entity.Worker;
import com.tad.b1.dto.Wrapper.WorkerListWrapper;
import com.tad.b1.dto.query.Filter;
import com.tad.b1.dto.entityDto.WorkerDTO;
import com.tad.b1.dto.query.QueryParameter;
import com.tad.b1.dto.query.Sorter;
import com.tad.b1.entity.Coordinate;
import com.tad.b1.entity.Person;
import com.tad.b1.entity.enums.SortMode;
import com.tad.b1.entity.enums.Status;
import com.tad.b1.entity.enums.WorkerParameter;
import com.tad.b1.entity.response.ServiceResponseStatus;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.metamodel.EntityType;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 *
 * @author Dau Cong Tuan Anh
 */
@ApplicationScoped
public class WorkerService {

    EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("tad");
    EntityManager entityManager = entityManagerFactory.createEntityManager();

    public ServiceResponse insertWorker(WorkerDTO dto) {
        Worker worker = Worker.fromDTO(dto);
        try{
            Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
            for (EntityType<?> entity : entities) {
                System.out.println(entity.getName());
            }

            begin();
            entityManager.persist(
                    new Coordinate(
                            dto.getCoordinates().getX(),
                            dto.getCoordinates().getY()));

            entityManager.persist(
                    new Person(
                            dto.getPerson().getWeight(),
                            dto.getPerson().getPassportID(),
                            dto.getPerson().getEyeColor(),
                            dto.getPerson().getHairColor()));
            commit();
            //            close();
            begin();
            Coordinate newCoordinate = entityManager.createQuery("SELECT w FROM Coordinate w ORDER BY w.id DESC", Coordinate.class)
                    .setMaxResults(1)
                    .getSingleResult();
            Person newPerson = entityManager.createQuery("SELECT w FROM Person w ORDER BY w.id DESC", Person.class)
                    .setMaxResults(1)
                    .getSingleResult();
            commit();
            //            close();
            begin();
            worker.setCoordinate(newCoordinate);
            worker.setPerson(newPerson);
            entityManager.persist(worker);
            commit();
            begin();
            String query = "SELECT w FROM Worker w ORDER BY w.id DESC";
            Worker workerToReturn = (Worker)entityManager
                    .createQuery(query, Worker.class)
                    .setMaxResults(1)
                    .getSingleResult();
            commit();
            close();
            return new ServiceResponse(ServiceResponseStatus.SUCCESS,
                    workerToReturn);

        } catch(Exception e) {
            e.printStackTrace();
            return new ServiceResponse(ServiceResponseStatus.INTERNAL_ERROR);
        }
    }

    public ServiceResponse getWorkers() {
        try{
            ArrayList<Worker> res =  (ArrayList<Worker>)entityManager
                    .createNativeQuery("SELECT * FROM worker", Worker.class)
                    .getResultList();
            close();

            return new ServiceResponse(
                    ServiceResponseStatus.SUCCESS,
                    new WorkerListWrapper(res));

        } catch(Exception e) {
            return new ServiceResponse(ServiceResponseStatus.INTERNAL_ERROR);
        }
    }

    public ServiceResponse getWorkers(QueryParameter query) {
        String queryStr = "SELECT * FROM worker";

        if(query.getFilters() != null) {

            queryStr += " WHERE ";

            for(Filter filter : query.getFilters()) {

                queryStr += filter.getParam().value().toLowerCase()
                        + " = " + filter.getValue()
                        + " AND ";

            }

            queryStr = queryStr.substring(0, queryStr.length() - 5);
        }

        if(query.getSorters() != null) {

            queryStr += " ORDER BY";

            for(Sorter sorter : query.getSorters()) {

                queryStr += " "
                        + WorkerParameter.toColumnName( sorter.getParam())
                        + " "
                        + sorter.getMode().value()
                        + ",";
            }

            queryStr = queryStr.substring(0, queryStr.length() - 1);

        }

        if(query.getPageSize() != null) {
            queryStr += " LIMIT " +  query.getPageSize();
        }

        if(query.getPage() != null) {
            queryStr += " OFFSET " + query.getPage();
        }

        queryStr += ";";

        try{
            ArrayList<Worker> res =  (ArrayList<Worker>)entityManager
                    .createNativeQuery(queryStr, Worker.class)
                    .getResultList();
            close();
            return new ServiceResponse(
                    ServiceResponseStatus.SUCCESS,
                    new WorkerListWrapper(res));

        } catch(Exception e) {
            return new ServiceResponse(ServiceResponseStatus.INTERNAL_ERROR);
        }
    }

    public ServiceResponse getWorkerById(long id) {
        try{
            begin();

            Worker worker = (Worker)entityManager
                    .createQuery(
                            "SELECT a FROM Worker a WHERE a.id = ?1",
                            Worker.class
                    ).setParameter(1, id)
                    .getSingleResult();

            commit();
            close();
            if(worker == null)
                return new ServiceResponse(
                        ServiceResponseStatus.INVALID_PARAMETER);


            return new ServiceResponse(
                    ServiceResponseStatus.SUCCESS, worker);
        } catch (Exception e) {

            rollback();

            return new ServiceResponse(
                    ServiceResponseStatus.INTERNAL_ERROR);
        }
    }

    public ServiceResponse updateWorker(long id, WorkerDTO worker) {
        try{
            begin();
            Worker workerToUpdate = (Worker)entityManager
                    .find(Worker.class, id);

            if(workerToUpdate == null)
                return new ServiceResponse(ServiceResponseStatus.INVALID_PARAMETER);

            entityManager.persist(
                    new Coordinate(
                            worker.getCoordinates().getX(),
                            worker.getCoordinates().getY()));

            Coordinate newCoordinate = entityManager.createQuery("SELECT w FROM Coordinate w ORDER BY w.id DESC", Coordinate.class)
                    .setMaxResults(1)
                    .getSingleResult();
            entityManager.persist(
                    new Person(
                            worker.getPerson().getWeight(),
                            worker.getPerson().getPassportID(),
                            worker.getPerson().getEyeColor(),
                            worker.getPerson().getHairColor()));

            Person newPerson = entityManager.createQuery("SELECT w FROM Person w ORDER BY w.id DESC", Person.class)
                    .setMaxResults(1)
                    .getSingleResult();
            workerToUpdate.update(
                    worker.getName(),
                    newCoordinate,
                    worker.getCreationDate(),
                    worker.getSalary(),
                    worker.getStartDate(),
                    worker.getEndDate(),
                    worker.getStatus(),
                    newPerson);

            entityManager.merge(workerToUpdate);

            commit();
            close();

        } catch( Exception e) {
            e.printStackTrace();
            rollback();
            return new ServiceResponse(ServiceResponseStatus.INTERNAL_ERROR);
        }

        return new ServiceResponse(ServiceResponseStatus.SUCCESS, worker);
    }

    public ServiceResponse deleteWorker(long id ) {
        try{

            begin();

            Worker workerToDelete = (Worker)entityManager
                    .find(Worker.class, id);

            if(workerToDelete == null)
                return new ServiceResponse(ServiceResponseStatus.INVALID_PARAMETER);
            entityManager.remove(workerToDelete);

            commit();
            close();

        } catch( Exception e) {
            rollback();
            return new ServiceResponse(ServiceResponseStatus.INTERNAL_ERROR);
        }

        return new ServiceResponse(ServiceResponseStatus.SUCCESS);
    }

    public ServiceResponse getLowerSalaryWorker(int salary) {
        try{
            begin();

            ArrayList<Worker> listWorkers = (ArrayList<Worker>)entityManager
                    .createQuery("SELECT a FROM Worker a where a.salary < ?1")
                    .setParameter(1, salary)
                    .getResultList();

            commit();
            close();

            return new ServiceResponse(ServiceResponseStatus.SUCCESS,
                    new WorkerListWrapper(listWorkers));
        } catch( Exception e) {
            e.printStackTrace();
            return new ServiceResponse(ServiceResponseStatus.INTERNAL_ERROR);
        }
    }

    public ServiceResponse getLowerSalaryWorker(int salary,
                                                QueryParameter query) {
        String queryStr = "SELECT * FROM worker where salary < " + salary;

        if(query.getFilters() != null) {

            for(Filter filter : query.getFilters()) {

                queryStr += " AND "
                        + filter.getParam().value().toLowerCase()
                        + " = " + filter.getValue() ;

            }
        }

        if(query.getSorters() != null) {

            queryStr += " ORDER BY";

            for(Sorter sorter : query.getSorters()) {

                queryStr += " "
                        + WorkerParameter.toColumnName( sorter.getParam())
                        + " "
                        + sorter.getMode().value()
                        + ",";
            }

            queryStr = queryStr.substring(0, queryStr.length() - 1);

        }

        if(query.getPageSize() != null) {
            queryStr += " LIMIT " +  query.getPageSize();
        }

        if(query.getPage() != null) {
            queryStr += " OFFSET " + query.getPage();
        }

        queryStr += ";";

        try{
            begin();

            ArrayList<Worker> listWorkers = (ArrayList<Worker>)entityManager
                    .createNativeQuery(queryStr, Worker.class)
                    .getResultList();

            commit();
            close();

            return new ServiceResponse(ServiceResponseStatus.SUCCESS,
                    new WorkerListWrapper(listWorkers));
        } catch( Exception e) {
            e.printStackTrace();
            return new ServiceResponse(ServiceResponseStatus.INTERNAL_ERROR);
        }
    }

    public ServiceResponse groupByName() {
        try{
            begin();

            List<Object[]> listWorkers = entityManager
                    .createQuery(
                            "SELECT a.name, COUNT(a) FROM Worker a GROUP BY a.name ")
                    .getResultList();

            commit();
            close();

            List<GroupName> groupNames = listWorkers.stream()
                    .map(row -> new GroupName((String) row[0], ((Number) row[1]).longValue()))
                    .collect(Collectors.toList());

            return new ServiceResponse(ServiceResponseStatus.SUCCESS,
                    new GroupNameWrapper(groupNames));
        } catch( Exception e) {
            e.printStackTrace();
            return new ServiceResponse(ServiceResponseStatus.INTERNAL_ERROR);
        }

    }

    public ServiceResponse groupByName(String name, Long value, String sort, Long page, Long pageSize) {
        try{
            String queryStr = "select name, count(*) from worker group by name";

            if(name!= null || value != null) {
                queryStr += " having ";
                if(name != null) queryStr += "name = " + name;
                if(value != null)
                    queryStr +=
                            (name != null) ?
                                    ("and count(*) = " + value)
                                    : ("count(*) = " + value);
            }

            if(sort != null) {
                queryStr += " order by ";
                for(String sorter : sort.split(",")) {
                    if(sorter.charAt(0) == '-') {
                        queryStr += sorter.substring(1) + " DESC, ";
                    } else {
                        queryStr += sorter + " ASC, ";
                    }
                }
                queryStr = queryStr.substring(0, queryStr.length() - 2);
            }

            if( page != null) queryStr += " limit " + page;
            if(pageSize != null) queryStr += " offset " + pageSize;
            queryStr += ";";

            begin();

            List<Object[]> listWorkers = entityManager
                    .createNativeQuery(
                            queryStr)
                    .getResultList();

            commit();
            close();

            List<GroupName> groupNames = listWorkers.stream()
                    .map(row -> new GroupName((String) row[0], ((Number) row[1]).longValue()))
                    .collect(Collectors.toList());

            return new ServiceResponse(ServiceResponseStatus.SUCCESS,
                    new GroupNameWrapper(groupNames));
        } catch( Exception e) {
            e.printStackTrace();
            return new ServiceResponse(ServiceResponseStatus.INTERNAL_ERROR);
        }

    }

    public ServiceResponse getAvgSalary() {
        try{

            begin();

            BigDecimal avgSalary = (BigDecimal)entityManager
                    .createNativeQuery(
                            "SELECT AVG(a.salary) FROM Worker a")
                    .getSingleResult();

            commit();
            close();

            return new ServiceResponse(ServiceResponseStatus.SUCCESS,
                    avgSalary.floatValue());
        } catch( Exception e) {
            e.printStackTrace();
            return new ServiceResponse(ServiceResponseStatus.INTERNAL_ERROR);
        }
    }

    public ServiceResponse updateStatus(long id, Status status) {
        try{

            begin();

            Worker worker = (Worker)entityManager
                    .find(Worker.class, id);

            if(worker == null)
                return new ServiceResponse(ServiceResponseStatus.FAIL);

            worker.setStatus(status);

            entityManager.merge(worker);

            commit();
            close();

            return new ServiceResponse(ServiceResponseStatus.SUCCESS);
        } catch( Exception e) {
            return new ServiceResponse(ServiceResponseStatus.INTERNAL_ERROR);
        }
    }

    public ServiceResponse updateOrganization(long id, long orgId) {
        try{

            begin();

            Worker worker = (Worker)entityManager
                    .find(Worker.class, id);

            if(worker == null)
                return new ServiceResponse(ServiceResponseStatus.FAIL);

            worker.setOrganization(orgId);

            entityManager.merge(worker);

            commit();
            close();

            return new ServiceResponse(ServiceResponseStatus.SUCCESS);

        } catch( Exception e) {
            e.printStackTrace();
            return new ServiceResponse(ServiceResponseStatus.INTERNAL_ERROR);
        }
    }

    public ServiceResponse isBelongToOrganization(Long id, Long orgId) {
        try{

            begin();

            Worker worker = (Worker)entityManager
                    .find(Worker.class, id);

            if(worker == null)
                return new ServiceResponse(ServiceResponseStatus.INVALID_PARAMETER, "Worker is not found");

            commit();
            close();

            if(worker.getOrganization() == orgId)
                return new ServiceResponse(ServiceResponseStatus.SUCCESS);

            return new ServiceResponse(
                    ServiceResponseStatus.INVALID_PARAMETER,
                    "Worker is not working for organization with id" + orgId);

        } catch( Exception e) {
            e.printStackTrace();
            return new ServiceResponse(ServiceResponseStatus.INTERNAL_ERROR);
        }
    }


    public EntityManager getManager() {
        return this.entityManager;
    }

    public void begin() {
        entityManager.getTransaction().begin();
    }

    public void commit() {
        entityManager.getTransaction().commit();
    }

    public void rollback() {
        entityManager.getTransaction().rollback();
    }

    public void close () {
        entityManager.close();
        //        entityManagerFactory.close();
    }
    public ArrayList<Worker> filterArray(
            ArrayList<Worker> workers,
            List<Filter> filters) {
        for(Filter filter: filters) {
            switch(filter.getParam()) {
                case NAME :
                    workers = (ArrayList<Worker>)workers
                            .stream()
                            .filter(
                                    worker -> filter
                                            .getValue()
                                            .equals(worker.getName()))
                            .toList();
                    break;
                case CREATION_DATE:
                    workers = (ArrayList<Worker>)workers
                            .stream()
                            .filter(
                                    worker -> filter
                                            .getValue()
                                            .equals(worker.getCreationDate().toString()))
                            .toList();
                    break;
                case X :
                    workers = (ArrayList<Worker>)workers
                            .stream()
                            .filter(
                                    worker -> filter
                                            .getValue()
                                            .equals(worker.getCoordinate().getX().toString()))
                            .toList();
                    break;
                case Y:
                    workers = (ArrayList<Worker>)workers
                            .stream()
                            .filter(
                                    worker -> filter
                                            .getValue()
                                            .equals(Float.toString(worker.getCoordinate().getY())))
                            .toList();
                    break;
                case SALARY:
                    workers = (ArrayList<Worker>)workers
                            .stream()
                            .filter(
                                    worker -> filter
                                            .getValue()
                                            .equals(Integer.toString(worker.getSalary())))
                            .toList();
                    break;
                case START_DATE:
                    workers = (ArrayList<Worker>)workers
                            .stream()
                            .filter(
                                    worker -> filter
                                            .getValue()
                                            .equals(worker.getStartDate().toString()))
                            .toList();
                    break;
                case END_DATE:
                    workers = (ArrayList<Worker>)workers
                            .stream()
                            .filter(
                                    worker -> filter
                                            .getValue()
                                            .equals(worker.getEndDate().toString()))
                            .toList();
                    break;
                case STATUS:
                    workers = (ArrayList<Worker>)workers
                            .stream()
                            .filter(
                                    worker -> filter
                                            .getValue()
                                            .equals(worker.getStatus().name()))
                            .toList();
                    break;
                default:
                    break;

            }
        }

        return workers;
    }

    public ArrayList<Worker> sortArray( ArrayList<Worker> workers,
                                        WorkerParameter param,
                                        SortMode mode) {
        Comparator<Worker> comparator;
        switch (param) {
            case NAME:
                comparator = Comparator.comparing(Worker::getName);
                break;
            case CREATION_DATE:
                comparator = Comparator.comparing(Worker::getCreationDate);
                break;
            case SALARY:
                comparator = Comparator.comparing(Worker::getSalary);
                break;
            case START_DATE:
                comparator = Comparator.comparing(Worker::getStartDate);
                break;
            case END_DATE:
                comparator = Comparator.comparing(Worker::getEndDate);
                break;
            case STATUS:
                comparator = Comparator.comparing(Worker::getStatus);
                break;
            default:
                comparator = Comparator.comparing(Worker::getId);
                break;
        }

        if(mode != SortMode.ASC){
            comparator.reversed();
        }

        workers.sort(comparator);

        return workers;
    }

    public List<Worker> pagination(ArrayList<Worker> workers,
                                   int pageSize,
                                   int numOfPage) {
        return workers.subList(0, pageSize * numOfPage);
    }
}