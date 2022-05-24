# Bitmap Index Scan

- index on g
- explain select name from grades where g > 95;

- pg builds a bitmap (an array of bits)
- finds row and set bit number