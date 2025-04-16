package com.cimbai.summaryAi;

import com.cimbai.summaryAi.entity.UrlSummary;
import com.cimbai.summaryAi.jpa.UrlSummaryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/history")
public class FetchHistoryApi {

    @Autowired
    private UrlSummaryRepo repo;

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/fetch")
    public List<UrlSummary> fetchHistory() {

            return repo.findAll();

    }
}