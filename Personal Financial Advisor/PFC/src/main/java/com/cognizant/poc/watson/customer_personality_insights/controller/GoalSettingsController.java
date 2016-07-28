package com.cognizant.poc.watson.customer_personality_insights.controller;
import com.cognizant.poc.watson.customer_personality_insights.helper.PersonalityInsightsHelper;
import com.cognizant.poc.watson.customer_personality_insights.helper.Twitter4JHelper;
import org.slf4j.Logger;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import twitter4j.Status;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashSet;
import java.util.List;
import java.util.Properties;


/**
 * Created by RangasamyR on 10-9-2015.
 */

@Controller
@RequestMapping("/getGoals")
public class GoalSettingsController {

    private static final Logger LOG = org.slf4j.LoggerFactory.getLogger(GoalSettingsController.class);

    @RequestMapping(method = RequestMethod.GET)
    public ModelAndView getTwitterProfile(@RequestParam
                                          String goal) throws Exception {
        LOG.info("getGoals invoked with goal :::   " + goal);

        if("investments".equals(goal))
        {
            return new ModelAndView("investments");
        }
        return new ModelAndView("savings");

    }

    @RequestMapping(value ="/getInvestmentGoal", method = RequestMethod.GET)
    public ModelAndView getInvestmentGoal(@RequestParam
                                          String investmentTarget, @RequestParam String years) throws Exception {

        return new ModelAndView("dummy");
    }

    @RequestMapping(value="/getSavingsGoal", method = RequestMethod.GET)
    public ModelAndView getSavingsGoal(@RequestParam
                                          String savingsTarget, @RequestParam String years) throws Exception {
        return new ModelAndView("dummy");

    }
}
