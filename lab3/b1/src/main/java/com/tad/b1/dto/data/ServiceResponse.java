
package com.tad.b1.dto.data;

import com.tad.b1.entity.response.ServiceResponseStatus;
import lombok.Data;

/**
 *
 * @author Dau Cong Tuan Anh
 */

@Data
public class ServiceResponse {
    private ServiceResponseStatus status;
    private int responseCode;
    private Object data;
    
    public ServiceResponse(ServiceResponseStatus status,
                            int responseCode,
                            Object data) {
        this.status = status;
        this.responseCode = responseCode;
        this.data = data;
    }
    
    public ServiceResponse(ServiceResponseStatus status,
                            Object data) {
        this.status = status;
        this.responseCode = status.getCode();
        this.data = data;
    }
    
        public ServiceResponse(ServiceResponseStatus status) {
        this.status = status;
        this.responseCode = status.getCode();
    }
    

}
