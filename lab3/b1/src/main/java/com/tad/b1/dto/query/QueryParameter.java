
package com.tad.b1.dto.query;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 *
 * @author Dau Cong Tuan Anh
 */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QueryParameter {
    private List<Sorter> sorters;
    private List<Filter> filters;
    private Integer pageSize;
    private Integer page;
    
}
