// Acceleration due to gravity in cm/s^2
g = -981; // Negative due to coordinate system

// The x positions of our 6 boxes
x = 0;
x1 = x + 100;
x2 = x1 + 100;
x3 = x2 + 100;
x4 = x3 + 100;
x5 = x4 + 100;
x6 = x5 + 100;

// Make all boxes start from same height
y = y1 = y2 = y3 = y4 = y5 = y6 = 500;

// Initialize all velocties
vy = vy1 = vy2 = vy3 = vy4 = vy5 = vy6 = 0;

// No velocity in the x direction
vx = 0;

// Set the time interval to realtime
dt = 1/framerate;

// Intitialize the time variable
t = 0;

// Return the acceleration due to drag.
// b is the drag coeffecient for the object
// vel is the current velocity of the object
// m is the mass of the object
function a_drag(v, b, m){
    // Put the acceleration due to air drag here.
    // Don't assign a direction here. (no negative)
    a = b/m*v;

    // Do not exceed acceleration due to gravity!
    if (a > abs(g)) a = abs(g);

    // Return the acceleration due to drag
    return a
}

function draw(){
    // Draw axes and other stuff
    display();      
    
    /** 
     * Update the acceleration using g
     * and the drag function
     * Try using 9.0 for the drag coefficient
     **/ 
    
    // 1.0 is the mass of the object
    a1 = g - a_drag(vy1, 9.0, 1.0);
    
    // Update vy using a1 and dt
    vy1 = vy1 + a1*dt;
    
    // Update y1 using vy1 and dt
    y1 = y1 + vy1*dt;
    drawBox(x1,y1,vx,vy1);
    
    a2 = g - a_drag(vy2, 9.0, 2.0);
    vy2 = vy2 + a2*dt;
    y2 = y2 + vy2*dt;
    drawBox(x2,y2,vx,vy2);
    
    a3 = g - a_drag(vy3, 9.0, 3.0);
    vy3 = vy3 + a3*dt;
    y3 = y3 + vy3*dt;
    drawBox(x3,y3,vx,vy3);
    
    a4 = g - a_drag(vy4, 9.0, 4.0);
    vy4 = vy4 + a4*dt;
    y4 = y4 + vy4*dt;
    drawBox(x4,y4,vx,vy4);
        
    a5 = g - a_drag(vy5, 9.0, 5.0);
    vy5 = vy5 + a5*dt;
    y5 = y5 + vy5*dt;
    drawBox(x5,y5,vx,vy5);
    
    a6 = g - a_drag(vy6, 9.0, 6.0);
    vy6 = vy6 + a6*dt;
    y6 = y6 + vy6*dt;
    drawBox(x6,y6,vx,vy6);
    
    t = t + dt;
    // Add more graphics here before the end of draw()

    if (y6 > 0) {
        print("\t"+t+"\t"+y1+"\t"+y2+"\t"+y3+"\t"+y4+"\t"+y5+"\t"+y6);
    }

    if (y  > -2*r) t0 = t; else text("t="+round(t0,2)+"s",x, 0.99*height);
    if (y1 > -2*r) t1 = t; else text("t="+round(t1,2)+"s",x1,0.99*height);
    if (y2 > -2*r) t2 = t; else text("t="+round(t2,2)+"s",x2,0.99*height);
    if (y3 > -2*r) t3 = t; else text("t="+round(t3,2)+"s",x3,0.99*height);
    if (y4 > -2*r) t4 = t; else text("t="+round(t4,2)+"s",x4,0.99*height);
    if (y5 > -2*r) t5 = t; else text("t="+round(t5,2)+"s",x5,0.99*height);
    if (y6 > -2*r) t6 = t; else text("t="+round(t6,2)+"s",x6,0.99*height);
} // end draw()   DO NOT ADD ANY CODE AFTER THIS LINE!!!
