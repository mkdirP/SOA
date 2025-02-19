
package com.tad.b1.dto.data;

import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author Dau Cong Tuan Anh
 */

@Getter
@Setter
@XmlRootElement(name = "ChangeOrganizationRequest")
public class ChangeOrganizationRequest {
    private long id;
    private long emId;
}
