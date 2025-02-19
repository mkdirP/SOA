
package com.tad.b1.utils;

import com.tad.b1.dto.Wrapper.GroupNameWrapper;
import com.tad.b1.dto.data.ChangeOrganizationRequest;
import com.tad.b1.dto.data.ChangeStatusRequest;
import com.tad.b1.entity.Worker;
import com.tad.b1.dto.Wrapper.WorkerListWrapper;
import com.tad.b1.dto.entityDto.WorkerDTO;
import jakarta.xml.bind.JAXBContext;
import jakarta.xml.bind.JAXBException;
import jakarta.xml.bind.Marshaller;
import jakarta.xml.bind.Unmarshaller;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Dau Cong Tuan Anh
 */
public class XmlService {
    public static String marshal(Worker x) {
        try {

            JAXBContext context = JAXBContext.newInstance(Worker.class);

            Marshaller mar= context.createMarshaller();

            mar.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);

            StringWriter sw = new StringWriter();

            mar.marshal(x, sw);

            return sw.toString();

        } catch (JAXBException ex) {

        }

        return null;
    }

    public static String marshalArray(GroupNameWrapper wrapper) {
        try{

            JAXBContext context = JAXBContext.newInstance(GroupNameWrapper.class);

            Marshaller marshaller = context.createMarshaller();

            marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);

            StringWriter sw = new StringWriter();

            marshaller.marshal(wrapper, sw);

            return sw.toString();

        } catch(JAXBException ex) {

        }

        return null;
    }

    public static String marshalArray(WorkerListWrapper wrapper) {
        try{

            JAXBContext context = JAXBContext.newInstance(WorkerListWrapper.class);

            Marshaller marshaller = context.createMarshaller();

            marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);

            StringWriter sw = new StringWriter();

            marshaller.marshal(wrapper, sw);

            return sw.toString();

        } catch(JAXBException ex) {

        }

        return null;
    }

    public static WorkerDTO unmarshal(String xmlStr) {
        try {
            System.out.println("String: " + xmlStr);
            JAXBContext context = JAXBContext.newInstance(WorkerDTO.class);

            Unmarshaller unmarshaller = context.createUnmarshaller();

            StringReader reader = new StringReader(xmlStr);
            System.out.println("Reader: " + reader);

            // Worker worker = (Worker)unmarshaller.unmarshal(reader);
            WorkerDTO worker = (WorkerDTO)unmarshaller.unmarshal(reader);
            System.out.println("After: " + worker.toString());

            return worker;

        } catch (JAXBException ex) {
            ex.printStackTrace();
        }

        return null;
    }

    public static String marshalWorkerDTO(WorkerDTO worker) {

        try {

            JAXBContext context = JAXBContext.newInstance(WorkerDTO.class);

            Marshaller marshaller = context.createMarshaller();

            marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);

            StringWriter sw = new StringWriter();

            marshaller.marshal(worker, sw);

            return sw.toString();

        } catch (JAXBException ex) {
        }
        return null;
    }

    public static ChangeStatusRequest unmarshalChangeStatusRequest(String str) {
        try {
            JAXBContext context = JAXBContext.newInstance(ChangeStatusRequest.class);

            Unmarshaller unmarshaller = context.createUnmarshaller();

            StringReader reader = new StringReader(str);
            ChangeStatusRequest changeStatusRequest = (ChangeStatusRequest)unmarshaller.unmarshal(reader);
            return changeStatusRequest;

        } catch (JAXBException ex) {
            ex.printStackTrace();
        }

        return null;
    }

    public static ChangeOrganizationRequest unmarshalChangeOrganizationRequest(String str) {
        try {
            JAXBContext context = JAXBContext.newInstance(ChangeOrganizationRequest.class);

            Unmarshaller unmarshaller = context.createUnmarshaller();

            StringReader reader = new StringReader(str);
            ChangeOrganizationRequest changeOrganizationRequest = (ChangeOrganizationRequest)unmarshaller.unmarshal(reader);
            return changeOrganizationRequest;

        } catch (JAXBException ex) {
            ex.printStackTrace();
        }

        return null;
    }
}