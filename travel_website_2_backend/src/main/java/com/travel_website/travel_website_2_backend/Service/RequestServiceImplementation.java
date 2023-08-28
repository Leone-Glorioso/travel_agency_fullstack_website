package com.travel_website.travel_website_2_backend.Service;

import com.travel_website.travel_website_2_backend.Models.Request;
import com.travel_website.travel_website_2_backend.Repository.RequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class RequestServiceImplementation implements RequestService{

    private final RequestRepository requestRepository;

    @Override
    public List<Request> returnAllRequests()
    {
        return requestRepository.findAll();
    }

    @Override
    public List<Request> returnAllAcceptedRequests()
    {
        return requestRepository.findByVerifiedAndPending(true, false);
    }

    @Override
    public List<Request> returnAllRejectedRequests()
    {
        return requestRepository.findByVerifiedAndPending(false, false);
    }

    @Override
    public List<Request> returnAllPendingRequests()
    {
        return requestRepository.findByPending(true);
    }

    @Override
    public Request saveRequest(Request request)
    {
        return requestRepository.save(request);
    }

    @Override
    public void deleteRequest(Request request)
    {
        requestRepository.delete(request);
        return;
    }
}
