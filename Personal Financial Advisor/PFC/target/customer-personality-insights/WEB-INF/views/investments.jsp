<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head lang="en">
    <link rel="stylesheet" href="/resources/css/style.css">
    <style>
        .header img {
            float: left;
            height: 15%;
            padding-top: 4px;
            padding-left: 20px;
        }

        .header h1 {
            position: relative;
            top: 18px;
            left: 10px;
        }
    </style>
    <div class="header" style="background-color: #FF5819;">
        <img src="/resources/css/images/rabobank_logo.png" alt="logo" />
        <h1 style="margin:auto;padding:30px;width:43%;color:#FFFFFF; font-weight:bold;">
            Rabo Financial Advisor
        </h1>
    </div>
    <meta charset="UTF-8">
    <title>
        Rabo Financial Advisor with IBM Watson
    </title>
</head>
<h2>
    Investments.

</h2>
 <div class="wrapper">
      <div class="container">
<form class="form" method="GET" action="/getGoals/getInvestmentGoal" style="width:120%">
    <input type="checkbox" name="investment"> I want to invest in a car worth <input type="text" name="investmentTarget"> in <input type="text" name="years"> years.<br/><br/>
    <input type="checkbox" name="investment"> I want to invest in a house worth <input type="text" name="investmentTarget"> in <input type="text" name="years"> years.<br/><br/>
    <input type="checkbox" name="investment"> I want to invest in shares worth <input type="text" name="investmentTarget"> in <input type="text" name="years"> years.<br/><br/>
    <button type="submit" style="margin-top: 20px;">Submit</button>
   </div>
  </div>
</form>
</html>
