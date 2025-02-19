
package com.tad.b1.controller;

import com.tad.b1.dto.data.ChangeOrganizationRequest;
import com.tad.b1.dto.data.ChangeStatusRequest;
import com.tad.b1.dto.Wrapper.GroupNameWrapper;
import com.tad.b1.entity.Worker;
import com.tad.b1.dto.Wrapper.WorkerListWrapper;
import com.tad.b1.dto.data.ServiceResponse;
import com.tad.b1.dto.entityDto.WorkerDTO;
import com.tad.b1.dto.query.Filter;
import com.tad.b1.dto.query.QueryParameter;
import com.tad.b1.dto.query.Sorter;
import com.tad.b1.entity.enums.SortMode;
import com.tad.b1.entity.enums.WorkerParameter;
import com.tad.b1.entity.response.ServiceResponseStatus;
import com.tad.b1.service.WorkerService;
import com.tad.b1.utils.XmlService;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;
import java.util.List;

import static com.tad.b1.utils.XmlService.*;

/**
 *
 * @author Dau Cong Tuan Anh
 */
@Path("/workers")
@CrossOrigin(origins = "http://localhost:3000")
public class WorkerController {

    private WorkerService ws = new WorkerService();

    @GET
    @Path("/ping")
    public String ping() {
        return "pong";
    }

    @GET
    @Path("/")
    @Produces({ MediaType.APPLICATION_XML})
    @Consumes({MediaType.APPLICATION_XML})
    public Response getWorkers(@QueryParam("filter[id]") String id,
                               @QueryParam("filter[name]") String name,
                               @QueryParam("filter[creationDate]") String creationDate,
                               @QueryParam("filter[salary]") String salary,
                               @QueryParam("filter[startDate]") String startDate,
                               @QueryParam("filter[endDate]") String endDate,
                               @QueryParam("filter[status]") String status,
                               @QueryParam("sort") String sort,
                               @QueryParam("page") Integer page,
                               @QueryParam("pageSize") Integer pageSize) {
        QueryParameter queryParameter = new QueryParameter();
        System.out.println("Name: " + id);
        System.out.println("Sort: " + sort);
        System.out.println("Salary: " + salary);
        List<Filter> filterList = new ArrayList<>();
        if(id != null) filterList.add(new Filter(WorkerParameter.ID, id));
        if(name != null) filterList.add(new Filter(WorkerParameter.NAME, name));
        if(creationDate != null) filterList.add(new Filter(WorkerParameter.CREATION_DATE, creationDate));
        if(salary != null) filterList.add(new Filter(WorkerParameter.SALARY, salary));
        if(startDate != null) filterList.add(new Filter(WorkerParameter.START_DATE, startDate));
        if(endDate != null) filterList.add(new Filter(WorkerParameter.END_DATE, endDate));
        if(status != null) filterList.add(new Filter(WorkerParameter.STATUS, status));

        queryParameter.setFilters(filterList);

        if(sort != null) {
            queryParameter.setSorters(getSorterList(sort));
        }

        if(page != null) {
            queryParameter.setPage(page);
        }

        if(pageSize != null) {
            queryParameter.setPageSize(pageSize);
        }

        ServiceResponse resp = ws.getWorkers(queryParameter);

        if(resp.getStatus() != ServiceResponseStatus.SUCCESS)
            return Response.status(resp.getResponseCode()).build();

        WorkerListWrapper workers = (WorkerListWrapper)resp.getData();

        return Response.ok(XmlService.marshalArray(workers)).build();
    }

    @GET
    @Path("/{id}")
    @Produces({ MediaType.APPLICATION_XML})
    @Consumes({MediaType.APPLICATION_XML})
    public Response getWorkers(@PathParam("id")long id) {

        ServiceResponse resp = ws.getWorkerById(id);

        if(resp.getStatus() != ServiceResponseStatus.SUCCESS)
            return Response.status(resp.getResponseCode()).build();

        Worker worker = (Worker)resp.getData();
        System.out.println(worker.toString());

        return Response.ok(XmlService.marshal(worker)).build();
    }

    @PUT
    @Path("/{id}")
    @Produces({MediaType.APPLICATION_XML})
    @Consumes({MediaType.APPLICATION_XML})
    public Response updateWorker(
            @PathParam(value = "id") long id,
            String workerStr) {
        // WorkerDTO worker = Worker.toDTO(unmarshal(workerStr));
        WorkerDTO worker = unmarshal(workerStr);
        List<WorkerParameter> isValid = worker.handleValidate();

        if(!isValid.isEmpty()) {

            String message = "<message>" + "these parameter has invalid: " + isValid.toString() +"</message>";

            return Response.status(400).entity(message).build();
        }
        ServiceResponse resp = ws.updateWorker(id, worker);

        return Response.status(resp.getResponseCode()).build();
    }

    @DELETE
    @Path("/{id}")
    @Produces({ MediaType.APPLICATION_XML})
    @Consumes({MediaType.APPLICATION_XML})
    public Response deleteWorker(@PathParam("id")long id) {

        ServiceResponse resp = ws.deleteWorker(id);

        return Response.status(resp.getResponseCode()).build();
    }

    @POST
    @Path("/")
    @Produces({ MediaType.APPLICATION_XML})
    @Consumes({ MediaType.APPLICATION_XML})
    public Response addWorker(String workerStr) {
        System.out.println("\n=============================\n"+workerStr);
        // WorkerDTO worker = Worker.toDTO(unmarshal(workerStr));
        WorkerDTO worker = unmarshal(workerStr);

        System.out.println("\n-----------------------------\n"+worker.toString());
        List<WorkerParameter> isValid = worker.handleValidate();
        if(!isValid.isEmpty()) {
            String message = "<message>" + "these parameter has invalid: " + isValid.toString() +"</message>";
            return Response.status(400).entity(message).build();
        }

        ServiceResponse resp = ws.insertWorker(worker);

        if(resp.getStatus() != ServiceResponseStatus.SUCCESS)
            return Response.status(resp.getResponseCode()).build();

        Worker worker1 = (Worker)(resp.getData());
        System.out.println("\n-----------------------------\n"+worker1.toString());

        // return Response.ok(
        //         XmlService.marshal(
        //                 (Worker)(resp.getData())
        //         )).build();
        // return Response.ok(
        //         XmlService.marshal(
        //                 (Worker)(resp.getData())
        //         )).build();
        return Response.ok(
                XmlService.marshal(worker1) // 直接使用 worker
        ).build();
    }

    @GET
    @Path("low-salary/{salary}")
    @Produces({ MediaType.APPLICATION_XML})
    @Consumes({MediaType.APPLICATION_XML})
    public Response getLowSalary(@PathParam("salary")Integer salary,
                                 @QueryParam("filter[id]") String id,
                                 @QueryParam("filter[name]") String name,
                                 @QueryParam("filter[creationDate]") String creationDate,
                                 @QueryParam("filter[startDate]") String startDate,
                                 @QueryParam("filter[endDate]") String endDate,
                                 @QueryParam("filter[status]") String status,
                                 @QueryParam("sort") String sort,
                                 @QueryParam("page") Integer page,
                                 @QueryParam("pageSize") Integer pageSize) {

        if(salary == null) {

            String message = "<message> Salary is invalid! </message>";

            return Response.status(400).entity(message).build();
        }

        QueryParameter queryParameter = new QueryParameter();

        List<Filter> filterList = new ArrayList<>();
        if(id != null) filterList.add(new Filter(WorkerParameter.ID, id));
        if(name != null) filterList.add(new Filter(WorkerParameter.NAME, name));
        if(creationDate != null) filterList.add(new Filter(WorkerParameter.CREATION_DATE, creationDate));
        if(startDate != null) filterList.add(new Filter(WorkerParameter.START_DATE, startDate));
        if(endDate != null) filterList.add(new Filter(WorkerParameter.END_DATE, endDate));
        if(status != null) filterList.add(new Filter(WorkerParameter.STATUS, status));

        queryParameter.setFilters(filterList);

        if(sort != null) {
            queryParameter.setSorters(getSorterList(sort));
        }

        if(page != null) {
            queryParameter.setPage(page);
        }

        if(pageSize != null) {
            queryParameter.setPageSize(pageSize);
        }

        ServiceResponse resp = ws.getLowerSalaryWorker(salary, queryParameter);

        if(resp.getStatus() != ServiceResponseStatus.SUCCESS)
            return Response.status(resp.getResponseCode()).build();

        return Response.ok(XmlService.marshalArray(
                (WorkerListWrapper)(resp.getData())
        )).build();
    }

    @GET
    @Path("group-by-name")
    @Produces({ MediaType.APPLICATION_XML})
    @Consumes({MediaType.APPLICATION_XML})
    public Response groupByName( @QueryParam("filter[name]") String name,
                                 @QueryParam("filter[value]") Long value,
                                 @QueryParam("sort") String sort,
                                 @QueryParam("page") Long page,
                                 @QueryParam("pageSize") Long pageSize) {

        ServiceResponse resp = ws.groupByName(name, value, sort, page, pageSize);

        if(resp.getStatus() != ServiceResponseStatus.SUCCESS)
            return Response.status(resp.getResponseCode()).build();

        return Response.ok(
                XmlService.marshalArray(
                        (GroupNameWrapper)resp.getData()
                )
        ).build();
    }

    @GET
    @Path("avg-salary")
    @Produces({ MediaType.APPLICATION_XML})
    @Consumes({MediaType.APPLICATION_XML})
    public Response avgSalary() {
        ServiceResponse resp = ws.getAvgSalary();

        if(resp.getStatus() != ServiceResponseStatus.SUCCESS)
            return Response.status(resp.getResponseCode()).build();

        return Response.ok(
                "<avg-salary>"
                        + (Float)resp.getData()
                        + "</avg-salary>"
        ).build();
    }

    @PUT
    @Path("/status")
    @Produces({ MediaType.APPLICATION_XML})
    @Consumes({MediaType.APPLICATION_XML})
    public Response udpateStatus(@Context HttpHeaders headers,
                                 String str) {
        ChangeStatusRequest req = unmarshalChangeStatusRequest(str);
        System.out.println(headers.toString());

        ServiceResponse resp = ws.updateStatus(req.getId(), req.getStatus());

        return Response.status(resp.getResponseCode()).build();
    }

    @PUT
    @Path("org")
    @Produces({ MediaType.APPLICATION_XML})
    @Consumes({MediaType.APPLICATION_XML})
    public Response moveOrg(String xmlStr) {
        ChangeOrganizationRequest req = unmarshalChangeOrganizationRequest(xmlStr);
        ServiceResponse resp = ws.updateOrganization(req.getId(), req.getEmId());

        return Response.status(resp.getResponseCode()).build();
    }

    @GET
    @Path("check/{id}/{org_id}")
    public Response checkValidEmployee(@PathParam("id") Long id,
                                       @PathParam("org_id") Long org_id) {
        ServiceResponse resp = ws.isBelongToOrganization(id, org_id);

        return Response.status(resp.getResponseCode()).entity(resp.getData()).build();
    }

    public List<Sorter> getSorterList(String query) {
        List<Sorter> res = new ArrayList<>();
        SortMode sortMode;

        for(String param: query.split(",")) {
            sortMode = SortMode.ASC;
            if(param.charAt(0) == '-') {
                sortMode = SortMode.DESC;
                param = param.substring(1);
            }
            Sorter toAdd = new Sorter(WorkerParameter.convert(param), sortMode);
            if(toAdd != null) {
                res.add(toAdd);
            }
        }

        return res;
    }


}