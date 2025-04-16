package com.cimbai.summaryAi;


import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import com.cimbai.summaryAi.entity.UrlSummary;
import com.cimbai.summaryAi.jpa.UrlSummaryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/postUrlSummary")
public class PostURlSummaryApi {

    @Autowired
    private UrlSummaryRepo repo;
    UrlSummary saving = new UrlSummary();

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/new")
    public Map<String, String> postUrlSummary(@RequestBody Map<String, String> body) {
        Map<String, String> responseMap = new HashMap<>();
        try {
            String url = body.get("url");

            if (url == null || url.isEmpty()) {
                responseMap.put("error", "Error: URL is missing.");
                return responseMap;
            }

            String fastApiUrl = "http://localhost:8000/summarize";

            RestTemplate restTemplate = new RestTemplate();
            Map<String, String> requestBody = new HashMap<>();
            requestBody.put("url", url);

            Map<String, String> fastApiResponse = restTemplate.postForObject(fastApiUrl, requestBody, Map.class);

            if (fastApiResponse != null && fastApiResponse.containsKey("summary")) {

                saving.id = UUID.randomUUID();
                saving.url = url;
                saving.summary = fastApiResponse.get("summary");
                repo.save(saving);
                responseMap.put("summary", fastApiResponse.get("summary"));
            } else {
                responseMap.put("error", "Error: Summary not found in response.");
            }
        } catch (Exception e) {
            responseMap.put("error", "Error: " + e.getMessage());
        }
        return responseMap;
    }
}