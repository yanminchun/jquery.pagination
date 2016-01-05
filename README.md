# jquery.pagination

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <meta charset="utf-8" />
    <script src="jquery-1.8.3.min.js"></script>
    <link href="jquery.pagination.css" rel="stylesheet" />
    <script src="jquery.pagination.js"></script>
</head>
<body>
    <div id="nav"></div>
    <script>
        $("#nav").pagination({
            totalPage: 100,
            pageCurrent: 1,
            sideLength: 4,
            buttonClick: function (page) {
                console.log(page);
            }
        });
    </script>
</body>
</html>
