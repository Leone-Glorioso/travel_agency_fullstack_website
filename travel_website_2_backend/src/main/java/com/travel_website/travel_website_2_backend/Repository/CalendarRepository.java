package com.travel_website.travel_website_2_backend.Repository;

import com.travel_website.travel_website_2_backend.Models.Calendar;
import com.travel_website.travel_website_2_backend.Models.CalendarId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface CalendarRepository extends JpaRepository<Calendar, CalendarId> {

    boolean existsByDate(LocalDate date);

    boolean existsByRoom(int room);

    boolean existsByRoomAndDate(int room, LocalDate date);

    List<Calendar> findByDate(LocalDate date);

    List<Calendar> findByRoom(int room);

    Optional<Calendar> findByRoomAndDate(int room, LocalDate date);

    List<Calendar> findByDateBetween(LocalDate date1, LocalDate date2);

    List<Calendar> findByDateNotIn(Collection<LocalDate> dates);
}
