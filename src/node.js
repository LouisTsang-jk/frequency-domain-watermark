const { imread, imshow, Rect, waitKey, COLOR_RGB2GRAY, COLOR_GRAY2BGR } = require('opencv4nodejs');
const origin = imread('./assets/lena.jpeg');
imshow('p1', origin);
const region = origin.getRegion(new Rect(200, 200, 200, 200));
imshow('p2', region);
const grey = region.cvtColor(COLOR_RGB2GRAY);
imshow('grey', grey);
waitKey();