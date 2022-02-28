<?php
//
//The point constants
$c1x= 150;
$c1y=225;
$c2x=450;
$c2y=75;
$radius=75;
//
//Calculating angle of inclination of the line
$incX=($c2x-$c1x);
$incY=($c1y-$c2y);
$theta=atan($incY/$incX);
//
//The distance from the circle center to the perpendicular point where the circle joins the line
$dx=cos((float)$theta)*$radius;
$dy=sin((float)$theta)*$dx;
//
//The points of intersection on circle 1
$px1=($c1x+$dx);
$py1=($c1y-$dy);
//
//The points of intersection on circle 2
$px2=($c2x-$dx);
$py2=($c2y+$dy);
?>
<html>

<head>
    <meta charset="UTF-8">
    <title>SVG circle that covers the top</title>
    <!--
    Css file. -->
    <link rel="stylesheet" href="svg.css"><style></style>
</head>

<body>
    <svg height="100%" width="100%" viewBox="0 0 600 300">
        
        <line x1="300" y1="0" x2="300" y2="300" style="stroke-width: 2 ; stroke:black; stroke-dasharray:5" />

        <line x1="0" y1="150" x2="600" y2="150" style="stroke-width: 2 ; stroke:black; stroke-dasharray:5" />

        <line x1="150" y1="0" x2="150" y2="300" style="stroke-width: 2 ; stroke:black; stroke-dasharray:5" />

        <line x1="450" y1="0" x2="450" y2="300" style="stroke-width: 2 ; stroke:black; stroke-dasharray:5" />

        <line x1="0" y1="75" x2="600" y2="75" style="stroke-width: 2 ; stroke:black; stroke-dasharray:5" />

        <line x1="0" y1="225" x2="600" y2="225" style="stroke-width: 2 ; stroke:black; stroke-dasharray:5" />

        <circle cx="<?php echo $c1x;?>" 
                cy="<?php echo $c1y;?>" 
                r="<?php echo $radius;?>" 
                fill="none" style="stroke-width: 2; stroke:black"/>

        <circle cx="<?php echo $c2x;?>" 
                cy="<?php echo $c2y;?>" 
                r="<?php echo $radius;?>" 
                fill="none" style="stroke-width: 2; stroke:black"/>
        
        <line 
            x1="<?php echo $px1;?>"
            y1="<?php echo $py1;?>"
            x2="<?php echo $px2;?>"
            y2="<?php echo $py2;?>"
            style="stroke-width: 2 ; stroke:black;"
        />

    </svg>
</body>

</html>