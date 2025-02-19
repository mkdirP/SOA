
package com.tad.b1.dto.Wrapper;

import com.tad.b1.dto.entityDto.GroupName;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlElementWrapper;
import jakarta.xml.bind.annotation.XmlRootElement;

import java.util.List;

/**
 *
 * @author Dau Cong Tuan Anh
 */
@XmlRootElement
public class GroupNameWrapper {
    
    private List<GroupName> GroupNames;
    
    public GroupNameWrapper(){
        
    }
    
    public GroupNameWrapper(List<GroupName> GroupNames){
        this.GroupNames = GroupNames;
    }
    
    public void setGroupNames(List<GroupName> GroupNames) {
        this.GroupNames = GroupNames;
    }
    
    @XmlElement(name = "GroupName")
    @XmlElementWrapper(name = "GroupNameList")
    public List<GroupName> getGroupName() {
        return this.GroupNames;
    }
    
}
