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
    Rabo Financial Advisor
  </title>
  </head>
  <body>
    <div class="wrapper">
      <div class="container">
		<h1>
          Welcome
      </h1>

      <form id="parent_form"  class="form" method="GET" action="/getProfile">
        <input type="text" id="twitterId" name="twitterId" placeholder="Twitter Id"/>

        <button type="submit" id="login-button">
          Get Personality
        </button>
      </form>

      <form id="parent_form"  class="form" method="GET" action="/getProduct">
         <button type="submit" id="login-button">
             Know your Financial Analysis
         </button>
      </form>
  </div>

  <ul class="bg-bubbles">
    <li>
    </li>
    <li>
    </li>
    <li>
    </li>
    <li>
    </li>
    <li>
    </li>
    <li>
    </li>
    <li>
    </li>
    <li>
    </li>
    <li>
    </li>
    <li>
    </li>
  </ul>
  </div>
  </body>
</html>
