
package com.tad.b2.dto;

import com.tad.b2.entity.Status;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@XmlRootElement(name = "ChangeStatusRequest")
@NoArgsConstructor
public class ChangeStatusRequest {
    private long id;
    private Status status;
    
    public ChangeStatusRequest(long id, Status status) {
        this.id  =id;
        this.status = status;
    }
    
    @Override
    public String toString() {
        return "<ChangeStatusRequest>\n " + "<id>"
                + this.id
                + "</id>\n  <status>"
                + this.status.value()
                + "</status>\n</ChangeStatusRequest>";
    } 

}
