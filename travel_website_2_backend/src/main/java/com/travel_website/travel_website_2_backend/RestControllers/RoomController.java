package com.travel_website.travel_website_2_backend.RestControllers;

import com.travel_website.travel_website_2_backend.DTO.*;
import com.travel_website.travel_website_2_backend.Mapper.LocationMapper;
import com.travel_website.travel_website_2_backend.Mapper.ReservationMapper;
import com.travel_website.travel_website_2_backend.Mapper.RoomMapper;
import com.travel_website.travel_website_2_backend.Misc.DateHelper;
import com.travel_website.travel_website_2_backend.Misc.Recommender;
import com.travel_website.travel_website_2_backend.Misc.Recommender_two;
import com.travel_website.travel_website_2_backend.Models.*;
import com.travel_website.travel_website_2_backend.Security.Data_UserDetails;
import com.travel_website.travel_website_2_backend.Service.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.data.relational.core.sql.In;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

import static com.travel_website.travel_website_2_backend.Configuration.Configuration_Swagger.BEARER_KEY_SECURITY_SCHEME;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/rooms")
public class RoomController {
    private final UserService userService;
    private final RoomService roomService;
    private final RoomMapper roomMapper;
    private final ReservationService reservationService;
    private final ReservationMapper reservationMapper;
    private final LocationService locationService;
    private final CalendarService calendarService;
    private final DateHelper dateHelper;
    private final RequestService requestService;
    private final Recommender recommender;
    private final RatingService ratingService;
    private final Recommender_two recommender_2;
//    private boolean[][] map1 = new ;

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/all")
    public List<RoomDTO> getRooms()
    {
        return roomService.getRooms().stream()
                .map(roomMapper::toRoomDTO)
                .collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public CreatedResponse createRoom(@AuthenticationPrincipal Data_UserDetails currentUser,
                           @Valid @RequestBody NewRoomRequest newRoomRequest)
    {
        requestService.validateLandlord(currentUser.getUsername());
        User landlord = userService.validateAndGetUserByUsername(currentUser.getUsername());
//        Location location = locationService.validateAndGetLocation(id);
        Room room = roomMapper.newRoom(newRoomRequest);
        room.setLandlord(landlord);
//        room.setLocation(location);
        roomService.validateRoomNameIsUnique(newRoomRequest.getName());
        locationService.saveLocation(room.getLocation());
        Room room1 = roomService.saveRoom(room);
        return new CreatedResponse("room", room1.getId());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping("/delete/{id}")
    public RoomDTO deleteRoom(@PathVariable int id)
    {
        Room room = roomService.validateAndGetRoom(id);
        roomService.deleteRoom(room);
        return roomMapper.toRoomDTO(room);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/search/id/{id}")
    public RoomDTO getRoom(@PathVariable int id)
    {
        return roomMapper.toRoomDTO(roomService.validateAndGetRoom(id));
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/search/name/{name}")
    public RoomDTO getRoomByName(@PathVariable String name)
    {
        return roomMapper.toRoomDTO(roomService.validateAndGetRoomWithName(name));
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/me")
    public List<RoomDTO> getMyRooms(@AuthenticationPrincipal Data_UserDetails currentUser)
    {
        requestService.validateLandlord(currentUser.getUsername());
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        userService.validateLandlord(user);
        return roomService.getRoomsByLandlord(user).stream().map(roomMapper::toRoomDTO).collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/landlord/{username}")
    public List<RoomDTO> getRoomsByLandlord(@PathVariable String username)
    {
        User user = userService.validateAndGetUserByUsername(username);
        userService.validateLandlord(user);
        return roomService.getRoomsByLandlord(user).stream().map(roomMapper::toRoomDTO).collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/me/{id}")
    public RoomDTO getMyRoom(@AuthenticationPrincipal Data_UserDetails currentUser, @PathVariable int id)
    {
        requestService.validateLandlord(currentUser.getUsername());
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        userService.validateLandlord(user);
        Room room = roomService.validateAndGetRoom(id);
        roomService.validateRoomLandlordConnection(user, room);
        return roomMapper.toRoomDTO(room);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/landlord/{username}/room/{id}")
    public RoomDTO getRoomByLandlord(@PathVariable String username, @PathVariable int id)
    {
        User user = userService.validateAndGetUserByUsername(username);
        userService.validateLandlord(user);
        Room room = roomService.validateAndGetRoom(id);
        roomService.validateRoomLandlordConnection(user, room);
        return roomMapper.toRoomDTO(room);
    }

    //TODO change location to something else (will not test today)
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/location/{latitude}/{longitude}")
    public List<RoomDTO> getRoomsInLocation(@PathVariable double latitude,
                                            @PathVariable double longitude)
    {
        Location location = locationService.validateAndGetLocationFromPosition(latitude, longitude);
        return roomService.getRoomsInLocation(location).stream().map(roomMapper::toRoomDTO).collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/room/{id}")
    public CreatedResponse createReservation(@AuthenticationPrincipal Data_UserDetails currentUser,
                                            @Valid @RequestBody CreateReservationRequest reservationRequest,
                                            @PathVariable @NotBlank int id)
    {
//        System.out.println(currentUser.getUsername());
//        System.out.println(id);
//        System.out.println(reservationRequest.toString());
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        userService.validateClient(user);
        Room room = roomService.validateAndGetRoom(id);
        Reservation reservation = reservationMapper.toReserve(reservationRequest);
        reservation.setBookedRoom(room);
        reservation.setClient(user);
        calendarService.validateFreeRoomOnPeriod(room.getId(), reservation.getStart(), reservation.getEnd());
        calendarService.bookDates(room.getId(), reservation.getStart(), reservation.getEnd());
        Reservation reservation1 = reservationService.saveReservation(reservation);
        return new CreatedResponse("reservation", reservation1.getId());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/search/{location_id}/{start_date}/{end_date}/{numOfPeople}")
    public List<RoomDTO> initialSearch(@PathVariable int location_id,
                                       @PathVariable String start_date,
                                       @PathVariable String end_date,
                                       @PathVariable int numOfPeople)
    {
        Location location = locationService.validateAndGetLocation(location_id);
        Set<Integer> roomNums = calendarService.roomsNotAvailableBetweenDates(dateHelper.stringToDate2(start_date), dateHelper.stringToDate2(end_date));
        Set<Integer> allRoomNums = roomService.getRooms().stream().map(Room::getId).collect(Collectors.toSet());
        Set<Integer> remainingRoomNums = allRoomNums.stream().filter(e-> !roomNums.contains(e)).collect(Collectors.toSet());
        List<Room> rooms = new ArrayList<>();
        for(int room : remainingRoomNums)
            rooms.add(roomService.validateAndGetRoom(room));
        Collection<Room> collection= roomService.getRoomsInLocation(location);
        collection.retainAll(roomService.getRoomsForAmountOfPeople(numOfPeople));
        collection.retainAll(rooms);
        return collection.stream().map(roomMapper::toRoomDTO).collect(Collectors.toList());
    }


    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @PostMapping("/search/auth")
    public List<RoomDTO> searchAuth(@RequestBody SearchRequest request, @AuthenticationPrincipal Data_UserDetails currentUser) {
        List<String> flags = Arrays.asList(request.getFlags().split(", "));
//        List<Room> rooms = roomService.getRooms();
        List<Room> rooms = applyRecommendations(currentUser.getUsername());
        System.out.println(rooms.stream().map(Room::getId));
        if (flags.contains("beds"))
            rooms.retainAll(roomService.getRoomsByNumOfBeds(request.getStart_numOfBeds(), request.getEnd_numOfBeds()));
        if (flags.contains("bedrooms"))
            rooms.retainAll(roomService.getRoomsByNumOfBedrooms(request.getStart_numOfBedrooms(), request.getEnd_numOfBedrooms()));
        if (flags.contains("baths"))
            rooms.retainAll(roomService.getRoomsByNumOfBaths(request.getStart_numOfBaths(), request.getEnd_numOfBaths()));
        if (flags.contains("area"))
            rooms.retainAll(roomService.getRoomsByAreaRange(request.getStart_area(), request.getEnd_area()));
        if (flags.contains("livingRoom"))
            rooms.retainAll(roomService.getIfLivingRoom(request.isLivingRoom()));
        if (flags.contains("smoking"))
            rooms.retainAll(roomService.getIfSmoking(request.isSmoking()));
        if (flags.contains("pets"))
            rooms.retainAll(roomService.getIfPets(request.isPets()));
        if (flags.contains("events"))
            rooms.retainAll(roomService.getIfEvents(request.isEvents()));
        if (flags.contains("internet"))
            rooms.retainAll(roomService.getIfInternet(request.isInternet()));
        if (flags.contains("cooling"))
            rooms.retainAll(roomService.getIfCooling(request.isCooling()));
        if (flags.contains("heating"))
            rooms.retainAll(roomService.getIfHeating(request.isHeating()));
        if (flags.contains("kitchen"))
            rooms.retainAll(roomService.getIfKitchen(request.isKitchen()));
        if (flags.contains("tv"))
            rooms.retainAll(roomService.getIfTV(request.isTv()));
        if (flags.contains("parking"))
            rooms.retainAll(roomService.getIfParking(request.isParking()));
        if (flags.contains("elevator"))
            rooms.retainAll(roomService.getIfElevator(request.isElevator()));
        if(flags.contains("location"))
            rooms.retainAll(roomService.getRoomsInLocalArea(request.getLatitude(), request.getLongitude(), request.getRange()));
        if(flags.contains("dates"))
        {
            Set<Integer> roomIds = calendarService.roomsAvailableBetweenDates(dateHelper.stringToDate(request.getStart()), dateHelper.stringToDate(request.getEnd()));
            List<Room> rooms1 = new ArrayList<>();
            for(int id : roomIds)
            {
                rooms1.add(roomService.validateAndGetRoom(id));
            }
            rooms.retainAll(rooms1);
        }
        if(flags.contains("typeofroom"))
            rooms.retainAll(roomService.getRoomsByTypes(request.getTypeofroom()));
        if(rooms.size() == 0)
        {
            return rooms.stream()
                    .map(roomMapper::toRoomDTO)
                    .collect(Collectors.toList());
        }
//        int start = (request.getFirst_element() > rooms.size()) ? 1 : request.getFirst_element();
//        int end = request.getLast_element();
//        if(end > rooms.size())
//            end = rooms.size();
//        List<Room> roomSublist = rooms.subList(start, end);
        return rooms.stream()
                .map(roomMapper::toRoomDTO)
                .collect(Collectors.toList());

    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @PostMapping("/search")
    public List<RoomDTO> searchNoAuth(@RequestBody SearchRequest request) {
        List<String> flags = Arrays.asList(request.getFlags().split(", "));
        List<Room> rooms = roomService.getRooms();
        System.out.println(rooms.stream().map(Room::getId));
        if (flags.contains("beds"))
            rooms.retainAll(roomService.getRoomsByNumOfBeds(request.getStart_numOfBeds(), request.getEnd_numOfBeds()));
        if (flags.contains("bedrooms"))
            rooms.retainAll(roomService.getRoomsByNumOfBedrooms(request.getStart_numOfBedrooms(), request.getEnd_numOfBedrooms()));
        if (flags.contains("baths"))
            rooms.retainAll(roomService.getRoomsByNumOfBaths(request.getStart_numOfBaths(), request.getEnd_numOfBaths()));
        if (flags.contains("area"))
            rooms.retainAll(roomService.getRoomsByAreaRange(request.getStart_area(), request.getEnd_area()));
        if (flags.contains("livingRoom"))
            rooms.retainAll(roomService.getIfLivingRoom(request.isLivingRoom()));
        if (flags.contains("smoking"))
            rooms.retainAll(roomService.getIfSmoking(request.isSmoking()));
        if (flags.contains("pets"))
            rooms.retainAll(roomService.getIfPets(request.isPets()));
        if (flags.contains("events"))
            rooms.retainAll(roomService.getIfEvents(request.isEvents()));
        if (flags.contains("internet"))
            rooms.retainAll(roomService.getIfInternet(request.isInternet()));
        if (flags.contains("cooling"))
            rooms.retainAll(roomService.getIfCooling(request.isCooling()));
        if (flags.contains("heating"))
            rooms.retainAll(roomService.getIfHeating(request.isHeating()));
        if (flags.contains("kitchen"))
            rooms.retainAll(roomService.getIfKitchen(request.isKitchen()));
        if (flags.contains("tv"))
            rooms.retainAll(roomService.getIfTV(request.isTv()));
        if (flags.contains("parking"))
            rooms.retainAll(roomService.getIfParking(request.isParking()));
        if (flags.contains("elevator"))
            rooms.retainAll(roomService.getIfElevator(request.isElevator()));
        if(flags.contains("location"))
            rooms.retainAll(roomService.getRoomsInLocalArea(request.getLatitude(), request.getLongitude(), request.getRange()));
        if(flags.contains("dates"))
        {
            Set<Integer> roomIds = calendarService.roomsAvailableBetweenDates(dateHelper.stringToDate(request.getStart()), dateHelper.stringToDate(request.getEnd()));
            List<Room> rooms1 = new ArrayList<>();
            for(int id : roomIds)
            {
                rooms1.add(roomService.validateAndGetRoom(id));
            }
            rooms.retainAll(rooms1);
        }
        if(flags.contains("typeofroom"))
            rooms.retainAll(roomService.getRoomsByTypes(request.getTypeofroom()));
        if(rooms.size() == 0)
        {
            return rooms.stream()
                    .map(roomMapper::toRoomDTO)
                    .collect(Collectors.toList());
        }
//        int start = (request.getFirst_element() > rooms.size()) ? 1 : request.getFirst_element();
//        int end = request.getLast_element();
//        if(end > rooms.size())
//            end = rooms.size();
//        List<Room> roomSublist = rooms.subList(start, end);
        return rooms.stream()
                .map(roomMapper::toRoomDTO)
                .collect(Collectors.toList());

    }

    public List<Room> applyRecommendations(String username)
    {
        List<User> usersAll = userService.getUsersByRole(UserCategories.LandlordClient);
        usersAll.addAll(userService.getUsersByRole(UserCategories.Client));
        int rows = usersAll.size();
        System.out.println(usersAll.stream().map(User::getId).collect(Collectors.toSet()));
        System.out.println(rows);
        List<Room> roomsAll = roomService.getRooms();
        int columns = roomsAll.size();
        System.out.println(columns);
        System.out.println(roomsAll.stream().map(Room::getId).collect(Collectors.toSet()));
        double[][] R = new double[rows][columns];
        Map<Integer, Room> roomMap = new HashMap<>();
        Map<Integer, User> userMap = new HashMap<>();
        for(int i = 0; i < rows; i++)
            userMap.put(i, usersAll.get(i));
        for(int i = 0; i < columns; i++)
            roomMap.put(i, roomsAll.get(i));
        for (int i = 0; i < rows; i++)
        {
            for (int j = 0; j < columns; j++)
            {
                if(!ratingService.IsByRoomAndUser(roomMap.get(j).getName(), userMap.get(i).getName()))
                    R[i][j] = ratingService.getRatingOfRoom(roomMap.get(j).getName())*(1/2);
                else
                    R[i][j] = ratingService.validateAndGetRatingByRoomAndUser(roomMap.get(j).getName(), userMap.get(i).getName()).getRating();
            }
        }

        for(int i = 0; i < R.length; i++) {
            for (int j = 0; j < R[i].length; j++) {
                System.out.print(R[i][j]);
            }
            System.out.println();
        }
        double[] listOfMatches = recommender_2.getUserRankingOfRooms(R, usersAll.indexOf(userService.validateAndGetUserByUsername(username)));
        //fix the interpretation
        System.out.print("\n\n");
        for(int i = 0; i < listOfMatches.length; i++) {
            System.out.print(listOfMatches[i]);
        }
        SortedMap<Double, Room> finalMap = new TreeMap<Double, Room>();
        for(int i = 0; i < listOfMatches.length; i++)
            finalMap.put(listOfMatches[i], roomsAll.get(i));
        for(int i = 0; i < finalMap.size(); i++) {
            System.out.print(finalMap.values().stream().map(Room::getId).collect(Collectors.toSet()));
        }
        List<Room> rooms_final = new ArrayList<>();
        for(Room room : finalMap.values())
            rooms_final.add(room);
        //It returns a reverse order
        List<Room> reverse_rooms = new ArrayList<>();
        for(int i = 0; i < rooms_final.size(); i++)
            reverse_rooms.add(rooms_final.get(rooms_final.size()-1-i));
        System.out.println(reverse_rooms.stream().map(Room::getId));
        return reverse_rooms;
    }
}
