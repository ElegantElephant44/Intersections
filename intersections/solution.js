function intersects(fig1, fig2) {
  var intersectionPoints = [];
  
  for (var i=0; i< fig1.length; i++)
  {
    var segment1 = (i == fig1.length - 1) ? ([fig1[i], fig1[0]] ): ([fig1[i], fig1[i + 1]]);       
    for (var j=0; j<fig2.length; j++)
    {
      var segment2 = (j == fig2.length - 1) ? ([fig2[j], fig2[0]]) : ([fig2[j], fig2[j + 1]]);      
      var intersectionPoint = segmentsIntersect(segment1,segment2);
      if(intersectionPoint != null && !contains(intersectionPoints,intersectionPoint)){
        intersectionPoints.push(intersectionPoint);        
      }      
    }    
  }
  fig1Segments =[];
  for (var i=0; i< fig1.length; i++)
  {    
    var point = fig1[i];
    var segment1 = (i == fig1.length - 1) ? ([fig1[i], fig1[0]] ): ([fig1[i], fig1[i + 1]]);
    fig1Segments.push(segment1);
    if (inside(point, fig2) && !contains(intersectionPoints,point))
    {
      intersectionPoints.push(point);      
    }
  }
  fig2Segments =[];
  for (var i=0; i< fig2.length; i++)
  {    
    var point = fig2[i];
    var segment2 = (i == fig2.length - 1) ? ([fig2[i], fig2[0]] ): ([fig2[i], fig2[i + 1]]);
    fig2Segments.push(segment2);
    if (inside(point, fig1) && !contains(intersectionPoints,point))
    {
      intersectionPoints.push(point);      
    }
  }
  resultSegments = [];

  for (var i=0; i<fig1Segments.length; i++){
    belongPoints = [];
    for (var j = 0; j<intersectionPoints.length; j++) {
      if(classifyPoint(intersectionPoints[j],fig1Segments[i])==PointClassify.Belong)
      {
        belongPoints.push(intersectionPoints[j]);        
      }
    }
    if (belongPoints === undefined) continue;
    if (belongPoints.length > 2){
      belongPoints.sort(function (a,b){
        if(a.x!=b.x)
          return a.x-b.x;
        else
          return a.y-b.y;        
      })
    }
    for(var k=0; k<belongPoints.length-1; k++)
    {     
      var midP = middlePoint(belongPoints[k],belongPoints[k+1]);        
      if(inside(midP,fig2))
      {
        resultSegments.push([belongPoints[k],belongPoints[k+1]]);          
      }     
    }
  }
  for (var i=0; i<fig2Segments.length; i++){
    belongPoints = [];
    for (var j = 0; j<intersectionPoints.length; j++) {
      if(classifyPoint(intersectionPoints[j],fig2Segments[i])==PointClassify.Belong)
      {
        belongPoints.push(intersectionPoints[j]);        
      }
    }
    if (belongPoints === undefined) continue;
    if (belongPoints.length > 2){
      belongPoints.sort(function (a,b){
        if(a.x!=b.x)
          return a.x-b.x;
        else
          return a.y-b.y;        
      })
    }
    for(var k=0; k<belongPoints.length-1; k++)
    {     
      var midP = middlePoint(belongPoints[k],belongPoints[k+1]);        
      if(inside(midP,fig1))
      {
        resultSegments.push([belongPoints[k],belongPoints[k+1]]);          
      }     
    }
  }

  var polygons = []

  for (var i=0; i<resultSegments.length-1; i++)
  {
    if(resultSegments[i]==null) continue;
    var polygon = [];
    polygon.push(resultSegments[i][0]);
    polygon.push(resultSegments[i][1]);
    point = resultSegments[i][1];
    resultSegments[i]=null;
    for(var j=i+1; j<resultSegments.length; j++)
    {
      if(resultSegments[j]==null) continue;
      if(equalPoints(point,resultSegments[j][0]))
      {
        point = resultSegments[j][1];        
      }
      else if(equalPoints(point,resultSegments[j][1]))
      {
        point = resultSegments[j][0];        
      }
      else
      {
        continue;
      }
      resultSegments[j]=null;
      if(equalPoints(polygon[0],point)) break;
      polygon.push(point)
      j=i;
    }
    if(polygon.length>2){    polygons.push(polygon);}
  }

  return polygons;
}

var PointClassify = {
  Right : {value: 0, name: "Right"}, 
  Left: {value: 1, name: "Left"}, 
  Belong : {value: 2, name: "Belong"},
  Behind : {value: 3, name: "Behind"},
  Beyond : {value: 4, name: "Beyond"}
};

var SegmentType = {
  Crossing : {value:0, name: "Crossing"},
  Inessential : {value:1, name: "Inessential"}
};

function contains(a, obj) {
    var i = a.length;
    while (i--) {
       if (a[i] === obj) {
           return true;
       }
       if(equalPoints(a[i], obj))
       {
            return true;
       }
    }
    return false;
}
function equalPoints(point1, point2)
{
  if (Math.abs(point1.x-point2.x)<0.0001 && Math.abs(point1.y-point2.y)<0.0001)return true;
}

function middlePoint(point1, point2)
{
  return {x:(point1.x+point2.x)/2, y:(point1.y+point2.y)/2};
}



function segmentsIntersect(segment1, segment2)
{
  denominator = (segment2[1].y - segment2[0].y) * (segment1[1].x - segment1[0].x) -
                (segment2[1].x - segment2[0].x) * (segment1[1].y - segment1[0].y);
  if(Math.abs(denominator)<0.00001) return null;
  t1 = ((segment2[1].x - segment2[0].x) * (segment1[0].y - segment2[0].y) -
        (segment2[1].y - segment2[0].y) * (segment1[0].x - segment2[0].x)) / denominator;
  if(t1<0 || t1>1) return null;
  t2 = ((segment1[1].x - segment1[0].x) * (segment1[0].y - segment2[0].y) -
        (segment1[1].y - segment1[0].y) * (segment1[0].x - segment2[0].x)) / denominator;
  if(t2<0 || t2>1) return null;

  return {
            x:segment1[0].x + t1 * (segment1[1].x - segment1[0].x),
            y:segment1[0].y + t1 * (segment1[1].y - segment1[0].y)
          };
}

function classifyPoint(point, segment)
{
  var a = {x:(segment[1].x-segment[0].x), y:(segment[1].y-segment[0].y)};
  var b = {x:(point.x-segment[0].x), y:(point.y-segment[0].y)};
  var areaDif = a.x*b.y - b.x*a.y;
  if(equalPoints(segment[0], point)) return PointClassify.Belong;
  if(equalPoints(segment[1], point)) return PointClassify.Belong;
  if(areaDif>0.00001) return PointClassify.Left;
  if(areaDif<-0.00001) return PointClassify.Right;
  if(a.x*b.x < 0 || a.y*b.y < 0) return PointClassify.Behind;
  if(Math.sqrt(a.x*a.x+a.y*a.y)<Math.sqrt(b.x*b.x+b.y*b.y)) return PointClassify.Beyond;
  return PointClassify.Belong;
}

function getSegmentType(point, segment)
{
  switch(classifyPoint(point,segment)){
    case PointClassify.Right:
      return segment[0].x < point.x && point.x <= segment[1].x ? SegmentType.Crossing : SegmentType.Inessential;
    case PointClassify.Left:
      return segment[1].x < point.x && point.x <= segment[0].x ? SegmentType.Crossing : SegmentType.Inessential;
    default:
      return SegmentType.Inessential;
  }
}

function inside(point, polygon)
{
  var parity = 0;
    for (var j=0; j<polygon.length; j++)
    {
      var segment = (j == polygon.length - 1) ? ([polygon[j], polygon[0]]) : ([polygon[j], polygon[j + 1]]);
      if (getSegmentType(point, segment) == SegmentType.Crossing) { parity = 1 - parity; }
    }
    return parity===1;
}

