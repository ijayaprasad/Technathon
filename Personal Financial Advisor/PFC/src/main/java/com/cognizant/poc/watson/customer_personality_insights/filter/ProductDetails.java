package com.cognizant.poc.watson.customer_personality_insights.filter;
/**
 * Created by ilawazhaganj on 11/2/2015.
 */
public class ProductDetails {
    private String productName;
    private Double openness;
    private Double conscientiousness;
    private Double neuroticism;

    public ProductDetails(String productName, double openness, double conscientiousness, double neuroticism) {
        this.productName = productName;
        this.openness = openness;
        this.conscientiousness = conscientiousness;
        this.neuroticism = neuroticism;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Double getOpenness() {
        return openness;
    }

    public void setOpenness(Double openness) {
        this.openness = openness;
    }

    public Double getConscientiousness() {
        return conscientiousness;
    }

    public void setConscientiousness(Double conscientiousness) {
        this.conscientiousness = conscientiousness;
    }

    public Double getNeuroticism() {
        return neuroticism;
    }

    public void setNeuroticism(Double neuroticism) {
        this.neuroticism = neuroticism;
    }
}
