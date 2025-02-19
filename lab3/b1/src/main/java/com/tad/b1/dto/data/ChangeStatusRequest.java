
package com.tad.b1.dto.data;

import com.tad.b1.entity.enums.Status;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author Dau Cong Tuan Anh
 */

@Getter
@Setter
@XmlRootElement(name = "ChangeStatusRequest")
public class ChangeStatusRequest {
    private long id;
    private Status status;

}
