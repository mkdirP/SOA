
package com.tad.b1.dto.Wrapper;

import com.tad.b1.entity.Worker;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlElementWrapper;
import jakarta.xml.bind.annotation.XmlRootElement;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Dau Cong Tuan Anh
 */
@XmlRootElement
public class WorkerListWrapper {
    
    private List<Worker> workers;
    
    public WorkerListWrapper(){
        this.workers = new ArrayList<>();
    }
    
    public WorkerListWrapper(List<Worker> workers) {
        this.workers = workers;
    }
    
    public void setWorkers(List<Worker> workers) {
        this.workers = workers;
    }
    @XmlElementWrapper(name = "Workers")
    @XmlElement(name = "Worker")
    public List<Worker> getWorkers() {
        return this.workers;
    }
}
