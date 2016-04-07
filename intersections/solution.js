function intersects(fig1, fig2) {
  // Замените код функции на полноценную реализацию

  return [
    [
      { x: 60,  y: 240 },
      { x: 90,  y: 240 },
      { x: 120, y: 180 },
      { x: 90,  y: 90  },
      { x: 60,  y: 150 },
    ],
    [
      { x: 270, y: 240 },
      { x: 300, y: 240 },
      { x: 300, y: 150 },
      { x: 270, y: 90  },
      { x: 240, y: 180 },
    ],
    [
      { x: 150, y: 180 },
      { x: 180, y: 240 },
      { x: 210, y: 180 },
      { x: 210, y: 90  },
      { x: 180, y: 60  },
      { x: 150, y: 90  }
    ]
  ];
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
  if(areaDif>0) return PointClassify.Left;
  if(areaDif<0) return PointClassify.Right;
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

