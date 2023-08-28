package com.travel_website.travel_website_2_backend.Service;

import com.travel_website.travel_website_2_backend.Models.Calendar;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface CalendarService {

    Calendar validateAndGetEntry(int room, LocalDate date);

//    boolean isFreeOnDate(int room, LocalDate start, LocalDate end);

    Set<Integer> roomsNotAvailableBetweenDates(LocalDate start, LocalDate end);

    List<Calendar> allEntries();

    Calendar saveEntry(Calendar calendar);

    void deleteEntry(Calendar calendar);

    void validateBookingOfRoomOnDate(int room, LocalDate date);

    void validateFreeRoomOnPeriod(int room, LocalDate start, LocalDate end);

    List<Calendar> bookDates(int room, LocalDate start, LocalDate end);

}
