var examples = {
  first: [	[ { x: 60,  y: 60  }, { x: 180, y: 0   }, { x: 300, y: 60  }, { x: 300, y: 300 }, { x: 240, y: 180 }, { x: 210, y: 180 },
    	   	  { x: 180, y: 240 }, { x: 150, y: 180 }, { x: 120, y: 180 }, { x: 60,  y: 300 } ],
    	   	
    	   	[ { x: 30,  y: 30  }, { x: 300, y: 30   }, { x: 300, y: 300  }, { x: 30, y: 300 }, { x: 240, y: 180 } ],
    	   	
    	   	[ { x: 60,  y: 60  }, { x: 180, y: 120   }, { x: 300, y: 60  }, { x: 300, y: 300 }, { x: 240, y: 180 }, { x: 210, y: 180 },
    		  { x: 180, y: 240 }, { x: 150, y: 180 }, { x: 120, y: 180 }, { x: 60,  y: 300 } ],

    		[ { x: 30,  y: 30  }, { x: 60, y: 30   }, { x: 60, y: 60  }, { x: 30, y: 60 }]
    	   ],
  second: [	[  { x: 30,  y: 240 }, { x: 330, y: 240 }, { x: 330, y: 210 }, { x: 270, y: 90  }, { x: 210, y: 270 }, { x: 210, y: 90  },
      		   { x: 180, y: 60  }, { x: 150, y: 90  }, { x: 150, y: 270 }, { x: 90,  y: 90  }, { x: 30,  y: 210 } ],
      		
      		[ { x: 0,  y: 150  }, { x: 150, y: 0   }, { x: 150, y: 330  } ],

      		[ { x: 330, y: 240 }, { x: 330, y: 210 }, { x: 270, y: 90  }, { x: 210, y: 270 }, { x: 210, y: 90  }, { x: 180, y: 60  },
    		  { x: 150, y: 90  }, { x: 160, y: 270 }, { x: 90,  y: 90  } ],

    		[ { x: 60,  y: 30  }, { x: 120, y: 45   }, { x: 60, y: 60  } ]
      	  ],
  expend:[
  			[
  				[ { x: 60,  y: 240 }, { x: 90,  y: 240 }, { x: 120, y: 180 }, { x: 90,  y: 90  }, { x: 60,  y: 150 }, ],
  				[ { x: 270, y: 240 }, { x: 300, y: 240 }, { x: 300, y: 150 }, { x: 270, y: 90  }, { x: 240, y: 180 }, ],
  				[ { x: 150, y: 180 }, { x: 180, y: 240 }, { x: 210, y: 180 }, { x: 210, y: 90  }, { x: 180, y: 60  }, { x: 150, y: 90  } ]
  			],

  			[
  				[ { x: 150,  y: 300 }, { x: 125,  y: 300 }, { x: 94.3548, y: 263.2258 }, { x: 150,  y: 231.42857  } ],
  				[ { x: 82.5,  y: 67.5 }, { x: 150,  y: 115.71428 }, { x: 150, y: 30 }, { x: 120,  y: 30 } ]
  			],

  			[
  				[ { x: 300,  y: 150 }, { x: 300,  y: 221.25 }, { x: 242.72727, y: 185.454545 }, { x: 240,  y: 180  }, { x: 270,  y: 90 } ],

  				[ { x: 155.625, y: 191.25 }, { x: 150, y: 180 }, { x: 125, y: 180  }, { x: 90, y: 90 }, { x: 234, y: 180  }, { x: 210, y: 180  },
    		  	  { x: 210, y: 105  }, { x: 180, y: 120 }, { x: 150.8571,  y: 105.42857  } ]
  			],

  			[]

  		]
};

describe("intersects", function() {

    it("Find intersections", function() {
        assert(equalsPolygonsList(examples.expend[0], intersects(examples.first[0], examples.second[0])));
    });
    it("Find intersections", function() {
        assert(equalsPolygonsList(examples.expend[1], intersects(examples.first[1], examples.second[1])));
    });
    it("Find intersections", function() {
        assert(equalsPolygonsList(examples.expend[2], intersects(examples.first[2], examples.second[2])));
    });
    it("Find intersections", function() {
        assert(equalsPolygonsList(examples.expend[3], intersects(examples.first[3], examples.second[3])));
    });

});

describe('intersections of segments', function() {
    it('Seg1 (300;300)(300;60) Seg2(330;240)(30;240)', function() {
        assert.deepEqual(segmentsIntersect(
            [{ x: 300, y: 300 }, { x: 300, y: 60 }], [{ x: 330, y: 240 }, { x: 30, y: 240 }]
        ), { x: 300, y: 240 })
    })
    it('Seg1 (300;300)(300;60) Seg2(270;90)(330;210)', function() {
        assert.deepEqual(segmentsIntersect(
        	[{ x: 300, y: 300 }, { x: 300, y: 60 }], [{ x: 270, y: 90 }, { x: 330, y: 210 }]
        	), { x: 300, y: 150 })
    })
    it('Seg1 (240;108)(300;300) Seg2(330;240)(30;240)', function() {
        assert.deepEqual(segmentsIntersect(
            [{ x: 240, y: 180 }, { x: 300, y: 300 }], [{ x: 330, y: 240 }, { x: 30, y: 240 }]
        ), { x: 270, y: 240 })
    })
    it('Seg1 (240;180)(300;300) Seg2(240;270)(270;90)', function() {
        assert.deepEqual(segmentsIntersect(
            [{ x: 240, y: 180 }, { x: 300, y: 300 }], [{ x: 210, y: 270 }, { x: 270, y: 90 }]
        ), { x: 240, y: 180 })
    })
    it('Seg1 (300;300)(300;60) Seg2(330;210)(330;240)', function() {
        assert.equal(segmentsIntersect(
            [{ x: 300, y: 300 }, { x: 300, y: 60 }], [{ x: 330, y: 210 }, { x: 330, y: 240 }]
        ), null)
    })
})

describe('point classify', function() {
    it('Point (40;40) Seg(30;30)(100;100)', function() {
        assert.equal(classifyPoint({ x: 40, y: 40 },
        	[{ x: 30, y: 30 }, { x: 100, y: 100 }]), PointClassify.Belong)
    })
    it('Point (40;50) Seg(30;30)(100;100)', function() {
        assert.equal(classifyPoint({ x: 40, y: 50 },
        	[{ x: 30, y: 30 }, { x: 100, y: 100 }]), PointClassify.Left)
    })
    it('Point (60;30) Seg(30;30)(100;100)', function() {
        assert.equal(classifyPoint({ x: 60, y: 30 },
        	[{ x: 30, y: 30 }, { x: 100, y: 100 }]), PointClassify.Right)
    })
    it('Point (10;10) Seg(30;30)(100;100)', function() {
        assert.equal(classifyPoint({ x: 10, y: 10 },
        	[{ x: 30, y: 30 }, { x: 100, y: 100 }]), PointClassify.Behind)
    })
    it('Point (110;110) Seg(30;30)(100;100)', function() {
        assert.equal(classifyPoint({ x: 110, y: 110 },
        	[{ x: 30, y: 30 }, { x: 100, y: 100 }]), PointClassify.Beyond)
    })
})

function equalsPolygon(polygon1, polygon2) {
    if (polygon1.length != polygon2.length) return false;
    var first = polygon1[0];
    var offset;
    var reverse;
    for (var i = 0; i < polygon2.length; i++) {
        if (equalPoints(polygon2[i], first)) {
            prev = i > 0 ? polygon2[i - 1] : polygon2[polygon2.length - 1];
            reverse = equalPoints(polygon1[1], prev);
            if (reverse) {
                offset = polygon2.length - 1 - i
            } else {
                offset = i;
            }
            break
        }
    }
    if (offset == undefined) return false;
    if (reverse) polygon2 = polygon2.reverse();
    if (offset != 0) {
        var second = polygon2.slice(offset).concat(polygon2.slice(0, offset));
    }
    for (var i = 0; i < polygon1; i++) {
        if (!equalPoints(polygon1[i], polygon2[i])) return false;
    }
    return true;
}

function equalsPolygonsList(list1, list2) {
    if (list1.length != list2.length) return false;
    for (var i = 0; i < list1.length; i++) {
        var found;
        for (var j = 0; j < list2.length; j++) {
            if (equalsPolygon(list1[i], list2[j])) {
                found = true;
                break
            }
        }
        if (found == undefined) return false;
    }
    return true;
}
