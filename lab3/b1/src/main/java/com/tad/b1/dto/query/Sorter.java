
package com.tad.b1.dto.query;

import com.tad.b1.entity.enums.SortMode;
import com.tad.b1.entity.enums.WorkerParameter;
import lombok.Getter;

/**
 *
 * @author Dau Cong Tuan Anh
 */
@Getter
public class Sorter {
    private WorkerParameter param;
    private SortMode mode;
    
    public Sorter(WorkerParameter param, SortMode mode) {
        this.param = param;
        this.mode = mode;
    }
}
