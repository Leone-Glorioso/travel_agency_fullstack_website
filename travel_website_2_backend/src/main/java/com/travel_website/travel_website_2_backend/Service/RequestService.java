package com.travel_website.travel_website_2_backend.Service;

import com.travel_website.travel_website_2_backend.Models.Request;

import java.util.List;

public interface RequestService {
    List<Request> returnAllRequests();

    List<Request> returnAllAcceptedRequests();

    List<Request> returnAllRejectedRequests();

    List<Request> returnAllPendingRequests();

    Request saveRequest(Request request);

    void deleteRequest(Request request);
}
