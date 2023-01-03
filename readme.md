# node-binary

spec-reader.js - reads binary file written by spec.js

## How to test

```shell
node spec.js
node spec-reader.js
```

## png file reader

```shell
node png-reader.js
```

## Specification

### Version Chunk

The first byte represents an unsigned integer which gives the version.

### Name Length Chunk

The next byte represents an 8-bit unsigned integer giving the total byte length of name chunks following it.

### Name Chunks

The next `n` 16-bit chunks each represents an ASCII letter.
The value of `n` can be known from the **Name Length Chunk**.

> Note that ASCII only requires 7 bit but for the sake of this specification we use 16-bit for each letter.

### Rank Chunk

The next 4-bytes represents an unsigned 32-bit integer giving the rank.

### Hobbies Length Chunk

The next byte represents an 8-bit unsigned integer
giving the length of hobbies chunks that follows it.

### Hobbies Chunk

Each hobby chunk consists of two parts. 1) The length of the name of the hobby and 2) the name of the hobby.

#### Length Part

The first byte represents an 8-bit unsigned integer giving the byte length of the second part.

#### Data Part

`n` 16-bit chunks each represents an ASCII letter.
