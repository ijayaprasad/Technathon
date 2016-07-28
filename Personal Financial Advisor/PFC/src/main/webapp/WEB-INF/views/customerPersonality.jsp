<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head lang="en">
	<style>
		.header img {
            float: left;
            height: 12%;
            padding-top: 4px;
            padding-left: 20px;
        }

        .header h1 {
            position: relative;
            top: 12px;
            left: 10px;
        }
   	</style>
   	<div class="header" style="background-color: #FF5819;">
    	<img src="/resources/css/images/rabobank_logo.png" alt="logo" />
    	<h1 style="margin:auto;padding:30px;width:43%;color:#FFFFFF;">Rabo Financial Advisor</h1>
    </div>
    <script type="text/javascript">
        var personalityData = ${personality};
    </script>
    <meta charset="UTF-8">
    <title>Watson Personality Insights with Twitter</title>
    <script src="/resources/extjs/ext-all-debug.js" charset="utf-8"></script>
    <script src="/resources/extjs/ext-charts-debug.js" charset="utf-8"></script>
    <link rel="stylesheet" type="text/css" href="/resources/extjs/ext-theme-crisp-all-debug.css">
    <script src="/resources/extjs/ext-theme-crisp-debug.js" charset="utf-8"></script>
    <script src="/resources/extjs/sencha-charts-debug.js" charset="utf-8"></script>
	<script src="/resources/js/personlaity_dashboard.js"></script>
</head>
<body>
</body>
</html>
