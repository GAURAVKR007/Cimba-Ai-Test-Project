package com.cimbai.summaryAi.jpa;

import com.cimbai.summaryAi.entity.UrlSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UrlSummaryRepo extends JpaRepository<UrlSummary,String> {

}
