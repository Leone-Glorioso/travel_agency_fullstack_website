package com.travel_website.travel_website_2_backend.Mapper;

import com.travel_website.travel_website_2_backend.DTO.CalendarDTO;
import com.travel_website.travel_website_2_backend.DTO.CalendarEntryRequest;
import com.travel_website.travel_website_2_backend.Models.Calendar;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class CalendarMapperImplementation implements CalendarMapper{
    @Override
    public Calendar newEntry(CalendarEntryRequest request)
    {
        if(request == null)
            return null;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        return new Calendar(request.getRoom(), LocalDate.parse(request.getDate(), formatter));
    }

    @Override
    public CalendarDTO toCalendarDto(Calendar calendar)
    {
        if(calendar == null)
            return null;
        return new CalendarDTO(calendar.getRoom(), calendar.getDate());
    }
}
