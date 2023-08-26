package com.travel_website.travel_website_2_backend.Misc;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collection;
import java.util.List;
import java.util.TreeSet;
import java.util.stream.Collectors;

public class DateHelper {

    public Collection<LocalDate> getTimeSpanInDatesFromDates(LocalDate start, LocalDate end)
    {
        return start.datesUntil(end).collect(Collectors.toCollection(TreeSet::new));
    }

    public List<String> getTimeSpanInStringsFromDates(LocalDate start, LocalDate end)
    {
        return start.datesUntil(end).map(LocalDate::toString).collect(Collectors.toList());
    }

    public Collection<LocalDate> getTimeSpanInDatesFromStrings(String start, String end)
    {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate startDate = LocalDate.parse(start, formatter);
        LocalDate endDate = LocalDate.parse(end, formatter);
        return startDate.datesUntil(endDate).collect(Collectors.toCollection(TreeSet::new));
    }


    public List<String> getTimeSpanInStringsFromStrings(String start, String end)
    {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate startDate = LocalDate.parse(start, formatter);
        LocalDate endDate = LocalDate.parse(end, formatter);
        return startDate.datesUntil(endDate).map(LocalDate::toString).collect(Collectors.toList());
    }

}
