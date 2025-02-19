
package com.tad.b1.controller;

/**
 *
 * @author Dau Cong Tuan Anh
 */

import jakarta.xml.bind.annotation.adapters.XmlAdapter;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class ZonedDateTimeAdapter extends XmlAdapter<String, ZonedDateTime> {
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ISO_ZONED_DATE_TIME;

    @Override
    public ZonedDateTime unmarshal(String v) {
        return (v != null) ? ZonedDateTime.parse(v, FORMATTER) : null;
    }

    @Override
    public String marshal(ZonedDateTime v) {
        return (v != null) ? FORMATTER.format(v) : null;
    }
}
