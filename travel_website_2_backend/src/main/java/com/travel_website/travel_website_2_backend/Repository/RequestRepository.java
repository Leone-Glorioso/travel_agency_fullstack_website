package com.travel_website.travel_website_2_backend.Repository;

import com.travel_website.travel_website_2_backend.Models.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<Request, Integer> {
    List<Request> findByLandlord(String landlord);

    List<Request> findByVerified(boolean verified);

    List<Request> findByVerifiedNot(boolean verified);

    List<Request> findByPending(boolean pending);

    List<Request> findByVerifiedAndPending(boolean verified, boolean pending);

    boolean existsByLandlord(String landlord);

    boolean existsByLandlordAndVerifiedAndPending(String landlord, boolean verified, boolean pending);

    boolean existsByLandlordAndPending(String landlord, boolean pending);
}
