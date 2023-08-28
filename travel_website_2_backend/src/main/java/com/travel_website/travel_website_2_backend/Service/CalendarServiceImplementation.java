package com.travel_website.travel_website_2_backend.Service;

import com.travel_website.travel_website_2_backend.Exception.Exception_CalendarEntryDoesNotExist;
import com.travel_website.travel_website_2_backend.Exception.Exception_RoomIsBookedOnPeriod;
import com.travel_website.travel_website_2_backend.Misc.DateHelper;
import com.travel_website.travel_website_2_backend.Models.Calendar;
import com.travel_website.travel_website_2_backend.Repository.CalendarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@RequiredArgsConstructor
@Service
public class CalendarServiceImplementation implements CalendarService{

    private final CalendarRepository calendarRepository;
    private final DateHelper dateHelper;

    @Override
    public Calendar validateAndGetEntry(int room, LocalDate date)
    {
        return calendarRepository.findByRoomAndDate(room, date)
                .orElseThrow(() -> new Exception_CalendarEntryDoesNotExist("Room with id " + room + " does not have a booking on date " + date.toString()));
    }

    @Override
    public Set<Integer> roomsNotAvailableBetweenDates(LocalDate start, LocalDate end)
    {
        List<Calendar> entries = calendarRepository.findByDateBetween(start, end);
        Set<Integer> rooms = new HashSet<>();
        for (Calendar entry: entries) {
            rooms.add(entry.getRoom());
        }
        return rooms;
    }

    @Override
    public List<Calendar> allEntries()
    {
        return calendarRepository.findAll();
    }

    @Override
    public Calendar saveEntry(Calendar calendar)
    {
        return calendarRepository.save(calendar);
    }

    @Override
    public void deleteEntry(Calendar calendar)
    {
        calendarRepository.delete(calendar);
        return;
    }

    @Override
    public void validateBookingOfRoomOnDate(int room, LocalDate date)
    {
        if(!calendarRepository.existsByRoomAndDate(room, date))
            throw new Exception_CalendarEntryDoesNotExist("Room with id " + room + " does not have a booking on date " + date.toString());
    }

    @Override
    public void validateFreeRoomOnPeriod(int room, LocalDate start, LocalDate end)
    {
        List<Calendar> entries = calendarRepository.findByDateBetween(start, end);
        Set<Integer> rooms = new HashSet<Integer>();
        for (Calendar entry: entries) {
            rooms.add(entry.getRoom());
        }
        if(rooms.contains(room))
            throw new Exception_RoomIsBookedOnPeriod("Room with id " + room + " is not free from " + start.toString() + " to " + end.toString());
    }

    @Override
    public List<Calendar> bookDates(int room, LocalDate start, LocalDate end)
    {
        List<Calendar> calendars = new ArrayList<>();
        List<LocalDate> dates = dateHelper.getTimeSpanInDatesFromDates(start, end).stream().toList();
        for (LocalDate date: dates)
            calendars.add(calendarRepository.save(new Calendar(room, date)));
        return calendars;
    }
}
