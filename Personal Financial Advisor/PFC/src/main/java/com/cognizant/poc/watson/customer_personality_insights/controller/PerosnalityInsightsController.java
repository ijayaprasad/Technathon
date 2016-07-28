package com.cognizant.poc.watson.customer_personality_insights.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Properties;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.cognizant.poc.watson.customer_personality_insights.filter.ProductDetails;
import com.cognizant.poc.watson.customer_personality_insights.helper.PersonalityInsightsHelper;
import com.cognizant.poc.watson.customer_personality_insights.helper.Twitter4JHelper;
import twitter4j.Status;

/**
 * Created by ilawazhaganj on 8/25/2015.
 */
@Controller
public class PerosnalityInsightsController {

    private static final Logger LOG = org.slf4j.LoggerFactory.getLogger(PerosnalityInsightsController.class);

    @RequestMapping(value = "/choosePage", method = RequestMethod.POST)
    public ModelAndView showPersonalityPage(final HttpServletRequest request) throws Exception {
        if (request.getParameter("personality") != null) {
            return new ModelAndView("personality");
        }
        return new ModelAndView("goals");
    }

    @RequestMapping(value = "/getProfile", method = RequestMethod.GET)
    public ModelAndView getTwitterProfile(@RequestParam String twitterId) throws Exception {
        LOG.info("getTwitterProfile invoked with twitter id :::   " + twitterId);
        ModelAndView modelView = new ModelAndView();
        Properties props = new Properties();
        ClassPathResource resource = new ClassPathResource("twittersample.properties");
        props.load(getClass().getClassLoader().getResourceAsStream("twittersample.properties"));

        Twitter4JHelper twitterHelper = new Twitter4JHelper(props);
        PersonalityInsightsHelper piHelper = new PersonalityInsightsHelper(props);

        HashSet<String> langs = new HashSet<String>();
        langs.add("en");
        langs.add("es");

        LOG.info("Get the tweets now");
        List<Status> tweets = twitterHelper.getTweets(twitterId, langs, 1000);
        String contentItemsJson = twitterHelper.convertTweetsToPIContentItems(tweets);
        String profile = piHelper.getProfileJSON(contentItemsJson, false);
        LOG.info("Personality of the twitter id is :::  " + profile);
        //String profile = piHelper.getProfileCSV(contentItemsJson, false);
        modelView.addObject("personality", profile);
        modelView.setViewName("customerPersonality");
        return modelView;
    }

    @RequestMapping(value = "/getProduct", method = RequestMethod.GET)
    public ModelAndView getProduct() {
        ModelAndView modelView = new ModelAndView();
        modelView.setViewName("financial_analysis");
        return modelView;
    }

    private void CreateProductCluster() {
        List<ProductDetails> productCluster = new ArrayList<ProductDetails>();
        createProduct("Product 1", 0.7982, 0.8962, 0.0676);
    }

    private ProductDetails createProduct(String productName, double openness, double conscientiousness,
                                         double neuroticism) {
        return new ProductDetails(productName, openness, conscientiousness, neuroticism);
    }

}
