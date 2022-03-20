# Nudgyt Assignment

It is a simple application build using `Node` & `Express`, `Pug` as template engine, `Passport` as authentication module.

## Steps to run
### 1. Using Docker-compose

```
docker-compose up -d --build
```
Then navigate to `127.0.0.1:3000`

&nbsp;

### Monitor Logs
```
# node logs
docker-compose logs -f node

# mongo logs
docker-compose logs -f mongo
```

&nbsp;
&nbsp;
### 2. Using NPM
N.B 
1. Make sure you have mongo installed or create an account in Mongo Atlas to avail a free cluster to use it for testing purposes. 
2. Update `MONGODB_URL` in `.env`.

Assuming you're in project root directory.
```
cd app && npm run dev

# OR

cd app && npm start
```