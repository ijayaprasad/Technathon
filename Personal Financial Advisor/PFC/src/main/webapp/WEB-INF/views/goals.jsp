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
<div class="wrapper">
      <div class="container">
<form id="parent_form"  class="form" method="GET" action="/getGoals">

    <h2>
        Enter your goals
    </h2>
    <input type="radio" id="goal_investments" name="goal" value="investments">
    <label for="goal_investments">Investments</label><br/>
    <input type="radio" id="goal_savings" name="goal" value="savings">
    <label for="goal_savings">Savings</label><br/>
    <button type="submit" id="login-button" style="margin-top: 20px;">
        Submit
    </button>

</form>
</div></div>
</html>
