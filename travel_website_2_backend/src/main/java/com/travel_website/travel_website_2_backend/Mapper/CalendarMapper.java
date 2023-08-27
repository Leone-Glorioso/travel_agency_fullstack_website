package com.travel_website.travel_website_2_backend.Mapper;

import com.travel_website.travel_website_2_backend.DTO.CalendarDTO;
import com.travel_website.travel_website_2_backend.DTO.CalendarEntryRequest;
import com.travel_website.travel_website_2_backend.Models.Calendar;

public interface CalendarMapper {
    Calendar newEntry(CalendarEntryRequest request);

    CalendarDTO toCalendarDto(Calendar calendar);
}
