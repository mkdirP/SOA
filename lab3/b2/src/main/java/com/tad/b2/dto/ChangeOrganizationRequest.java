package com.tad.b2.dto;

import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@XmlRootElement(name = "ChangeOrganizationRequest")
@NoArgsConstructor
public class ChangeOrganizationRequest {
    private long id;
    private long emId;
    
    public ChangeOrganizationRequest(long id, long emId) {
        this.id = id;
        this.emId = emId;
    }
    
    @Override
    public String toString() {
        return "<ChangeOrganizationRequest>\n +     <id>" 
                + this.id 
                + "</id>\n  <emId>" 
                + this.emId 
                + "</emId>\n    </ChangeOrganizationRequest>";
    } 
}
